import React from "react";
import { Trash, ExternalLink } from "lucide-react";
import "./css/Videocard.css";

const VideoBookmark = ({
                           id,
                           title,
                           description,
                           url,
                           onClick,
                            videoUrl,
                           onDelete
                       }) => {
    return (
        <div className="video-bookmark" onClick={() => onClick && onClick(time)}>
            {/* Thumbnail Section */}

            {/* Content Section */}
            <div className="bookmark-content">
                <h3 className="bookmark-title">{title}</h3>
                <p className="bookmark-description">{description}</p>
                <span className="bookmark-url">{videoUrl}</span>
            </div>

            {/* Actions: Open and Delete buttons */}
            <div className="card-actions">
                <button
                    className="card-action-button visit-button"
                    aria-label="Visit website"
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(url);
                    }}
                >
                    <ExternalLink size={16} />
                </button>

                {onDelete && (
                    <button
                        className="card-action-button delete-button"
                        aria-label="Delete video bookmark"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete "${title}"?`)) onDelete(id);
                        }}
                    >
                        <Trash size={16} />
                    </button>
                )}
            </div>
        </div>
    );
};

export default VideoBookmark;
