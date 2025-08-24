// Video optimization utilities

// Limits for uploads
export const VIDEO_LIMITS = {
  MAX_FILE_SIZE: 50 * 1024 * 1024, // 50MB
  MAX_DURATION: 300,               // 5 minutes
  MAX_RESOLUTION: 1920,            // 1080p max
  COMPRESSION_QUALITY: 0.8,        // 80% quality
};

// Quality presets (for future compression)
export const QUALITY_PRESETS = {
  LOW: {
    name: 'Low Quality (Fast)',
    maxBitrate: 1000000, // 1 Mbps
    maxResolution: 720,
    compressionQuality: 0.6
  },
  MEDIUM: {
    name: 'Medium Quality (Balanced)',
    maxBitrate: 2000000, // 2 Mbps
    maxResolution: 1080,
    compressionQuality: 0.8
  },
  HIGH: {
    name: 'High Quality (Premium)',
    maxBitrate: 5000000, // 5 Mbps
    maxResolution: 1920,
    compressionQuality: 0.9
  }
};

// Validate video file
export const validateVideoFile = (file) => {
  const errors = [];

  // Check file size
  if (file.size > VIDEO_LIMITS.MAX_FILE_SIZE) {
    errors.push(`File too large. Maximum size is ${getFileSizeInMB(VIDEO_LIMITS.MAX_FILE_SIZE)} MB`);
  }

  // Check if file is a video
  if (!file.type.startsWith('video/')) {
    errors.push('Please select a valid video file');
  }

  // Optional: warn for uncommon formats
  const commonFormats = ['video/mp4','video/webm','video/ogg','video/avi','video/mov'];
  if (!commonFormats.includes(file.type)) {
    console.warn(`⚠️ Browser may not natively play this video format: ${file.type}`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Skip client-side compression for now
export const compressVideo = async (file, quality = 'MEDIUM') => {
  const preset = QUALITY_PRESETS[quality];

  console.log('Skipping client-side compression to preserve audio streams');
  return file;

  // TODO: Implement proper video compression using WebCodecs or FFmpeg.wasm
};

// Helpers
export const getFileSizeInMB = (bytes) => (bytes / (1024 * 1024)).toFixed(2);

export const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Get video metadata
export const getVideoMetadata = (file) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      resolve({
        duration: video.duration,
        width: video.videoWidth,
        height: video.videoHeight,
        hasAudio: video.audioTracks && video.audioTracks.length > 0
      });
    };

    video.onerror = () => reject(new Error('Failed to load video metadata'));

    video.src = URL.createObjectURL(file);
  });
};
