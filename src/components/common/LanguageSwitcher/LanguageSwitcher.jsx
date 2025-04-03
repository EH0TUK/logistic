import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Новый файл стилей

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('i18nextLng', lng);
    };

    return (
        <div className="language-switcher">
            <button
                className={`language-switcher__btn ${i18n.language === 'ru' ? 'language-switcher__btn--active' : ''}`}
                onClick={() => changeLanguage('ru')}
                aria-label="Russian language"
            >
                RU
            </button>
            <span className="language-switcher__divider">|</span>
            <button
                className={`language-switcher__btn ${i18n.language === 'en' ? 'language-switcher__btn--active' : ''}`}
                onClick={() => changeLanguage('en')}
                aria-label="English language"
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;