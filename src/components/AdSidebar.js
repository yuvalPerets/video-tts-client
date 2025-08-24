import React, { useEffect, useRef } from 'react';
import { AD_CONFIG, AdConfigHelpers } from '../utils/AdConfig';

const AdSidebar = ({ position = 'left', isVisible = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    // Initialize Google AdSense when component mounts
    if (window.adsbygoogle && adRef.current) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.log('AdSense error:', error);
      }
    }
  }, []);

  const sidebarStyles = {
    position: 'fixed',
    top: '0',
    [position]: '0',
    width: '180px',
    height: '100vh',
    backgroundColor: 'rgba(255, 255, 255, 0.01)',
    borderRight: position === 'left' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
    borderLeft: position === 'right' ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    zIndex: 50,
    opacity: isVisible ? 1 : 0,
    transition: 'opacity 0.3s ease',
    overflowY: 'auto',
    backdropFilter: 'blur(10px)',
    boxShadow: position === 'left' 
      ? '2px 0 20px rgba(0, 0, 0, 0.1)' 
      : '-2px 0 20px rgba(0, 0, 0, 0.1)'
  };

  const adContainerStyles = {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '0.75rem',
    padding: '0.75rem',
    minHeight: '280px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#9ca3af',
    fontSize: '0.75rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(5px)'
  };

  const placeholderAd = (
    <div style={adContainerStyles}>
      <div>
        <div style={{ 
          fontSize: '1.25rem', 
          marginBottom: '0.75rem',
          opacity: 0.6
        }}>
          📺
        </div>
        <div style={{ 
          fontSize: '0.875rem', 
          fontWeight: '500',
          marginBottom: '0.5rem'
        }}>
          Ad Space
        </div>
        <div style={{ 
          fontSize: '0.625rem', 
          opacity: 0.7
        }}>
          160×600
        </div>
      </div>
    </div>
  );

  return (
    <div style={sidebarStyles}>
      {/* Top Ad */}
      <div style={adContainerStyles}>
                 <ins
           ref={adRef}
           className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={AD_CONFIG.PUBLISHER_ID}
           data-ad-slot={AdConfigHelpers.getAdUnitId('SIDEBAR_TOP')}
           data-ad-format="auto"
           data-full-width-responsive="true"
         />
        {placeholderAd}
      </div>

             {/* Middle Ad */}
       <div style={adContainerStyles}>
         <ins
           className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={AD_CONFIG.PUBLISHER_ID}
           data-ad-slot={AdConfigHelpers.getAdUnitId('SIDEBAR_MIDDLE')}
           data-ad-format="auto"
           data-full-width-responsive="true"
         />
         {placeholderAd}
       </div>

       {/* Bottom Ad */}
       <div style={adContainerStyles}>
         <ins
           className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client={AD_CONFIG.PUBLISHER_ID}
           data-ad-slot={AdConfigHelpers.getAdUnitId('SIDEBAR_BOTTOM')}
           data-ad-format="auto"
           data-full-width-responsive="true"
         />
         {placeholderAd}
       </div>
    </div>
  );
};

export default AdSidebar;
