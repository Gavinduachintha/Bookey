import React from "react";
import "./card.css"

export const Card = ({title,description,url})=>{
    return(
        <div className="card">
            <img src={url} alt={title} className="card-image"/>
            <div className="card-content">
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
            </div>
            <div className="button">
                <button className="delete">Delete</button>
                <button className="edit">Edit</button>
            </div>
        </div>

    )
}