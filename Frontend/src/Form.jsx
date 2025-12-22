import React, { useState } from "react";
import axios from "axios";
import "./css/form.css";

export const Form = ({ onAddCard, onClose }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [url, setUrl] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        // validate time if provided
        let timeValue = null;
        if (time !== "") {
            const parsed = parseInt(time, 10);
            if (isNaN(parsed) || parsed < 0) {
                setError("Time must be a non-negative integer (seconds) or left empty.");
                setLoading(false);
                return;
            }
            timeValue = parsed;
        }

        try {
            // ✅ This matches your MongoDB Spring Boot Controller:
            // POST /api/bookmarks
            const response = await axios.post("/api/bookmarks", {
                title,
                description,
                url,
                time: timeValue,
            });

            // ✅ MongoDB will return the saved object with STRING id
            onAddCard(response.data);

            // ✅ Reset form
            setTitle("");
            setDescription("");
            setUrl("");
            setTime("");
            onClose();

            console.log("✅ Bookmark added:", response.data);
        } catch (err) {
            console.error("❌ Error submitting bookmark:", err);
            setError("Failed to add bookmark. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="form-overlay" onClick={onClose}>
                <form
                    className="card-form"
                    onSubmit={handleSubmit}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h3>Add New Bookmark</h3>

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
                        URL:
                        <input
                            type="url"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Time (seconds, optional):
                        <input
                            type="number"
                            min="0"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="e.g. 90"
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
                            {loading ? "Saving..." : "Add Card"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};
