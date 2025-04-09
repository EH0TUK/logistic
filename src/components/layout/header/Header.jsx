import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';
import telegramIcon from '../../../assets/telegram.svg';
import whatsAppIcon from '../../../assets/whatsapp.svg';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(isHomePage ? false : true);

  useEffect(() => {
    const handleScroll = () => {
      if (isHomePage) {
        setIsScrolled(window.scrollY > 50);
      }
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header className={`header ${isHomePage ? 'home-page' : ''} ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="header__container wrapper">
        <Link to="/" className="header__logo">
          <p>TRANS</p>
          <p>OFFER</p>
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
            <LanguageSwitcher />
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
  <li className="header__social-item">
    <a href={href} className="header__social-link" target="_blank" rel="noopener noreferrer" aria-label={alt}>
      <div
        className="header__social-icon header__social-svg"
        style={{ '--svg-url': `url(${icon})` }}
      />
    </a>
  </li>
);

export default Header;