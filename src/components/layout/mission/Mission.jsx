import React from 'react';
import { useTranslation } from 'react-i18next';
import './Mission.css';
import missionImage from '../../../assets/train-1.jpg';

const Mission = () => {
    const { t } = useTranslation('about');

    return (
        <section className="mission" aria-labelledby="mission-title">
            <h2 id="mission-title" className="mission__title title">{t('mission.title')}</h2>
            <div className="mission__container">
                <div className="mission__image-wrapper">
                    <img
                        src={missionImage}
                        alt={t('mission.imageAlt')}
                        className="mission__image"
                        loading="lazy"
                    />
                </div>
                <div className="mission__content">
                    <p className="mission__text text">
                        {t('mission.text1')}
                    </p>
                    <p className="mission__text text">
                        {t('mission.text2')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Mission;