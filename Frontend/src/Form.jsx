import React from 'react';
import {useState} from "react";
import "./css/form.css"

export const Form = ({onAddCard, onClose}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCard({title, description, url});
        setTitle('');
        setDescription('');
        setUrl('');
        onClose();
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
