import React from "react";
import { Trash, Pencil, ExternalLink } from "lucide-react";
import "./css/card.css";
import fallbackImg from "./assets/react.svg";

// Helper: derive a favicon URL from a page URL
const getFavicon = (pageUrl) => {
    try {
        if (!pageUrl) return fallbackImg;
        const normalized = pageUrl.includes("://") ? pageUrl : `https://${pageUrl}`;
        const hostname = new URL(normalized).hostname;
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (e) {
        return fallbackImg;
    }
};

export const Card = ({id, title, description, url,onDelete }) => {
    const favicon = getFavicon(url);

    return (
        <div className="card">
            {/* Header: Favicon + Title */}
            <div className="card-header">
                <div className="favicon-container">
                    <img
                        src={favicon}
                        alt={`${title} favicon`}
                        className="card-favicon"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = fallbackImg;
                        }}
                    />
                </div>
                <h3 className="card-title" title={title}>
                    {title}
                </h3>
            </div>

            {/* Content: URL + Description */}
            <div className="card-body">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-url"
                    title={url}
                >
                    {new URL(url).hostname.replace("www.", "")}
                </a>
                {description && (
                    <p className="card-description" title={description}>
                        {description}
                    </p>
                )}
            </div>

            {/* Actions: Buttons */}
            <div className="card-actions">
                <button
                    className="card-action-button visit-button"
                    aria-label="Visit website"
                    onClick={() => window.open(url, "_blank")}
                >
                    <ExternalLink size={16} />
                </button>
                <button
                    className="card-action-button edit-button"
                    aria-label="Edit bookmark"
                >
                    <Pencil size={16} />
                </button>
                <button
                    className="card-action-button delete-button"
                    aria-label="Delete bookmark"
                    onClick={()=>onDelete(id)}
                >
                    <Trash size={16} />
                </button>
            </div>
        </div>
    );
};
