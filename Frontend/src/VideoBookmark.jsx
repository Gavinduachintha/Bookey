import React from "react";
import "./css/Videocard.css";

const VideoBookmark = ({
                           title,
                           description,
                           url,
                           time,
                           thumbnail,
                           onClick
                       }) => {
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
        <div className="video-bookmark" onClick={() => onClick(time)}>
            {/* Thumbnail Section */}
            <div className="thumbnail-wrapper">
                <img
                    src={thumbnail}
                    alt={title}
                    className="bookmark-thumbnail"
                />
                <span className="thumbnail-time">
                    {formatTime(time)}
                </span>
            </div>

            {/* Content Section */}
            <div className="bookmark-content">
                <h3 className="bookmark-title">{title}</h3>
                <p className="bookmark-description">{description}</p>
                <span className="bookmark-url">{url}</span>
            </div>
        </div>
    );
};

export default VideoBookmark;
