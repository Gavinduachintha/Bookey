import React from "react";
import { Trash,Pencil,Link   } from 'lucide-react';
import "./css/card.css"

export const Card = ({title, description, url}) => {
    return (
        <div className="card">
            <div className="heading">
                <img
                    src={`${url}`}
                    alt={`${title} favicon`}
                    className="card-image"
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