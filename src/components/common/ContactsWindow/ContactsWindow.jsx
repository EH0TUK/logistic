import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ContactsWindow.css';
import whatsappIconWhite from '../../../assets/whatsapp-icon-white.png';
import whatsappIconColor from '../../../assets/whatsapp-icon-beige.png';
import viberIconWhite from '../../../assets/viber-icon-white.png';
import viberIconColor from '../../../assets/viber-icon-beige.png';
import telegramIconWhite from '../../../assets/telegram-icon-white.png';
import telegramIconColor from '../../../assets/telegram-icon-beige.png';

const ContactsWindow = () => {
    const { t } = useTranslation('common'); // Указание namespace для переводов
    const [isVisible, setIsVisible] = useState(false);
    const contactsRef = useRef(null);
    const [icons, setIcons] = useState({
        whatsapp: whatsappIconWhite,
        viber: viberIconWhite,
        telegram: telegramIconWhite
    });

    useEffect(() => {
        const formBlock = document.querySelector('.delivery-calculator');
        if (!formBlock) return; // Убрано console.error для production

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible(entry.isIntersecting);
                });
            },
            { threshold: 0.1 }
        );

        observer.observe(formBlock);
        return () => observer.unobserve(formBlock);
    }, []);

    const handleIconHover = (iconName, hoverIcon) => {
        setIcons(prev => ({ ...prev, [iconName]: hoverIcon }));
    };

    return (
        <div ref={contactsRef} className={`contacts-window ${isVisible ? 'visible' : ''}`}>
            <div className="contacts-window__header">
                <div className="contacts-window__line"></div>
                <h2 className="contacts-window__title">{t('contacts.title')}</h2>
            </div>

            <h3 className="contacts-window__subtitle">{t('contacts.phonesTitle')}</h3>
            <div className="contacts-window__contacts">
                {t('contacts.phones', { returnObjects: true })?.map((phone, index) => (
                    <a key={index} href={`tel:${phone.replace(/\D/g, '')}`} className="contacts-window__info">
                        {phone}
                    </a>
                ))}
            </div>

            <h3 className="contacts-window__subtitle">{t('contacts.emailTitle')}</h3>
            <a href={`mailto:${t('contacts.email')}`} className="contacts-window__email">
                {t('contacts.email')}
            </a>

            <h3 className="contacts-window__subtitle">{t('contacts.socialsTitle')}</h3>
            <div className="contacts-window__socials">
                <SocialLink
                    href="https://wa.me/" // Корректная ссылка WhatsApp
                    icon={icons.whatsapp}
                    onHover={() => handleIconHover('whatsapp', whatsappIconColor)}
                    onLeave={() => handleIconHover('whatsapp', whatsappIconWhite)}
                    alt="WhatsApp"
                />
                <SocialLink
                    href="viber://chat" // Корректная ссылка Viber
                    icon={icons.viber}
                    onHover={() => handleIconHover('viber', viberIconColor)}
                    onLeave={() => handleIconHover('viber', viberIconWhite)}
                    alt="Viber"
                />
                <SocialLink
                    href="https://t.me/" // Корректная ссылка Telegram
                    icon={icons.telegram}
                    onHover={() => handleIconHover('telegram', telegramIconColor)}
                    onLeave={() => handleIconHover('telegram', telegramIconWhite)}
                    alt="Telegram"
                />
            </div>
        </div>
    );
};

const SocialLink = ({ href, icon, onHover, onLeave, alt }) => (
    <a
        href={href}
        className="contacts-window__social-link"
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        target="_blank"
        rel="noopener noreferrer"
    >
        <img src={icon} alt={alt} className="contacts-window__social-icon" />
    </a>
);

export default ContactsWindow;