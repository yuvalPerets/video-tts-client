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
  containerStyles, 
  cardStyles, 
  formStyles, 
  globalStyles 
} from './';

function UploadForm() {
  const {
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
  } = useVideoUpload();

  return (
    <div style={containerStyles}>
      <div style={cardStyles}>
        <Header />
        
        <form onSubmit={handleUpload} style={formStyles}>
          <FileUploadZone
            videoFile={videoFile}
            isDragOver={isDragOver}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFileSelect}
            fileInputRef={fileInputRef}
          />

          <TextInput
            text={text}
            onTextChange={setText}
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
