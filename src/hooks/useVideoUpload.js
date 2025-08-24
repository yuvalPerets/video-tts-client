import { useState, useRef } from 'react';
import axios from 'axios';
import { validateVideoFile, compressVideo, VIDEO_LIMITS } from '../utils/videoOptimizer';
import { VideoUsageTracker, AnalyticsTracker } from '../utils/videoUsageTracker';

export const useVideoUpload = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState({
    upload: 0,
    processing: false,
    complete: false
  });
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedQuality, setSelectedQuality] = useState('MEDIUM');
  const [validationErrors, setValidationErrors] = useState([]);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const validation = validateVideoFile(file);
      
      if (validation.isValid) {
        setVideoFile(file);
        setValidationErrors([]);
      } else {
        setValidationErrors(validation.errors);
        setVideoFile(null);
      }
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateVideoFile(file);
      
      if (validation.isValid) {
        setVideoFile(file);
        setValidationErrors([]);
      } else {
        setValidationErrors(validation.errors);
        setVideoFile(null);
      }
    }
  };

  const resetProgress = () => {
    setProgress({ upload: 0, processing: false, complete: false });
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!videoFile || !text.trim()) {
      alert("Please upload a video and enter text for TTS");
      return;
    }

    try {
      setDownloading(true);
      resetProgress();
      setMessage("📤 Uploading video...");

      // Track video upload
      AnalyticsTracker.trackVideoUpload(videoFile.size, 0); // Duration will be updated later
      AnalyticsTracker.trackProcessingStart(selectedQuality);

      const formData = new FormData();
      formData.append("video", videoFile);
      formData.append("text", text);
      formData.append("quality", selectedQuality);

      const startTime = Date.now();

      const response = await axios.post(
        "https://video-tts-backend.onrender.com/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const uploadPercent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
              setProgress(prev => ({ ...prev, upload: uploadPercent }));
              
              if (uploadPercent === 100) {
                setMessage("🎬 Processing video with TTS...");
                setProgress(prev => ({ ...prev, processing: true }));
              }
            }
          },
          timeout: 180000,
        }
      );

      const processingTime = Date.now() - startTime;

      setProgress(prev => ({ ...prev, complete: true }));
      setMessage("⬇️ Downloading processed video...");

      // Track processing completion
      AnalyticsTracker.trackProcessingComplete(processingTime);

      // Increment usage count
      VideoUsageTracker.incrementUsage();

      // Create download
      const blob = new Blob([response.data], { type: "video/mp4" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `tts_video_${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

      setMessage("✅ Video processed and downloaded successfully!");

    } catch (err) {
      console.error("Upload failed:", err);
      setMessage("❌ Processing failed. Please try again.");
    } finally {
      setDownloading(false);
      setTimeout(() => resetProgress(), 3000);
    }
  };

  return {
    videoFile,
    text,
    progress,
    downloading,
    message,
    isDragOver,
    selectedQuality,
    validationErrors,
    fileInputRef,
    setText,
    setSelectedQuality,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleUpload
  };

  return {
    videoFile,
    text,
    progress,
    downloading,
    message,
    isDragOver,
    fileInputRef,
    setText,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleUpload
  };
};
