import React from 'react';
import './Request.css'; // Подключаем стили
import DeliveryCalculator from '../../components/layout/deliveryCalculator/DeliveryCalculator';
import TransportSection from '../../components/layout/transportSection/TransportSection';

const Request = () => {
    return (
        <div className="request">
            <div className="request__wrapper wrapper">
                <TransportSection />
                <DeliveryCalculator />
            </div>
        </div>
    );
};

export default Request;