import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './ContactsWindow.css';
import telegramIcon from '../../../assets/telegram.svg';
import whatsAppIcon from '../../../assets/whatsapp.svg';

const ContactsWindow = () => {
    const { t } = useTranslation('common');
    const [isVisible, setIsVisible] = useState(false);
    const contactsRef = useRef(null);

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

    return (
        <div ref={contactsRef} className={`contacts-window ${isVisible ? 'visible' : ''}`}>
            <div className="contacts-window__contacts-title">
                <div className="contacts-window__line"></div>
                <h2 className="contacts-window__title title">{t('contacts.title')}</h2>
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
                <SocialIcons />
            </div>
        </div>
    );
};

const SocialIcons = () => (
    <ul className="contacts__social-list">
      <SocialIcon
        href="https://t.me/yourlink"
        icon={telegramIcon}
        alt="Telegram"
      />
      <SocialIcon
        href="https://wa.me/1234567890"
        icon={whatsAppIcon}
        alt="WhatsApp"
      />
    </ul>
  );
  
  const SocialIcon = ({ href, icon, alt }) => (
    <li className="contacts__social-item">
      <a href={href} className="contacts__social-link" target="_blank" rel="noopener noreferrer" aria-label={alt}>
        <div
          className="contacts__social-icon contacts__social-svg"
          style={{ '--svg-url': `url(${icon})` }}
        />
      </a>
    </li>
  );

export default ContactsWindow;