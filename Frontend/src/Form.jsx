import React from 'react';
import {useState} from "react";
import axios from "axios";
import "./css/form.css"

export const Form = ({onAddCard, onClose}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // use relative path so dev-server proxy or same-origin works
            const response = await axios.post('/api/bookmarks', {
                title, description, url
            });
            onAddCard(response.data);
            setTitle('');
            setDescription('');
            setUrl('');
            onClose();
            console.log('Bookmark added:', response.data);
        } catch (error) {
            console.error("Error submitting bookmark:", error);
        }
    };

    return(
        <>
            <div className="form-overlay" onClick={onClose}>
                <form className="card-form" onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>

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
                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="submit-btn">Add Card</button>
                    </div>
                </form>
            </div>
        </>
    );
};
