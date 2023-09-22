import React from "react";

function VideoPlayer(props) {
  const videoSrc = props.videoSrc;
  return (
    <div>
      <video width="100%" height="70%" autoPlay controls src={videoSrc}></video>
    </div>
  );
}

export default VideoPlayer;
