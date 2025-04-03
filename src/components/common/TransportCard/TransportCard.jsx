import React from 'react';
import './TransportCard.css'; // Стили для карточки

const TransportCard = ({ title, description, deliveryTime, imageUrl }) => {
    return (
        <div className="transport-card">
            <div className="transport-card-content">
                <h2 className="transport-card-title">{title}</h2>
                <p className="transport-card-description">{description}</p>
            </div>
            <div className="transport-card-delivery-time">
                <p>{deliveryTime}</p>
            </div>
            <div className="transport-card-image">
                <img src={imageUrl} alt={title} />
            </div>
        </div>
    );
};

export default TransportCard;