import React, { useState, useEffect } from "react";
import "./App.css";
import { UploadForm } from "./components";
import AdSidebar from "./components/AdSidebar";
import AdModal from "./components/AdModal";
import UsageIndicator from "./components/UsageIndicator";
import { AnalyticsTracker } from "./utils/videoUsageTracker";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google OAuth client ID

function App() {
  const [showAdModal, setShowAdModal] = useState(false);
  const [pendingUpload, setPendingUpload] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(null); // Track logged-in user

  useEffect(() => {
    AnalyticsTracker.trackSession();

    // Responsive design
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1200);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Daily usage reset if logged in
    if (user) {
      AnalyticsTracker.resetUsageIfNeeded(true);
    }

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [user]);

  const handleLoginSuccess = (credentialResponse) => {
    // Decode the credential response to get user info
    const userObject = jwt_decode(credentialResponse.credential);
    setUser(userObject);
  };

  const handleLoginFailure = () => {
    setUser(null);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleUploadRequest = (uploadData) => {
    setPendingUpload(uploadData);
    setShowAdModal(true);
  };

  const handleAdComplete = () => {
    setShowAdModal(false);
    if (pendingUpload) {
      pendingUpload.onContinue();
      setPendingUpload(null);
    }
  };

  const handleAdClose = () => {
    setShowAdModal(false);
    setPendingUpload(null);
  };

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
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="App">
        {/* Google Login/Logout */}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          {!user ? (
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginFailure}
            />
          ) : (
            <div>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

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
            user={user} // Pass user to child if needed
          />
        </div>

        {/* Ad Modal */}
        <AdModal 
          isOpen={showAdModal}
          onAdComplete={handleAdComplete}
          onClose={handleAdClose}
        />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
