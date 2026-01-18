import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import "./css/form.css";

export const AddVideoBookmark = ({ onAddCard, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // POST to the video-bookmarks endpoint expected by the backend
            const response = await axios.post("/api/video-bookmarks", {
                title,
                description,
                url,
                videoUrl,
                // no time/duration input per request — backend will accept 0 if not provided
                duration: 0,
            });

            onAddCard(response.data);

            // Reset form
            setTitle("");
            setDescription("");
            setUrl("");
            setVideoUrl("");
            onClose();

            console.log("✅ Video bookmark added:", response.data);
        } catch (err) {
            console.error("❌ Error submitting video bookmark:", err);
            setError("Failed to add video bookmark. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const portalContent = (
        <div className="form-overlay" onClick={onClose}>
            <form
                className="card-form"
                onSubmit={handleSubmit}
                onClick={(e) => e.stopPropagation()}
            >
                <h3>Add New Video Bookmark</h3>

                {error && <p className="form-error">{error}</p>}

                <label>
                    Title:
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Description:
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>

                <label>
                    Page URL:
                    <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Video URL:
                    <input
                        type="url"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        required
                    />
                </label>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Saving..." : "Add Video Bookmark"}
                    </button>
                </div>
            </form>
        </div>
    );

    return createPortal(portalContent, document.body);
};
