import React, { useState } from "react";
import { Trash, Pencil, ExternalLink, Check, X, Play } from "lucide-react";
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

const formatTime = (seconds) => {
    if (seconds == null) return "";
    const s = Number(seconds);
    if (isNaN(s)) return "";
    const mins = Math.floor(s / 60);
    const secs = Math.floor(s % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
};

export const Card = ({ id, title, description, url, time, onDelete, onUpdate }) => {
    const favicon = getFavicon(url);
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ title: title || "", url: url || "", description: description || "", time: time != null ? String(time) : "" });
    const [saving, setSaving] = useState(false);

    // update local form when parent props change (simple sync)
    React.useEffect(() => {
        setForm({ title: title || "", url: url || "", description: description || "", time: time != null ? String(time) : "" });
    }, [title, url, description, time]);

    const startEdit = () => {
        setForm({ title: title || "", url: url || "", description: description || "", time: time != null ? String(time) : "" });
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
    };

    const saveEdit = async () => {
        if (!onUpdate) {
            setEditing(false);
            return;
        }
        setSaving(true);
        try {
            const timeValue = form.time === "" ? null : parseInt(form.time, 10);
            await onUpdate(id, { title: form.title, url: form.url, description: form.description, time: timeValue });
            setEditing(false);
        } catch (e) {
            console.error('Failed to save bookmark', e);
            // keep editing open so user can retry
        } finally {
            setSaving(false);
        }
    };

    const safeHostname = (() => {
        try {
            const normalized = form.url && form.url.includes("://") ? form.url : `https://${form.url}`;
            return new URL(normalized).hostname.replace("www.", "");
        } catch (e) {
            return form.url || url || "";
        }
    })();

    const handlePlay = () => {
        const playTime = time;
        if (!url || playTime == null) return;
        const sep = url.includes('?') ? '&' : '?';
        // append t param; many players accept t for seconds
        const playUrl = `${url}${sep}t=${playTime}`;
        window.open(playUrl, '_blank');
    };

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
                {!editing ? (
                    <h3 className="card-title" title={title}>
                        {title}
                    </h3>
                ) : (
                    <input
                        className="card-input"
                        value={form.title}
                        onChange={(e) => setForm((s) => ({ ...s, title: e.target.value }))}
                        placeholder="Title"
                    />
                )}
            </div>

            {/* Content: URL + Description */}
            <div className="card-body">
                {!editing ? (
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card-url"
                        title={url}
                    >
                        {safeHostname}
                    </a>
                ) : (
                    <input
                        className="card-input"
                        value={form.url}
                        onChange={(e) => setForm((s) => ({ ...s, url: e.target.value }))}
                        placeholder="URL"
                    />
                )}

                {!editing && description && (
                    <p className="card-description" title={description}>
                        {description}
                    </p>
                )}

                {editing && (
                    <textarea
                        className="card-textarea"
                        value={form.description}
                        onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                        placeholder="Description"
                    />
                )}

                {/* show time when not editing */}
                {!editing && time != null && (
                    <div className="card-time-badge">{formatTime(time)}</div>
                )}

                {editing && (
                    <label className="card-time-input">
                        Time (seconds):
                        <input
                            type="number"
                            min="0"
                            value={form.time}
                            onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
                            placeholder="e.g. 90"
                        />
                    </label>
                )}
            </div>

            {/* Actions: Buttons */}
            <div className="card-actions">
                <button
                    className="card-action-button visit-button"
                    aria-label="Visit website"
                    onClick={() => window.open(form.url || url, "_blank")}
                >
                    <ExternalLink size={16} />
                </button>

                {!editing ? (
                    <>
                        {/* Play button if time exists */}
                        {time != null && (
                            <button
                                className="card-action-button play-button"
                                aria-label="Play bookmark"
                                onClick={handlePlay}
                            >
                                <Play size={16} />
                            </button>
                        )}

                        <button
                            className="card-action-button edit-button"
                            aria-label="Edit bookmark"
                            onClick={startEdit}
                        >
                            <Pencil size={16} />
                        </button>

                        <button
                            className="card-action-button delete-button"
                            aria-label="Delete bookmark"
                            onClick={() => {
                                if (!onDelete) return;
                                if (window.confirm(`Delete "${title}"?`)) onDelete(id);
                            }}
                        >
                            <Trash size={16} />
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="card-action-button save-button"
                            aria-label="Save bookmark"
                            onClick={saveEdit}
                            disabled={saving}
                        >
                            <Check size={16} />
                        </button>
                        <button
                            className="card-action-button cancel-button"
                            aria-label="Cancel edit"
                            onClick={cancelEdit}
                            disabled={saving}
                        >
                            <X size={16} />
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
