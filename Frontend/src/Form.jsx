import React from 'react';
import {useState} from "react";
import { CircleX } from 'lucide-react';
import "./css/form.css"

export const Form = ({onAddCard}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCard({title, description, url});
        setTitle('');
        setDescription('');
        setUrl('');}
        return(
            <>
                <div className="form-overlay">
                    <form className="card-form" onSubmit={handleSubmit}>

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
                        <button type="submit" className="submit-btn">Add Card</button>
                        <div className="close-button">
                            <CircleX />
                        </div>
                    </form>
                </div>
            </>
        )
    }