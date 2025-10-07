# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
from scraper import scrape_article
from summarizer import initialize_summarizer, generate_summary

# Initialize Flask app
app = Flask(__name__)
# Enable CORS to allow requests from the browser extension
CORS(app)

# Initialize the summarizer model on startup
initialize_summarizer()

@app.route('/summarize', methods=['POST'])
def summarize_endpoint():
    """
    API endpoint to receive a URL and return a summarized article.
    """
    # Get data from the request
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({"error": "URL is required"}), 400

    # 1. Scrape the article content
    article_text = scrape_article(url)
    if not article_text:
        return jsonify({"error": "Failed to scrape the article"}), 500

    # 2. Generate the summary
    hindi_summary = generate_summary(article_text)
    if not hindi_summary or "failed" in hindi_summary.lower():
        return jsonify({"error": "Failed to generate summary"}), 500
        
    # 3. Return the summary
    print(f"✅ Summary generated for {url}")
    return jsonify({"summary": hindi_summary})

if __name__ == '__main__':
    # Running on port 5000 in debug mode
    app.run(debug=True, port=5000)