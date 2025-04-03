import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';
import telegramIconWhite from '../../../assets/telegram-icon-white.png';
import viberIconWhite from '../../../assets/viber-icon-white.png';
import whatsappIconWhite from '../../../assets/whatsapp-icon-white.png';
import telegramIconHover from '../../../assets/telegram-icon-beige.png';
import viberIconHover from '../../../assets/viber-icon-beige.png';
import whatsappIconHover from '../../../assets/whatsapp-icon-beige.png';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container wrapper">
        <Link to="/" className="header__logo">
          {t('header.companyName')}
        </Link>

        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
          onClick={toggleMenu}
          aria-label={t('header.burgerLabel')}
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--active' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/about" className="header__nav-link" onClick={toggleMenu}>
                {t('header.menu.about')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/request" className="header__nav-link" onClick={toggleMenu}>
                {t('header.menu.request')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact" className="header__nav-link" onClick={toggleMenu}>
                {t('header.menu.contact')}
              </Link>
            </li>
          </ul>

          <div className="header__contacts header__contacts--mobile">
            <a href={`tel:${t('header.phone').replace(/\D/g, '')}`} className="header__phone">
              {t('header.phone')}
            </a>
            <SocialIcons />
          </div>
        </nav>

        <div className="header__contacts header__contacts--desktop">
          <a href={`tel:${t('header.phone').replace(/\D/g, '')}`} className="header__phone">
            {t('header.phone')}
          </a>
          <SocialIcons />
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

const SocialIcons = () => (
  <ul className="header__social-list">
    <SocialIcon
      href="https://t.me/yourlink"
      whiteIcon={telegramIconWhite}
      hoverIcon={telegramIconHover}
      alt="Telegram"
    />
    <SocialIcon
      href="viber://chat?number=+1234567890"
      whiteIcon={viberIconWhite}
      hoverIcon={viberIconHover}
      alt="Viber"
    />
    <SocialIcon
      href="https://wa.me/1234567890"
      whiteIcon={whatsappIconWhite}
      hoverIcon={whatsappIconHover}
      alt="WhatsApp"
    />
  </ul>
);

const SocialIcon = ({ href, whiteIcon, hoverIcon, alt }) => (
  <li className="header__social-item">
    <a href={href} className="header__social-link" target="_blank" rel="noopener noreferrer" aria-label={alt}>
      <img
        src={whiteIcon}
        alt={alt}
        className="header__social-icon"
        onMouseOver={(e) => (e.currentTarget.src = hoverIcon)}
        onMouseOut={(e) => (e.currentTarget.src = whiteIcon)}
      />
    </a>
  </li>
);

export default Header;