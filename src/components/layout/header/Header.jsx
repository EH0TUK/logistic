import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../../common/LanguageSwitcher/LanguageSwitcher';
import telegramIcon from '../../../assets/telegram.svg';
import whatsAppIcon from '../../../assets/whatsapp.svg';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();

  // Состояния
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHomePage = location.pathname === '/';
  const [isScrolled, setIsScrolled] = useState(!isHomePage);

  // 1. Эффект для закрытия меню при смене роута
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // 2. Эффект для блокировки скролла при открытом меню
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // 3. Оптимизированный обработчик скролла
  const handleScroll = useCallback(() => {
    if (isHomePage) {
      setIsScrolled(window.scrollY > 50);
    }
  }, [isHomePage]);

  // 4. Эффект для подписки на скролл с троттлингом
  useEffect(() => {
    if (!isHomePage) return;

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [isHomePage, handleScroll]);

  // Мемоизированные классы для header
  const headerClasses = useMemo(() => [
    'header',
    isHomePage && 'home-page',
    isScrolled && 'header--scrolled',
    isMenuOpen && 'header--menu-open'
  ].filter(Boolean).join(' '), [isHomePage, isScrolled, isMenuOpen]);

  return (
    <header className={headerClasses}>
      <div className="header__container wrapper">
        <Link to="/" className="header__logo">
          <p>TRANS</p>
          <p>OFFER</p>
        </Link>

        <button
          className={`header__burger ${isMenuOpen ? 'header__burger--active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={t('header.burgerLabel')}
        >
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
          <span className="header__burger-line"></span>
        </button>

        <nav className={`header__nav ${isMenuOpen ? 'header__nav--active' : ''}`}>
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <Link to="/about" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('header.menu.about')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/request" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>
                {t('header.menu.request')}
              </Link>
            </li>
            <li className="header__nav-item">
              <Link to="/contact" className="header__nav-link" onClick={() => setIsMenuOpen(false)}>
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

// Оптимизированные подкомпоненты
const SocialIcons = React.memo(() => (
  <ul className="header__social-list">
    <SocialIcon href="https://t.me/yourlink" icon={telegramIcon} alt="Telegram" />
    <SocialIcon href="https://wa.me/1234567890" icon={whatsAppIcon} alt="WhatsApp" />
  </ul>
));

const SocialIcon = React.memo(({ href, icon, alt }) => (
  <li className="header__social-item">
    <a href={href} className="header__social-link" target="_blank" rel="noopener noreferrer" aria-label={alt}>
      <div className="header__social-svg" style={{ '--svg-url': `url(${icon})` }} />
    </a>
  </li>
));

export default React.memo(Header);