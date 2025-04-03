import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactHeader.css';

const ContactHeader = () => {
    const { t } = useTranslation('contact'); // Указываем пространство имён

    return (
        <section className="contact-header">
            <div className="contact__wrapper">
                <h1 className="contact-header__title">
                    {t('header.title')}
                </h1>
                <p className="contact-header__description">
                    {t('header.description')}
                </p>
            </div>
        </section>
    );
};

export default ContactHeader;