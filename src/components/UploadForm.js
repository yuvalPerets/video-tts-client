import React, { useState } from "react";
import axios from "axios";

function UploadForm() {
  const [videoFile, setVideoFile] = useState(null);
  const [text, setText] = useState("");
  const [progress, setProgress] = useState(0);
  const [downloading, setDownloading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!videoFile || !text) return alert("Please upload a video and enter text.");

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("text", text);

    try {
      setDownloading(true);
      setProgress(0);
      setMessage("📤 Uploading and processing...");

      const response = await axios.post(
        "https://video-tts-backend.onrender.com/upload", // ✅ Use your backend URL
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          responseType: "blob",
          onUploadProgress: (e) => {
            const percent = e.loaded / e.total;
            setProgress(percent);
          },
          timeout: 180000,
        }
      );

      const blob = new Blob([response.data], { type: "video/mp4" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `processed_${Date.now()}.mp4`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage("✅ Video processed and downloaded.");
    } catch (err) {
      console.error("❌ Upload failed", err);
      setMessage("❌ Upload or processing failed.");
    } finally {
      setDownloading(false);
      setProgress(0);
    }
  };

  return (
    <form onSubmit={handleUpload} className="upload-form">
      <textarea
        placeholder="Enter your TTS text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setVideoFile(e.target.files[0])}
        required
      />
      <button type="submit" disabled={downloading}>
        {downloading ? "Processing..." : "Upload & Process"}
      </button>

      {downloading && (
        <>
          <progress value={progress} max="1" />
          <p>Uploading... {Math.round(progress * 100)}%</p>
        </>
      )}

      <p>{message}</p>
    </form>
  );
}

export default UploadForm;
