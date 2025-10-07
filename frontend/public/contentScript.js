// public/contentScript.js

// Function to remove the overlay if it already exists
const removeOverlay = () => {
  const existingOverlay = document.getElementById('summary-overlay-container');
  if (existingOverlay) {
    existingOverlay.remove();
  }
};

// Listen for the 'SHOW_SUMMARY' message from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'SHOW_SUMMARY') {
    // Remove any previous overlay before showing a new one
    removeOverlay();

    // 1. Create the main overlay container (the dark background)
    const overlayContainer = document.createElement('div');
    overlayContainer.id = 'summary-overlay-container';
    Object.assign(overlayContainer.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: '99999',
    });

    // 2. Create the content box that holds the summary text
    const contentBox = document.createElement('div');
    Object.assign(contentBox.style, {
      backgroundColor: 'rgba(28, 28, 30, 0.85)',
      backdropFilter: 'blur(10px)',
      color: 'white',
      padding: '25px',
      borderRadius: '12px',
      fontSize: '1.1rem',
      lineHeight: '1.6',
      maxWidth: '600px',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    });
    
    // 3. Add the summary text to the content box
    contentBox.textContent = request.summary;

    // 4. Put the content box inside the overlay and add it to the page
    overlayContainer.appendChild(contentBox);
    document.body.appendChild(overlayContainer);

    // 5. Add event listeners to close the overlay
    const closeOverlay = () => {
        removeOverlay();
        document.removeEventListener('keydown', handleEsc);
    };

    // Close when clicking on the dark background
    overlayContainer.addEventListener('click', (event) => {
      if (event.target === overlayContainer) {
        closeOverlay();
      }
    });

    // Close when pressing the 'Escape' key
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeOverlay();
      }
    };
    document.addEventListener('keydown', handleEsc);
    
    // Let the popup know the script finished
    sendResponse({ status: 'success' });
  }
  return true; // Required for asynchronous responses
});