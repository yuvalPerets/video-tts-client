import React from 'react';
import { useVideoUpload } from '../hooks';
import { 
  Header, 
  FileUploadZone, 
  TextInput, 
  ProgressBar, 
  StatusMessage, 
  SubmitButton, 
  Footer,
  QualitySelector,
  UsageIndicator,
  containerStyles, 
  cardStyles, 
  formStyles, 
  globalStyles 
} from './';

function UploadForm({ onUploadRequest }) {
  const {
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
    handleUpload: originalHandleUpload
  } = useVideoUpload();

  // Override the handleUpload to check for ad requirements
  const handleUpload = async (e) => {
    e.preventDefault();
    
    if (!videoFile || !text.trim()) {
      alert("Please upload a video and enter text for TTS");
      return;
    }

    // Check if user needs to watch an ad
    const { VideoUsageTracker } = await import('../utils/videoUsageTracker');
    
    if (VideoUsageTracker.needsAd()) {
      // Show ad modal before processing
      onUploadRequest({
        videoFile,
        text,
        selectedQuality,
        onContinue: () => {
          // This will be called after ad is watched
          originalHandleUpload(e);
        }
      });
    } else {
      // Process immediately (free video)
      originalHandleUpload(e);
    }
  };

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <Header />
        
        {/* Usage Indicator */}
        <UsageIndicator />
        
        <form onSubmit={handleUpload} style={formStyles}>
          <FileUploadZone
            videoFile={videoFile}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
            validationErrors={validationErrors}
          />

          <TextInput
            text={text}
            onTextChange={setText}
          />

          <QualitySelector
            selectedQuality={selectedQuality}
            onQualityChange={setSelectedQuality}
            isProcessing={downloading}
          />

          <ProgressBar
            downloading={downloading}
            message={message}
            progress={progress}
          />

          <StatusMessage
            message={message}
            downloading={downloading}
          />

          <SubmitButton
            downloading={downloading}
            videoFile={videoFile}
            text={text}
            onSubmit={handleUpload}
          />
        </form>

        <Footer />
      </div>

      <style>
        {globalStyles}
      </style>
    </div>
  );
}

export default UploadForm;
