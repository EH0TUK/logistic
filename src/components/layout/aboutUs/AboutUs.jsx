import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import aboutUsImage from '../../../assets/train-1.jpg';

const AboutUs = () => {
    const { t } = useTranslation('about');

    return (
        <section className="about-us" aria-labelledby="about-title">
            <h1 id="about-title" className="about-us__title">{t('aboutUs.title')}</h1>
            <div className="about-us__container">
                <div className="about-us__content">
                    <p className="about-us__text">
                        {t('aboutUs.text1')}
                    </p>
                    <p className="about-us__text">
                        {t('aboutUs.text2')}
                    </p>
                </div>
                <div className="about-us__image-wrapper">
                    <img
                        src={aboutUsImage}
                        alt={t('aboutUs.imageAlt')}
                        className="about-us__image"
                        loading="lazy"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;