import React from 'react';
import './Request.css'; // Подключаем стили
import DeliveryCalculator from '../../components/layout/deliveryCalculator/DeliveryCalculator';

const Request = () => {
    return (
        <div className="request">
            <DeliveryCalculator fullForm showContacts={false} />
        </div>
    );
};

export default Request;