import React, { useEffect, useRef, useState } from 'react';
import { AnalyticsTracker } from '../utils/videoUsageTracker';
import { AD_CONFIG, AdConfigHelpers } from '../utils/AdConfig';

const AdModal = ({ isOpen, onAdComplete, onClose }) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30); // 30 seconds ad
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    if (isOpen && adRef.current) {
      // Track ad view
      AnalyticsTracker.trackAdView('modal', 'processing');
      
      // Initialize AdSense
      if (window.adsbygoogle) {
        try {
          window.adsbygoogle.push({});
          setAdLoaded(true);
        } catch (error) {
          console.log('AdSense error:', error);
          // If AdSense fails, show placeholder and allow skip after 5 seconds
          setTimeout(() => {
            setCanSkip(true);
            setTimeRemaining(5);
          }, 5000);
        }
      }
    }
  }, [isOpen]);

  useEffect(() => {
    let timer;
    if (isOpen && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setCanSkip(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isOpen, timeRemaining]);

  const handleSkip = () => {
    if (canSkip) {
      AnalyticsTracker.trackAdClick('modal', 'skip');
      onAdComplete();
    }
  };

  const handleClose = () => {
    if (canSkip) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '1rem'
  };

  const contentStyles = {
    backgroundColor: '#1f2937',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '1rem',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    textAlign: 'center',
    position: 'relative'
  };

  const adContainerStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.5rem',
    padding: '1rem',
    marginBottom: '1rem',
    minHeight: '250px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const placeholderAd = (
    <div style={adContainerStyles}>
      <div>
        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📺</div>
        <div style={{ color: 'white', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
          Watch Ad to Continue
        </div>
        <div style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
          Please watch this ad to process your video
        </div>
      </div>
    </div>
  );

  return (
    <div style={modalStyles} onClick={handleClose}>
      <div style={contentStyles} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ 
            color: 'white', 
            fontSize: '1.5rem', 
            fontWeight: 'bold', 
            marginBottom: '0.5rem' 
          }}>
            Watch Ad to Continue
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
            You've used your free videos. Watch a short ad to continue processing.
          </p>
        </div>

        {/* Ad Container */}
        <div style={adContainerStyles}>
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={AD_CONFIG.PUBLISHER_ID}
            data-ad-slot={AdConfigHelpers.getAdUnitId('MODAL_MAIN')}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
          {!adLoaded && placeholderAd}
        </div>

        {/* Timer */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ 
            color: canSkip ? '#22c55e' : '#fbbf24', 
            fontSize: '1.125rem', 
            fontWeight: '600' 
          }}>
            {canSkip ? 'Ad Complete!' : `${timeRemaining}s remaining`}
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          {canSkip ? (
            <button
              onClick={handleSkip}
              style={{
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                padding: '0.75rem 1.5rem',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              Continue Processing
            </button>
          ) : (
            <div style={{ 
              color: '#9ca3af', 
              fontSize: '0.875rem',
              padding: '0.75rem 1.5rem'
            }}>
              Please wait for ad to complete...
            </div>
          )}
        </div>

        {/* Close button (only when can skip) */}
        {canSkip && (
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              backgroundColor: 'transparent',
              border: 'none',
              color: '#9ca3af',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: '0.25rem'
            }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default AdModal;
