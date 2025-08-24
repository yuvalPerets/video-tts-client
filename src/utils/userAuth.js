// User Authentication Utility for Better Ad Revenue

const USER_KEY = 'video_tts_user';
const LOGIN_REQUIRED_KEY = 'video_tts_login_required';

export const UserAuth = {
  // Get current user
  getCurrentUser() {
    try {
      const userData = localStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  },

  // Set user data
  setUser(userData) {
    try {
      localStorage.setItem(USER_KEY, JSON.stringify({
        ...userData,
        loginDate: new Date().toISOString(),
        lastActivity: new Date().toISOString()
      }));
      
      // Track login event for analytics
      if (window.gtag) {
        window.gtag('event', 'login', {
          event_category: 'engagement',
          event_label: 'user_login',
          value: 1
        });
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  },

  // Clear user data
  logout() {
    try {
      localStorage.removeItem(USER_KEY);
      
      // Track logout event
      if (window.gtag) {
        window.gtag('event', 'logout', {
          event_category: 'engagement',
          event_label: 'user_logout',
          value: 1
        });
      }
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  },

  // Check if user is logged in
  isLoggedIn() {
    return !!this.getCurrentUser();
  },

  // Update last activity
  updateActivity() {
    const user = this.getCurrentUser();
    if (user) {
      this.setUser({
        ...user,
        lastActivity: new Date().toISOString()
      });
    }
  },

  // Get user ID for ad targeting
  getUserId() {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  },

  // Get user email for ad targeting
  getUserEmail() {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  },

  // Check if login is required for better ads
  isLoginRequired() {
    try {
      return localStorage.getItem(LOGIN_REQUIRED_KEY) === 'true';
    } catch (error) {
      return false;
    }
  },

  // Set login requirement
  setLoginRequired(required) {
    try {
      localStorage.setItem(LOGIN_REQUIRED_KEY, required.toString());
    } catch (error) {
      console.error('Error setting login requirement:', error);
    }
  },

  // Get user stats for analytics
  getUserStats() {
    const user = this.getCurrentUser();
    if (!user) return null;

    return {
      userId: user.id,
      email: user.email,
      loginDate: user.loginDate,
      lastActivity: user.lastActivity,
      daysSinceLogin: user.loginDate ? 
        Math.floor((new Date() - new Date(user.loginDate)) / (1000 * 60 * 60 * 24)) : 0
    };
  }
};

// Enhanced ad targeting with user data
export const AdTargeting = {
  // Get targeting parameters for ads
  getTargetingParams() {
    const user = UserAuth.getCurrentUser();
    const params = {
      // Basic targeting
      content_type: 'video_processing',
      app_name: 'video_tts',
      
      // User targeting (if logged in)
      ...(user && {
        user_id: user.id,
        user_email: user.email,
        user_type: 'registered',
        login_days: Math.floor((new Date() - new Date(user.loginDate)) / (1000 * 60 * 60 * 24))
      })
    };

    return params;
  },

  // Set custom ad targeting
  setCustomTargeting() {
    const params = this.getTargetingParams();
    
    // Set Google AdSense targeting
    if (window.adsbygoogle) {
      Object.entries(params).forEach(([key, value]) => {
        window.adsbygoogle.push({
          [key]: value
        });
      });
    }

    // Set Google Analytics custom dimensions
    if (window.gtag) {
      Object.entries(params).forEach(([key, value]) => {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          custom_map: {
            [`custom_parameter_${key}`]: key
          },
          [`custom_parameter_${key}`]: value
        });
      });
    }
  }
};

// Revenue optimization utilities
export const RevenueOptimizer = {
  // Calculate expected CPM based on user status
  getExpectedCPM() {
    const user = UserAuth.getCurrentUser();
    
    if (user) {
      // Logged-in users get higher CPM
      const baseCPM = 8; // $8 CPM for logged-in users
      const daysSinceLogin = Math.floor((new Date() - new Date(user.loginDate)) / (1000 * 60 * 60 * 24));
      
      // Bonus for recent users
      if (daysSinceLogin <= 7) {
        return baseCPM * 1.5; // $12 CPM for new users
      } else if (daysSinceLogin <= 30) {
        return baseCPM * 1.2; // $9.6 CPM for active users
      }
      
      return baseCPM; // $8 CPM for regular users
    } else {
      // Anonymous users get lower CPM
      return 3; // $3 CPM for anonymous users
    }
  },

  // Get revenue projection
  getRevenueProjection(userCount, days = 30) {
    const loggedInUsers = Math.floor(userCount * 0.3); // Assume 30% login rate
    const anonymousUsers = userCount - loggedInUsers;
    
    const loggedInCPM = this.getExpectedCPM();
    const anonymousCPM = 3;
    
    const loggedInRevenue = (loggedInUsers * loggedInCPM * days) / 1000;
    const anonymousRevenue = (anonymousUsers * anonymousCPM * days) / 1000;
    
    return {
      total: loggedInRevenue + anonymousRevenue,
      loggedIn: loggedInRevenue,
      anonymous: anonymousRevenue,
      breakdown: {
        loggedInUsers,
        anonymousUsers,
        loggedInCPM,
        anonymousCPM
      }
    };
  }
};
