# News Summarizer Browser Extension

A browser extension that summarizes English news articles into a concise English summary using a lightweight AI model. The extension displays the summary in a clean, transparent overlay on the current webpage.

## ✨ Features

- **One-Click Summaries:** Generate a summary of the current news article with a single click.
- **On-Screen Display:** The summary appears in a semi-transparent overlay directly on the page, not in a disruptive popup.
- **Simple Interface:** A clean and minimal UI for ease of use.
- **Local AI Backend:** Uses a self-hosted Python backend with a `t5-small` model for fast, local processing.

---

## 🛠️ Tech Stack

- **Frontend (Browser Extension):**
  - React (with Vite)
  - JavaScript
  - CSS3
  - Chrome Extension Manifest V3
- **Backend (API Server):**
  - Python
  - Flask
  - Hugging Face Transformers
  - Newspaper3k

---

## 📂 Project Structure

news-summarizer-project/
├── backend/
│   ├── app.py              # Main Flask server
│   ├── scraper.py          # Extracts text from URLs
│   ├── summarizer.py       # Handles the AI model
│   └── requirements.txt    # Python dependencies
│
├── frontend/
│   ├── public/
│   │   ├── icons/
│   │   │   ├── icon16.png
│   │   │   ├── icon48.png
│   │   │   └── icon128.png
│   │   ├── contentScript.js  # Interacts with the webpage
│   │   └── manifest.json     # The final extension configuration
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── Popup.jsx         # The popup's UI and logic
│   │   │   └── SummaryOverlay.jsx  # React component for the overlay
│   │   ├── App.css           # All styles for the extension
│   │   ├── App.jsx           # Main React App component
│   │   └── main.jsx          # Entry point for the React App
│   │
│   ├── .gitignore            # Specifies what to ignore for version control
│   ├── index.html          # The base HTML file for the popup
│   ├── package.json          # Lists frontend dependencies and scripts
│   └── vite.config.js      # Configuration file for the Vite builder
│
└── README.md                 # Your project's documentation
---

## 🚀 Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- Python 3.8+ and `pip`
- Node.js v16+ and `npm`

### 1. Backend Setup (Flask Server) 🐍

First, set up and run the Python backend which handles the AI summarization.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    - On **macOS/Linux**:
      ```bash
      python3 -m venv venv
      source venv/bin/activate
      ```
    - On **Windows**:
      ```bash
      python -m venv venv
      .\venv\Scripts\activate
      ```

3.  **Install Python dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run the Flask server:**
    ```bash
    python app.py
    ```
    > **Note:** The first time you run this, it will download the `t5-small` model from Hugging Face, which may take a few moments. The server will be running on `http://127.0.0.1:5000`. Keep this terminal window open.

### 2. Frontend Setup (React Extension) ⚛️

Next, build the browser extension frontend.

1.  **Open a new terminal window.**

2.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

3.  **Install npm dependencies:**
    ```bash
    npm install
    ```

4.  **Build the extension:**
    ```bash
    npm run build
    ```
    This command compiles the React code and creates a final `dist` folder inside the `frontend` directory. This `dist` folder is your ready-to-use browser extension.

### 3. Loading the Extension in Chrome

1.  Open Google Chrome and navigate to `chrome://extensions`.
2.  Turn on the **"Developer mode"** toggle in the top-right corner.
3.  Click the **"Load unpacked"** button.
4.  In the file selection dialog, select the **`frontend/dist`** folder.
5.  The "News Summarizer" extension will appear in your list and its icon will be added to your browser toolbar.

---

## Usage

1.  Ensure your Python backend server is running.
2.  Navigate to an English news article on any major news website.
3.  Click the extension's icon in your browser toolbar.
4.  Click the **"Generate Summary"** button.
5.  The summary will appear in a transparent overlay. Click outside the box or press the `Esc` key to close it.

---

## API Endpoint

The extension communicates with a single API endpoint on the backend.

- **Endpoint**: `/summarize`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "url": "https://www.bbc.com/news/articles/czjvzxn0ekko"
  }
- **Success Response**:
  ```json
  {
  "summary": "This is the generated summary of the article..."
  }


