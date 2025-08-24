import { useState, useRef } from 'react';
import axios from 'axios';

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
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setVideoFile(files[0]);
      alert(`Selected: ${files[0].name}`);
    } else {
      alert("Please select a video file");
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      alert(`Selected: ${file.name}`);
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

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("text", text);

    try {
      setDownloading(true);
      resetProgress();
      setMessage("📤 Uploading video...");

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

      setProgress(prev => ({ ...prev, complete: true }));
      setMessage("⬇️ Downloading processed video...");

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
    fileInputRef,
    setText,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    handleUpload
  };
};
