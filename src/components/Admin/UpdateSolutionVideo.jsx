import React from "react";
import { useState } from "react";

const UpdateSolutionVideo = () => {
  const [url, setUrl] = useState("");

  const updateVideo = async () => {
    await fetch("https://gateprocs.vercel.app/youtube-video-update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        youtubeVideoUrl: url,
      }),
    });

    alert("Video Updated");
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <input
        className="otp-section"
        type="text"
        placeholder="Youtube Embed URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button className='btn btn-success' onClick={updateVideo}>Update Video</button>
      </div>
    </div>
  );
};

export default UpdateSolutionVideo;
