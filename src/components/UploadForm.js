import React, { useState, useRef } from "react";
import axios from "axios";

function UploadForm() {
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

  const getProgressPercent = () => {
    if (progress.complete) return 100;
    if (progress.processing) return 85;
    return progress.upload;
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '1rem',
      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '42rem',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '1rem',
        padding: '2rem',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '4rem',
            height: '4rem',
            borderRadius: '50%',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            🎬
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #a78bfa, #60a5fa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Video TTS Processor
          </h1>
          <p style={{ color: '#9ca3af' }}>
            Upload your video and add AI-generated voice narration
          </p>
        </div>

        <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* File Upload Zone */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: `2px dashed ${isDragOver ? '#8b5cf6' : 'rgba(255, 255, 255, 0.2)'}`,
              borderRadius: '0.75rem',
              padding: '2rem',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: isDragOver ? 'scale(1.02)' : 'scale(1)'
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              required
            />
            
            <div style={{ marginBottom: '1rem', fontSize: '2rem' }}>📁</div>
            
            {videoFile ? (
              <div>
                <p style={{ color: '#34d399', fontWeight: '500', marginBottom: '0.5rem' }}>
                  ✓ {videoFile.name}
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', color: 'white', marginBottom: '0.5rem' }}>
                  Drop your video here or click to browse
                </p>
                <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                  Supports MP4, MOV, AVI and other video formats
                </p>
              </div>
            )}
          </div>

          {/* Text Input */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white', marginBottom: '0.5rem', display: 'block' }}>
              TTS Text
            </label>
            <textarea
              placeholder="Enter the text you want to convert to speech and add to your video..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              style={{
                width: '100%',
                minHeight: '120px',
                padding: '0.75rem',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '0.5rem',
                color: 'white',
                resize: 'none',
                fontSize: '0.875rem'
              }}
              required
            />
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              {text.length} characters
            </p>
          </div>

          {/* Progress Section */}
          {downloading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  border: '2px solid #8b5cf6',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: 'white' }}>{message}</span>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'white' }}>Progress</span>
                  <span style={{ color: 'white' }}>{getProgressPercent()}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.25rem',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${getProgressPercent()}%`,
                    height: '100%',
                    background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>
            </div>
          )}

          {/* Status Message */}
          {message && !downloading && (
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <span style={{ fontSize: '0.875rem', color: 'white' }}>{message}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={downloading || !videoFile || !text.trim()}
            style={{
              width: '100%',
              background: downloading || !videoFile || !text.trim() ? 
                'rgba(255, 255, 255, 0.1)' : 
                'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              color: 'white',
              fontWeight: '500',
              padding: '1.5rem',
              fontSize: '1.125rem',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: downloading || !videoFile || !text.trim() ? 'not-allowed' : 'pointer',
              opacity: downloading || !videoFile || !text.trim() ? 0.5 : 1,
              transition: 'all 0.3s ease'
            }}
          >
            {downloading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '1.25rem', 
                  height: '1.25rem', 
                  border: '2px solid white',
                  borderTopColor: 'transparent',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Processing...
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                📥 Process Video
              </div>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af' }}>
          <p>Your video will be processed with AI-generated speech and returned as a downloadable file</p>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default UploadForm;
