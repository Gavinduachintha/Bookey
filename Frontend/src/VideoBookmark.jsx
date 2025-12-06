import React from "react";
import "./css/Videocard.css";

const VideoBookmark = ({ title, description, url, time, onClick }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="video-bookmark" onClick={() => onClick(time)}>
            <span className="bookmark-time">{formatTime(time)}</span>
            <span className="bookmark-title">{title}</span>
            <span className="bookmark-description">{description}</span>
            <span className="bookmark-url">{url}</span>
        </div>
    );
};

export default VideoBookmark;
