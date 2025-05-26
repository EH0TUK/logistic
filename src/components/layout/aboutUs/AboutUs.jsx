import React from 'react';
import { useTranslation } from 'react-i18next';
import './AboutUs.css';
import aboutUsImage from '../../../assets/about.png';

const AboutUs = () => {
    const { t } = useTranslation('about');

    return (
        <section className="about-us" aria-labelledby="about-title">
            <div className="about-us__wrapper">
                <h1 id="about-title" className="about-us__title title">{t('aboutUs.title')}</h1>
                <div className="about-us__container">
                    <div className="about-us__content">
                        <div className="about-us__text-group">
                            <p className="about-us__text text">
                                {t('aboutUs.text1')}
                            </p>
                            <p className="about-us__text text">
                                {t('aboutUs.text2')}
                            </p>
                        </div>
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
            </div>
        </section>
    );
};

export default AboutUs;