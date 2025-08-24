// Video usage tracking and ad management
const USAGE_KEY = 'video_tts_usage';
const FREE_VIDEOS_LIMIT = 3;

export const VideoUsageTracker = {
  // Get current usage from localStorage
  getUsage() {
    try {
      const usage = localStorage.getItem(USAGE_KEY);
      return usage ? JSON.parse(usage) : { count: 0, lastReset: Date.now() };
    } catch (error) {
      console.error('Error reading usage:', error);
      return { count: 0, lastReset: Date.now() };
    }
  },

  // Save usage to localStorage
  saveUsage(usage) {
    try {
      localStorage.setItem(USAGE_KEY, JSON.stringify(usage));
    } catch (error) {
      console.error('Error saving usage:', error);
    }
  },

  // Increment video count
  incrementUsage() {
    const usage = this.getUsage();
    usage.count += 1;
    this.saveUsage(usage);
    
    // Track in Google Analytics
    if (window.gtag) {
      window.gtag('event', 'video_processed', {
        event_category: 'usage',
        event_label: `count_${usage.count}`,
        value: usage.count
      });
    }
    
    return usage;
  },

  // Check if user needs to watch an ad
  needsAd() {
    const usage = this.getUsage();
    return usage.count >= FREE_VIDEOS_LIMIT;
  },

  // Get remaining free videos
  getRemainingFree() {
    const usage = this.getUsage();
    return Math.max(0, FREE_VIDEOS_LIMIT - usage.count);
  },

  // Reset usage (for testing or monthly reset)
  resetUsage() {
    const usage = { count: 0, lastReset: Date.now() };
    this.saveUsage(usage);
    return usage;
  },

  // Get usage statistics
  getStats() {
    const usage = this.getUsage();
    return {
      totalVideos: usage.count,
      remainingFree: this.getRemainingFree(),
      needsAd: this.needsAd(),
      lastReset: new Date(usage.lastReset)
    };
  }
};

// Google Analytics tracking functions
export const AnalyticsTracker = {
  // Track video upload
  trackVideoUpload(fileSize, duration) {
    if (window.gtag) {
      window.gtag('event', 'video_upload', {
        event_category: 'video',
        event_label: 'upload',
        value: Math.round(fileSize / (1024 * 1024)), // Size in MB
        custom_parameter_1: duration // Duration in seconds
      });
    }
  },

  // Track video processing start
  trackProcessingStart(quality) {
    if (window.gtag) {
      window.gtag('event', 'processing_start', {
        event_category: 'video',
        event_label: quality,
        custom_parameter_2: quality
      });
    }
  },

  // Track video processing complete
  trackProcessingComplete(duration) {
    if (window.gtag) {
      window.gtag('event', 'processing_complete', {
        event_category: 'video',
        event_label: 'success',
        value: Math.round(duration / 1000) // Processing time in seconds
      });
    }
  },

  // Track ad view
  trackAdView(adType, position) {
    if (window.gtag) {
      window.gtag('event', 'ad_view', {
        event_category: 'ads',
        event_label: adType,
        custom_parameter_3: position
      });
    }
  },

  // Track ad click
  trackAdClick(adType, position) {
    if (window.gtag) {
      window.gtag('event', 'ad_click', {
        event_category: 'ads',
        event_label: adType,
        custom_parameter_3: position
      });
    }
  },

  // Track user session
  trackSession() {
    if (window.gtag) {
      window.gtag('event', 'session_start', {
        event_category: 'user',
        event_label: 'app_visit'
      });
    }
  }
};
