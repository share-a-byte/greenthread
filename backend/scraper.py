import requests
from requests.exceptions import ConnectionError, Timeout
from bs4 import BeautifulSoup
from tenacity import retry,stop_after_attempt, wait_fixed
from flask import Flask, jsonify, request


app = Flask(__name__)
@retry(stop=stop_after_attempt(3), wait=wait_fixed(2))
def scrape_for_ingredients(url, ingredients):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }


    try:

        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code != 200:
            print(f"Failed to get the keywords. Status code : {response.status_code}")
            return

        soup = BeautifulSoup(response.content, 'html.parser')

        text = soup.get_text()

        ingredient_occurrences = {ingredient: 0 for ingredient in ingredients}

        for ingredient in ingredients:
            ingredient_occurrences[ingredient] = text.lower().count(ingredient.lower())

        return ingredient_occurrences
    except ConnectionError as e:
        print(f"Connection error: {e}")
        raise
    except Exception as e:
        print(f"An error occurred: {e}")
        raise

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    ingredients = request.args.getlist('ingredients')
    if not url or not ingredients:
        return jsonify({"error": "URL and ingredients are required"}), 400

    try:
        ingredient_occurrences = scrape_for_ingredients(url, ingredients)
        return jsonify(ingredient_occurrences)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
