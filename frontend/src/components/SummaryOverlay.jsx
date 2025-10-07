// src/components/SummaryOverlay.js
import React, { useEffect, useRef } from 'react';
import '../App.css';

function SummaryOverlay({ summary, onClose }) {
  const overlayRef = useRef();

  // Close the overlay if the user clicks outside of the content box
  const handleClickOutside = (event) => {
    if (overlayRef.current && event.target === overlayRef.current) {
      onClose();
    }
  };

  // Close the overlay if the user presses the Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="summary-overlay-container"
      ref={overlayRef}
      onClick={handleClickOutside}
    >
      <div className="summary-content">
        <p>{summary}</p>
      </div>
    </div>
  );
}

export default SummaryOverlay;