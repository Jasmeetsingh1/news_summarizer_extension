# backend/scraper.py
from newspaper import Article, Config

def scrape_article(url):
    """
    Scrapes the main content of a news article from a given URL.

    Args:
        url (str): The URL of the news article.

    Returns:
        str: The extracted article text, or None if scraping fails.
    """
    try:
        # Configuration to avoid SSL verification issues and use a common user-agent
        config = Config()
        config.browser_user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        config.verify_ssl = False

        article = Article(url, config=config)
        
        # Download and parse the article
        article.download()
        article.parse()
        
        # We combine title and text for better context
        full_text = f"{article.title}. {article.text}"
        
        print(f"✅ Successfully scraped: {article.title}")
        return full_text
        
    except Exception as e:
        print(f"❌ Error scraping URL {url}: {e}")
        return None