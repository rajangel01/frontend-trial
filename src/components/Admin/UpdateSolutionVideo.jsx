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
    <div className="container">
      <input
        type="text"
        placeholder="Youtube Embed URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button onClick={updateVideo}>Update Video</button>
    </div>
  );
};

export default UpdateSolutionVideo;
