# backend/summarizer.py
from transformers import pipeline
import torch

# Initialize the summarization pipeline with a smaller, faster model.
# Note: 't5-small' is great for demos but produces English summaries.
summarizer = None

def initialize_summarizer():
    """Initializes the summarizer model to avoid reloading it on every request."""
    global summarizer
    if summarizer is None:
        print("💡 Initializing new lightweight summarizer ('t5-small')...")
        try:
            summarizer = pipeline(
                "summarization",
                model="t5-small",
                tokenizer="t5-small",
                device=0 if torch.cuda.is_available() else -1
            )
            print("✅ Lightweight model initialized successfully.")
        except Exception as e:
            print(f"❌ Failed to initialize model: {e}")


def generate_summary(text_to_summarize):
    """
    Generates a summary for the given text using the pre-loaded model.

    Args:
        text_to_summarize (str): The text to be summarized.

    Returns:
        str: The generated summary in English.
    """
    if summarizer is None:
        return "Model not initialized."
    
    # T5 models expect a "summarize: " prefix.
    # We adjust the length constraints for a smaller model.
    try:
        summary = summarizer(
            "summarize: " + text_to_summarize,
            max_length=100, # Reduced max_length for a faster response
            min_length=30,
            do_sample=False
        )
        return summary[0]['summary_text']
    except Exception as e:
        print(f"❌ Error during summarization: {e}")
        return "Failed to generate summary."