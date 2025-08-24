import React from 'react';

const FileUploadZone = ({ 
  videoFile, 
  isDragOver, 
  onDragOver, 
  onDragLeave, 
  onDrop, 
  onFileSelect, 
  fileInputRef 
}) => {
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
        onChange={onFileSelect}
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
  );
};

export default FileUploadZone;
