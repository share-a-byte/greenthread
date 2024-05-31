import requests
import re
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from flask import Flask, jsonify, request
from requests.exceptions import RequestException, HTTPError
from time import sleep
import chardet
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app, supports_credentials=True)
CLOTHING_TYPES = [
    "hat", "fedora", "headgear", "helmet", "boater", "bonnet", "bowler", "chapeau", "headband",
    "headpiece", "cap", "lid", "turban", "toque", "helm", "beret", "jacket", "coat", "parka",
    "raincoat", "overcoat", "greatcoat", "surtout", "mackinaw", "pants", "pantaloons", "cargo",
    "trousers", "sweatpants", "joggers", "jeans", "shorts", "t-shirt", "shirt", "blouse", "jersey",
    "polo", "longsleeve", "long-sleeve", "shortsleeve", "short-sleeve", "turtleneck", "shoes",
    "slippers", "shoe", "moccasin", "loafer", "sneaker", "dress shoe", "tennis shoe", "slipper",
    "flip-flops", "clog", "cleat", "boot", "heels", "fleece", "pullover", "hoodie", "sweatshirt",
    "windbreaker", "sweater", "tee"
]

def read_brands_from_file():
    with open('brands.txt', 'r') as file:
        return [line.strip() for line in file.readlines()]

BRANDS = read_brands_from_file()

def find_cloth_type(soup):
    h1 = soup.find("h1")
    if h1:
        search_for_me = h1.text.strip()
        for cloth in CLOTHING_TYPES:
            if cloth.casefold() in search_for_me.casefold():
                print(f"Found cloth type: {cloth}")
                return cloth
    return "Unknown"

def find_brand(soup):
    title = soup.find("title")
    if title:
        search_for_me = title.text.strip()
        for brand in BRANDS:
            if brand.casefold() in search_for_me.casefold():
                print(f"Found brand: {brand}")
                return brand
    return "Unknown"

def extract_materials_from_text(text, material_keywords, primary_patterns, fallback_patterns):
    found_materials = []
    seen_materials = set()


    for pattern in primary_patterns:
        matches = pattern.findall(text)
        for match in matches:
            if isinstance(match, tuple):
                material = f"{match[0]}: {match[1]}"
                if material not in seen_materials:
                    found_materials.append(material)
                    seen_materials.add(material)
            else:
                material = match
                if material not in seen_materials:
                    found_materials.append(material)
                    seen_materials.add(material)


    if not found_materials:
        for pattern in fallback_patterns:
            matches = pattern.findall(text)
            for match in matches:
                if isinstance(match, tuple):
                    material = f"{match[1]}: {match[0]}"
                    if material not in seen_materials:
                        found_materials.append(material)
                        seen_materials.add(material)
                else:
                    material = match
                    if material not in seen_materials:
                        found_materials.append(material)
                        seen_materials.add(material)

    return found_materials

def extract_materials_from_element(element, material_keywords, primary_patterns, fallback_patterns):
    materials_list = []


    text = element.get_text(separator="\n").strip()
    if any(keyword in text.lower() for keyword in material_keywords):
        materials_list.extend(extract_materials_from_text(text, material_keywords, primary_patterns, fallback_patterns))


    for child in element.find_all(True, recursive=False):
        materials_list.extend(extract_materials_from_element(child, material_keywords, primary_patterns, fallback_patterns))

    return materials_list

def find_materials(soup):
    materials_list = []
    material_keywords = ["recycled cotton", "organic cotton", "cotton", "polyester", "linen", "elastane", "spandex", "nylon", "wool", "rayon", "silk", "viscose", "acrylic", "modal"]

    primary_patterns = [
        re.compile(r'(\d+%)\s*(\b(?:' + '|'.join(material_keywords) + r')\b)', re.IGNORECASE)
    ]
    fallback_patterns = [
        re.compile(r'(\b(?:' + '|'.join(material_keywords) + r')\b)\s*(\d+%)', re.IGNORECASE)
    ]


    info_accordion_content = soup.find_all('div', class_='info-accordion__content')
    print(f"Found {len(info_accordion_content)} info-accordion__content divs")
    for content in info_accordion_content:
        materials_list.extend(extract_materials_from_element(content, material_keywords, primary_patterns, fallback_patterns))


    materials_suppliers_section = soup.find_all('div', id='section-materialsAndSuppliersAccordion')
    print(f"Found {len(materials_suppliers_section)} section-materialsAndSuppliersAccordion divs")
    for section in materials_suppliers_section:
        materials_list.extend(extract_materials_from_element(section, material_keywords, primary_patterns, fallback_patterns))


    for element in soup.find_all(['p', 'span', 'li', 'div']):
        text = element.get_text(separator="\n").strip()
        print(f"Text found in main content: {text}")
        if any(keyword in text.lower() for keyword in material_keywords):
            materials_list.extend(extract_materials_from_text(text, material_keywords, primary_patterns, fallback_patterns))

    materials_list = list(dict.fromkeys(materials_list))
    print(f"Materials list: {materials_list}")
    return materials_list

def calculate_sustainability_rating(materials):
    sustainable_materials = {
        "cotton": 5,
        "linen": 5,
        "wool": 4,
        "silk": 4,
        "modal": 3,
        "rayon": 3,
        "viscose": 3,
        "polyester": 1,
        "nylon": 1,
        "acrylic": 1,
        "spandex": 2,
        "elastane": 2
    }

    max_score = 5
    total_weight = 0
    total_score = 0

    for material in materials:
        for key, weight in sustainable_materials.items():
            if key in material.lower():
                percentage = int(re.search(r'(\d+)%', material).group(1))
                total_weight += percentage
                total_score += (percentage * weight)

    if total_weight == 0:
        return 0

    sustainability_score = (total_score / total_weight) * (100 / max_score)
    return round(sustainability_score, 2)

def fetch_page(url, retries=3, backoff_factor=0.3):
    ua = UserAgent()
    headers = {
        'User-Agent': ua.random,
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
        "DNT": "1",
        "Referer": "https://www.google.com/"
    }

    for attempt in range(retries):
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()


            html_content = response.content


            detected_encoding = chardet.detect(html_content)['encoding']
            if not detected_encoding:
                detected_encoding = 'utf-8'

            html_content = html_content.decode(detected_encoding)
            print(f"Detected encoding: {detected_encoding}")
            print(f"Fetched HTML content: {html_content[:500]}")

            return html_content
        except HTTPError as e:
            if response.status_code == 403:
                sleep(backoff_factor * (2 ** attempt))
            else:
                raise
        except RequestException as e:
            sleep(backoff_factor * (2 ** attempt))

    raise RequestException(f"Failed to retrieve or parse the page: {url}")

def start_scrape(url):
    try:
        html_content = fetch_page(url)
        soup = BeautifulSoup(html_content, 'html.parser')

        materials = find_materials(soup)
        brand = find_brand(soup)
        cloth_type = find_cloth_type(soup)
        sustainability_rating = calculate_sustainability_rating(materials)

        data = {
            "brand": brand,
            "cloth_type": cloth_type,
            "materials": materials,
            "sustainability_rating": sustainability_rating
        }
        print(f"Scraped data: {data}")
        return data
    except Exception as e:
        raise RequestException(f"Failed to retrieve or parse the page: {e}")

@app.route('/scrape', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def scrape():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        materials_info = start_scrape(url)
        return jsonify(materials_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/ecofriendly', methods=['GET'])
@cross_origin(origin='localhost', headers=['Content-Type', 'Authorization'])
def ecofriendly():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        materials_info = start_scrape(url)
        return jsonify(materials_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)