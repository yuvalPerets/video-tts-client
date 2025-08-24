# 🚀 Ad Integration Setup Guide

## 📊 **Google Analytics Setup**

### **Step 1: Create Google Analytics Account**
1. Go to [Google Analytics](https://analytics.google.com/)
2. Click "Start measuring"
3. Create a new property for your video app
4. Get your **Measurement ID** (format: G-XXXXXXXXXX)

### **Step 2: Update Analytics ID**
Replace `GA_MEASUREMENT_ID` in `public/index.html` with your actual Measurement ID:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX', {
    page_title: 'Video TTS App',
    page_location: window.location.href,
    custom_map: {
      'custom_parameter_1': 'video_uploads',
      'custom_parameter_2': 'video_processing',
      'custom_parameter_3': 'ad_views'
    }
  });
</script>
```

### **Step 3: Verify Analytics**
1. Deploy your app
2. Visit your app and process a video
3. Check Google Analytics Real-Time reports
4. Verify events are being tracked

---

## 💰 **Google AdSense Setup**

### **Step 1: Create AdSense Account**
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Click "Get started"
3. Complete account setup and verification
4. Wait for approval (usually 1-2 weeks)

### **Step 2: Get AdSense Code**
1. In AdSense dashboard, go to "Ads" → "By ad unit"
2. Create new ad units for:
   - **Sidebar ads** (160×600)
   - **Modal ads** (300×250)
3. Copy the ad unit codes

### **Step 3: Update AdSense IDs**
Replace the placeholder IDs in the ad components:

#### **In `AdSidebar.js`:**
```javascript
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Your publisher ID
data-ad-slot="XXXXXXXXXX"                 // Your ad unit ID
```

#### **In `AdModal.js`:**
```javascript
data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"  // Your publisher ID
data-ad-slot="XXXXXXXXXX"                 // Your ad unit ID
```

### **Step 4: Add AdSense Script**
Add this script to `public/index.html` before the closing `</head>` tag:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous"></script>
```

---

## 📈 **Tracking Events**

### **Video Processing Events:**
- `video_upload` - When user uploads a video
- `processing_start` - When processing begins
- `processing_complete` - When processing finishes
- `video_processed` - Usage tracking

### **Ad Events:**
- `ad_view` - When ads are displayed
- `ad_click` - When ads are clicked
- `session_start` - When user visits the app

### **Usage Tracking:**
- Tracks free video usage (3 videos limit)
- Shows progress indicator
- Triggers ad requirements

---

## 🎯 **Ad Placement Strategy**

### **Sidebar Ads (Left & Right):**
- **Size**: 160×600 pixels
- **Position**: Fixed on screen edges
- **Revenue**: Low to medium
- **UX Impact**: Minimal

### **Modal Ads (Processing):**
- **Size**: 300×250 pixels
- **Trigger**: After 3 free videos
- **Duration**: 30 seconds
- **Revenue**: High
- **UX Impact**: Medium

---

## 📊 **Revenue Projections**

| Users | Monthly Ad Revenue | CPM Rate | Notes |
|-------|-------------------|----------|-------|
| 1,000 | $50-150 | $2-5 | Starting phase |
| 5,000 | $250-750 | $3-6 | Growth phase |
| 20,000 | $1,000-3,000 | $4-8 | Scale phase |

---

## 🔧 **Testing & Optimization**

### **Test Ad Integration:**
1. Process 3 videos (should be free)
2. Try 4th video (should show ad modal)
3. Verify ad display and completion
4. Check analytics tracking

### **Optimize Performance:**
1. Monitor ad load times
2. A/B test ad placements
3. Track user engagement
4. Optimize CPM rates

### **User Experience:**
1. Ensure ads don't block functionality
2. Provide clear ad completion feedback
3. Allow ad skipping when appropriate
4. Maintain app responsiveness

---

## 🚨 **Important Notes**

### **AdSense Policies:**
- Don't place ads too close to buttons
- Ensure clear separation between content and ads
- Follow AdSense program policies
- Don't encourage accidental clicks

### **User Experience:**
- Start with 3 free videos
- Show clear usage indicators
- Provide smooth ad experience
- Don't overwhelm with too many ads

### **Analytics Best Practices:**
- Respect user privacy
- Don't track sensitive information
- Use data for optimization only
- Comply with GDPR/CCPA if applicable

---

## 📞 **Support & Troubleshooting**

### **Common Issues:**
1. **Ads not showing**: Check AdSense approval status
2. **Analytics not tracking**: Verify Measurement ID
3. **Ad modal not appearing**: Check usage tracking logic
4. **Performance issues**: Optimize ad loading

### **Next Steps:**
1. Set up Google Analytics
2. Apply for AdSense
3. Test ad integration
4. Monitor performance
5. Optimize based on data

---

**Remember**: Start with a small number of ads and gradually increase based on user feedback and revenue performance. Focus on user experience first, then optimize for revenue.
