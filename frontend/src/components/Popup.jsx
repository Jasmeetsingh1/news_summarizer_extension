// src/components/Popup.js
import React, { useState } from 'react';
import '../App.css';

function Popup() {
  const [language, setLanguage] = useState('hindi');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');

    // Get the current active tab
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      const currentTab = tabs[0];
      if (!currentTab || !currentTab.url) {
        setError('Could not get current tab URL.');
        setIsLoading(false);
        return;
      }

      try {
        // Send request to the backend
        const response = await fetch('http://127.0.0.1:5000/summarize', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: currentTab.url, language }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Send the summary to the content script to display it
        chrome.tabs.sendMessage(currentTab.id, {
          type: 'SHOW_SUMMARY',
          summary: data.summary,
        });
        
        // Close the popup after sending the message
        window.close();

      } catch (err) {
        setError('Failed to fetch summary. Is the backend running?');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    });
  };

  return (
    <div className="popup-container">
      <div className="header">
        <h2>News Summarizer</h2>
      </div>
      
      <div className="section">
        <label htmlFor="language-select">Summary Language</label>
        <select
          id="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="hindi">Hindi</option>
          <option value="english" disabled>English (Soon)</option>
        </select>
      </div>

      <div className="section">
        <button
          className="generate-btn"
          onClick={handleGenerateSummary}
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Popup;