// 🚀 AdSense Configuration - Replace with your real IDs when approved

export const AD_CONFIG = {
  // Google AdSense Publisher ID
  // Replace with your real publisher ID: ca-pub-XXXXXXXXXXXXXXXX
  PUBLISHER_ID: 'ca-pub-XXXXXXXXXXXXXXXX',
  
  // Ad Unit IDs - Replace with your real ad slot IDs
  AD_UNITS: {
    // Sidebar ads (160×600)
    SIDEBAR_TOP: 'XXXXXXXXXX',
    SIDEBAR_MIDDLE: 'XXXXXXXXXX', 
    SIDEBAR_BOTTOM: 'XXXXXXXXXX',
    
    // Modal ads (300×250)
    MODAL_MAIN: 'XXXXXXXXXX',
    
    // In-content ads (728×90)
    CONTENT_TOP: 'XXXXXXXXXX',
    CONTENT_BOTTOM: 'XXXXXXXXXX'
  },
  
  // Google Analytics Measurement ID
  // Replace with your real GA4 measurement ID
  GA_MEASUREMENT_ID: 'GA_MEASUREMENT_ID',
  
  // Ad Display Settings
  DISPLAY: {
    // Show ads after X free videos
    FREE_VIDEOS_BEFORE_ADS: 3,
    
    // Minimum time between ads (seconds)
    MIN_TIME_BETWEEN_ADS: 30,
    
    // Ad display duration (seconds)
    AD_DISPLAY_DURATION: 30,
    
    // Enable/disable different ad types
    ENABLE_SIDEBAR_ADS: true,
    ENABLE_MODAL_ADS: true,
    ENABLE_CONTENT_ADS: false,
    
    // Responsive breakpoints
    MOBILE_BREAKPOINT: 768,
    TABLET_BREAKPOINT: 1024,
    DESKTOP_BREAKPOINT: 1200
  },
  
  // Revenue Optimization
  REVENUE: {
    // CPM rates (Cost Per Mille - per 1000 impressions)
    ANONYMOUS_CPM: 3,      // $3 for non-logged users
    LOGGED_IN_CPM: 8,      // $8 for logged-in users
    PREMIUM_CPM: 12,       // $12 for premium users
    
    // Login requirement for better ads
    REQUIRE_LOGIN_FOR_BETTER_ADS: true,
    
    // A/B testing settings
    ENABLE_AB_TESTING: false,
    AB_TEST_VARIANT: 'A' // A or B
  },
  
  // Ad Network Fallbacks
  FALLBACK_NETWORKS: {
    // If AdSense fails, try these networks
    MEDIA_NET: {
      enabled: false,
      publisherId: 'YOUR_MEDIA_NET_ID'
    },
    AMAZON: {
      enabled: false,
      tagId: 'YOUR_AMAZON_TAG_ID'
    }
  }
};

// Ad targeting parameters
export const AD_TARGETING = {
  // Content targeting
  CONTENT_TYPE: 'video_processing',
  APP_NAME: 'video_tts',
  
  // User targeting (will be enhanced with user data)
  USER_SEGMENTS: {
    ANONYMOUS: 'anonymous',
    REGISTERED: 'registered',
    PREMIUM: 'premium',
    NEW_USER: 'new_user',
    RETURNING_USER: 'returning_user'
  },
  
  // Geographic targeting
  GEO_TARGETING: {
    enabled: true,
    default_country: 'US'
  }
};

// Ad placement strategies
export const AD_PLACEMENT = {
  // Sidebar ad positions
  SIDEBAR: {
    LEFT: {
      position: 'left',
      width: '180px',
      ads: ['SIDEBAR_TOP', 'SIDEBAR_MIDDLE', 'SIDEBAR_BOTTOM']
    },
    RIGHT: {
      position: 'right', 
      width: '180px',
      ads: ['SIDEBAR_TOP', 'SIDEBAR_MIDDLE', 'SIDEBAR_BOTTOM']
    }
  },
  
  // Modal ad settings
  MODAL: {
    trigger: 'after_free_videos',
    duration: 30,
    canSkip: false,
    adUnit: 'MODAL_MAIN'
  },
  
  // Content ad positions
  CONTENT: {
    TOP: {
      position: 'top',
      adUnit: 'CONTENT_TOP',
      enabled: false
    },
    BOTTOM: {
      position: 'bottom', 
      adUnit: 'CONTENT_BOTTOM',
      enabled: false
    }
  }
};

// Ad loading and error handling
export const AD_LOADING = {
  // Timeout settings
  TIMEOUT: {
    AD_LOAD_TIMEOUT: 10000, // 10 seconds
    RETRY_DELAY: 5000,      // 5 seconds
    MAX_RETRIES: 3
  },
  
  // Error handling
  ERROR_HANDLING: {
    SHOW_PLACEHOLDER_ON_ERROR: true,
    LOG_ERRORS_TO_ANALYTICS: true,
    FALLBACK_TO_NEXT_NETWORK: true
  },
  
  // Performance optimization
  PERFORMANCE: {
    LAZY_LOAD_ADS: true,
    PRELOAD_CRITICAL_ADS: true,
    OPTIMIZE_AD_REFRESH: true
  }
};

// Analytics and tracking
export const AD_ANALYTICS = {
  // Events to track
  EVENTS: {
    AD_LOAD: 'ad_load',
    AD_VIEW: 'ad_view', 
    AD_CLICK: 'ad_click',
    AD_ERROR: 'ad_error',
    AD_TIMEOUT: 'ad_timeout',
    USER_LOGIN: 'user_login',
    USER_LOGOUT: 'user_logout',
    VIDEO_PROCESS: 'video_process',
    REVENUE_EARNED: 'revenue_earned'
  },
  
  // Custom dimensions
  DIMENSIONS: {
    USER_TYPE: 'user_type',
    AD_POSITION: 'ad_position',
    AD_NETWORK: 'ad_network',
    VIDEO_COUNT: 'video_count',
    SESSION_DURATION: 'session_duration'
  },
  
  // Revenue tracking
  REVENUE_TRACKING: {
    ENABLE_ECOM_TRACKING: true,
    TRACK_CPM_RATES: true,
    TRACK_USER_LIFETIME_VALUE: true
  }
};

// Helper functions for ad configuration
export const AdConfigHelpers = {
  // Get ad unit ID by name
  getAdUnitId(unitName) {
    return AD_CONFIG.AD_UNITS[unitName] || 'XXXXXXXXXX';
  },
  
  // Check if ad type is enabled
  isAdTypeEnabled(adType) {
    return AD_CONFIG.DISPLAY[`ENABLE_${adType.toUpperCase()}_ADS`] || false;
  },
  
  // Get CPM rate based on user type
  getCPMRate(userType = 'anonymous') {
    switch (userType) {
      case 'premium':
        return AD_CONFIG.REVENUE.PREMIUM_CPM;
      case 'registered':
        return AD_CONFIG.REVENUE.LOGGED_IN_CPM;
      default:
        return AD_CONFIG.REVENUE.ANONYMOUS_CPM;
    }
  },
  
  // Get targeting parameters
  getTargetingParams(userData = null) {
    const baseParams = {
      content_type: AD_TARGETING.CONTENT_TYPE,
      app_name: AD_TARGETING.APP_NAME
    };
    
    if (userData) {
      return {
        ...baseParams,
        user_id: userData.id,
        user_email: userData.email,
        user_type: userData.type || 'registered',
        login_days: userData.loginDays || 0
      };
    }
    
    return baseParams;
  }
};
