import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css';
import telegramIcon from '../../../assets/telegram.svg';
import whatsAppIcon from '../../../assets/whatsapp.svg';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__top-line"></div>
      <div className="footer__container wrapper">
        <div className="footer__column">
          <p>TRANS</p>
          <p>OFFER</p>
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
          {Array.isArray(t('footer.phones', { returnObjects: true })) &&
            t('footer.phones', { returnObjects: true }).map((phone, index) => (
              <a key={index} href={`tel:${phone.replace(/\D/g, '')}`} className="footer__phone">
                {phone}
              </a>
            ))
          }
        </div>
        <div className="footer__column">
          <a href={`mailto:${t('footer.email')}`} className="footer__email">
            {t('footer.email')}
          </a>
          <div className="footer__social-icons">
            <SocialIcons />
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>{t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

const SocialIcons = () => (
  <ul className="footer__social-list">
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
  <li className="footer__social-item">
    <a href={href} className="footer__social-link" target="_blank" rel="noopener noreferrer" aria-label={alt}>
      <div
        className="footer__social-icon footer__social-svg"
        style={{ '--svg-url': `url(${icon})` }}
      />
    </a>
  </li>
);

export default Footer;