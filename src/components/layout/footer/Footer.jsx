import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import whatsappIconWhite from '../../../assets/whatsapp-icon-white.png';
import whatsappIconColor from '../../../assets/whatsapp-icon-beige.png';
import viberIconWhite from '../../../assets/viber-icon-white.png';
import viberIconColor from '../../../assets/viber-icon-beige.png';
import telegramIconWhite from '../../../assets/telegram-icon-white.png';
import telegramIconColor from '../../../assets/telegram-icon-beige.png';

const Footer = () => {
  const { t } = useTranslation();
  const [icons, setIcons] = useState({
    whatsapp: whatsappIconWhite,
    viber: viberIconWhite,
    telegram: telegramIconWhite
  });

  const handleIconHover = (iconName, hoverIcon) => {
    setIcons(prev => ({ ...prev, [iconName]: hoverIcon }));
  };

  return (
    <footer className="footer">
      <div className="footer__top-line"></div>
      <div className="footer__container wrapper">
        <div className="footer__column">
          <h3 className="footer__company-name">{t('footer.companyName')}</h3>
        </div>
        <div className="footer__column">
          <nav className="footer__nav">
            <ul className="footer__nav-list">
              <li className="footer__nav-item">
                <a href="/privacy-policy">{t('footer.links.privacy')}</a>
              </li>
              <li className="footer__nav-item">
                <a href="/public-offer">{t('footer.links.offer')}</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer__column">
          {t('footer.phones', { returnObjects: true }).map((phone, index) => (
            <a key={index} href={`tel:${phone.replace(/\D/g, '')}`} className="footer__phone">
              {phone}
            </a>
          ))}
        </div>
        <div className="footer__column">
          <a href={`mailto:${t('footer.email')}`} className="footer__email">
            {t('footer.email')}
          </a>
          <div className="footer__social-icons">
            <SocialLink
              href="https://wa.me/380123456789"
              icon={icons.whatsapp}
              onHover={() => handleIconHover('whatsapp', whatsappIconColor)}
              onLeave={() => handleIconHover('whatsapp', whatsappIconWhite)}
              alt="WhatsApp"
            />
            <SocialLink
              href="viber://chat?number=+380123456789"
              icon={icons.viber}
              onHover={() => handleIconHover('viber', viberIconColor)}
              onLeave={() => handleIconHover('viber', viberIconWhite)}
              alt="Viber"
            />
            <SocialLink
              href="https://web.telegram.org"
              icon={icons.telegram}
              onHover={() => handleIconHover('telegram', telegramIconColor)}
              onLeave={() => handleIconHover('telegram', telegramIconWhite)}
              alt="Telegram"
            />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, onHover, onLeave, alt }) => (
  <a
    href={href}
    className="footer__social-link"
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <img src={icon} alt={alt} className="footer__social-icon" />
  </a>
);

export default Footer;