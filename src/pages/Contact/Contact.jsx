import React from 'react';
import './Contact.css'; // Стили для страницы
import ContactHeader from '../../components/layout/contactHeader/ContactHeader';
import ContactInfo from '../../components/layout/contactInfo/ContactInfo';
import YandexMap from '../../components/layout/yandexMap/YandexMap';

const Contact = () => {
  return (
    <div className="contact">
      <div className="contact__wrapper wrapper">
        <ContactHeader />
        <ContactInfo />
        <YandexMap />
      </div>
    </div>
  );
};

export default Contact;