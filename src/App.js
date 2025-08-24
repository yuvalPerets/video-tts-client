import React, { useState, useEffect } from "react";
import "./App.css";
import { UploadForm } from "./components";
import AdSidebar from "./components/AdSidebar";
import AdModal from "./components/AdModal";
import UsageIndicator from "./components/UsageIndicator";
import { AnalyticsTracker } from "./utils/videoUsageTracker";

function App() {
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Track session start
    AnalyticsTracker.trackSession();

    // Check screen size for responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleUploadRequest = (uploadData) => {
    setPendingUpload(uploadData);
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    setShowAdModal(false);
    if (pendingUpload) {
      // Continue with the upload
      pendingUpload.onContinue();
      setPendingUpload(null);
    }
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    setPendingUpload(null);
  };

  // Responsive layout styles
  const mainContentStyles = {
    minHeight: '100vh',
    padding: isMobile ? '1rem' : '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
    paddingLeft: isMobile ? '1rem' : '200px',
    paddingRight: isMobile ? '1rem' : '200px',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="App">
      {/* Sidebar Ads - Hidden on mobile */}
      {!isMobile && (
        <>
          <AdSidebar position="left" />
          <AdSidebar position="right" />
        </>
      )}
      
      {/* Main Content */}
      <div style={mainContentStyles}>
        <UploadForm 
          onUploadRequest={handleUploadRequest}
        />
      </div>

      {/* Ad Modal */}
      <AdModal 
        isOpen={showAdModal}
        onAdComplete={handleAdComplete}
        onClose={handleAdClose}
      />
    </div>
  );
}

export default App;
