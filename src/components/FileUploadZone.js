import React, { useState, useEffect } from 'react';
import { validateVideoFile, getFileSizeInMB, getVideoMetadata, formatDuration } from '../utils/videoOptimizer';
import { convertToMp4 } from '../utils/convertToMp4';

const FileUploadZone = ({ 
  videoFile, 
  isDragOver, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileSelect, 
  fileInputRef,
  validationErrors = []
}) => {
  const [videoInfo, setVideoInfo] = useState(null);

  useEffect(() => {
    if (videoFile) {
      getVideoMetadata(videoFile)
        .then(metadata => setVideoInfo(metadata))
        .catch(err => console.error('Failed to get video metadata:', err));
    } else {
      setVideoInfo(null);
    }
  }, [videoFile]);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type !== 'video/mp4') {
      // Optionally show a loading indicator here
      const mp4File = await convertToMp4(file);
      onFileSelect({ target: { files: [mp4File] } });
    } else {
      onFileSelect(e);
    }
  };

  return (
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
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
            {getFileSizeInMB(videoFile.size)} MB
            {videoInfo && (
              <span style={{ marginLeft: '1rem' }}>
                • {videoInfo.width}×{videoInfo.height} • {formatDuration(videoInfo.duration)}
              </span>
            )}
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
            <p style={{ color: '#9ca3af', fontSize: '0.75rem', marginTop: '0.5rem' }}>
              Max file size: 50MB • Max duration: 5 minutes
            </p>
        </div>
      )}
      
      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '0.5rem' }}>
          {validationErrors.map((error, index) => (
            <p key={index} style={{ color: '#fca5a5', fontSize: '0.875rem', margin: '0.25rem 0' }}>
              ⚠️ {error}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadZone;
