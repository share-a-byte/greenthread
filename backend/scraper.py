import requests
import re
from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from flask import Flask, jsonify, request
from requests.exceptions import RequestException, HTTPError
from time import sleep

app = Flask(__name__)


CLOTHING_TYPES = [
    "hat", "fedora", "headgear", "helmet", "boater", "bonnet", "bowler", "chapeau", "headband",
    "headpiece", "cap", "lid", "turban", "toque", "helm", "beret", "jacket", "coat", "parka",
    "raincoat", "overcoat", "greatcoat", "surtout", "mackinaw", "pants", "pantaloons", "cargo",
    "trousers", "sweatpants", "joggers", "jeans", "shorts", "t-shirt", "shirt", "blouse", "jersey",
    "polo", "longsleeve", "long-sleeve", "shortsleeve", "short-sleeve", "turtleneck", "shoes",
    "slippers", "shoe", "moccasin", "loafer", "sneaker", "dress shoe", "tennis shoe", "slipper",
    "flip-flops", "clog", "cleat", "boot", "heels", "fleece", "pullover", "hoodie", "sweatshirt",
    "windbreaker", "sweater"
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
                return cloth
    return "Unknown"

def find_brand(soup):
    h1 = soup.find("title")
    if h1:
        search_for_me = h1.text.strip()
        for brand in BRANDS:
            if brand.casefold() in search_for_me.casefold():
                return brand
    return "Unknown"

def find_materials(soup):
    materials_list = []
    material_keywords = ["cotton", "polyester", "linen", "elastane", "spandex", "nylon", "wool", "rayon", "silk", "viscose", "acrylic", "modal"]


    materials_patterns = [
        re.compile(r'(\b(?:' + '|'.join(material_keywords) + r')\b):\s*(\d+%)', re.IGNORECASE),
        re.compile(r'(\d+%)\s*(\b(?:' + '|'.join(material_keywords) + r')\b)', re.IGNORECASE)
    ]

    def extract_materials_from_text(text):
        found_materials = []
        for pattern in materials_patterns:
            matches = pattern.findall(text)
            for match in matches:
                if isinstance(match, tuple):
                    found_materials.append(": ".join(match))
                else:
                    found_materials.append(match)
        return found_materials


    for element in soup.find_all(['p', 'span', 'li', 'div']):
        text = element.get_text(separator="\n").strip()
        if any(keyword in text.lower() for keyword in material_keywords):
            materials_list.extend(extract_materials_from_text(text))


    accordions = soup.find_all(['section', 'div'], class_=re.compile(r'(accordion|collapsible)', re.IGNORECASE))
    for accordion in accordions:
        text = accordion.get_text(separator="\n").strip()
        if any(keyword in text.lower() for keyword in material_keywords):
            materials_list.extend(extract_materials_from_text(text))


    materials_list = list(dict.fromkeys(materials_list))

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

    sustainability_score = (total_score / total_weight) * (100 / max_score)  # Normalize to a max score of 100
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
            return response
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
<<<<<<< Updated upstream
        response = fetch_page(url)
        soup = BeautifulSoup(response.content, 'html.parser')
=======
        html_content = fetch_page(url)
        soup = BeautifulSoup(html_content, 'html.parser')
>>>>>>> Stashed changes

        materials = find_materials(soup)
        brand = find_brand(soup)
        cloth_type = find_cloth_type(soup)
        sustainability_rating = calculate_sustainability_rating(materials)


        data = {
            "brand": brand,
            "cloth_type": cloth_type,
            "materials": materials,
            "sustainability_rating": sustainability_rating,
        }

        return data
    except Exception as e:
        raise RequestException(f"Failed to retrieve or parse the page: {e}")

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    if not url:
        return jsonify({"error": "URL is required"}), 400

    try:
        materials_info = start_scrape(url)
        return jsonify(materials_info)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)