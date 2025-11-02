import React from "react";
import { Trash,Pencil,Link   } from 'lucide-react';
import "./css/card.css"
import fallbackImg from './assets/react.svg';

// Helper: derive a favicon URL from a page URL (uses Google's favicon service)
const getFavicon = (pageUrl) => {
    try {
        if (!pageUrl) return fallbackImg;
        // Ensure there's a protocol so URL parses correctly
        const normalized = pageUrl.includes('://') ? pageUrl : `https://${pageUrl}`;
        const hostname = new URL(normalized).hostname;
        // Google's favicon endpoint returns a small favicon for the domain.
        // sz can be adjusted (16, 32, 64). If you'd prefer another provider, swap the URL.
        return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
    } catch (e) {
        return fallbackImg;
    }
}

export const Card = ({title, description, url}) => {
    const favicon = getFavicon(url);

    return (
        <div className="card">
            <div className="heading">
                <img
                    src={favicon}
                    alt={`${title} favicon`}
                    className="card-image"
                    onError={(e) => { /* fallback if service fails or returns invalid image */
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = fallbackImg;
                    }}
                />
                <h2 className="card-title" title={title}>{title}</h2>
            </div>

            <div className="card-content">
                <p className="card-url" title={url}>{url}</p>
                {description && <p className="card-description">{description}</p>}
            </div>
            <div className="card-actions">
                <button className="button-visit" aria-label="Visit website">
                    <Link size={18} />
                </button>
                <button className="button-edit" aria-label="Edit bookmark">
                    <Pencil size={18} />
                </button>
                <button className="button-delete" aria-label="Delete bookmark">
                    <Trash size={18} />
                </button>
            </div>
        </div>

    )
}