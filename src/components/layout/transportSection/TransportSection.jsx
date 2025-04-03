import React from 'react';
import TransportCard from '../../common/TransportCard/TransportCard';
import './TransportSection.css'; // Стили для секции

const TransportSection = () => {
    // Пример данных для карточек
    const transportData = [
        {
            id: 1,
            title: 'АВТО',
            description: 'Быстрая доставка по городу и области.',
            deliveryTime: '1-2 дня',
            imageUrl: 'https://via.placeholder.com/150', // Замените на реальный URL изображения
        },
        {
            id: 2,
            title: 'Ж/Д',
            description: 'Экономичная доставка по всей стране.',
            deliveryTime: '3-5 дней',
            imageUrl: 'https://via.placeholder.com/150',
        },
        {
            id: 3,
            title: 'АВИА',
            description: 'Самый быстрый способ доставки.',
            deliveryTime: '1 день',
            imageUrl: 'https://via.placeholder.com/150',
        },
    ];

    return (
        <div className="transport-section">
            <h2 className="transport-section-title">Виды транспорта для доставки</h2>
            <div className="transport-cards-container">
                {transportData.map((transport) => (
                    <TransportCard
                        key={transport.id}
                        title={transport.title}
                        description={transport.description}
                        deliveryTime={transport.deliveryTime}
                        imageUrl={transport.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransportSection;