import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../../common/Button/Button';
import './Hero.css';
import InfoBlocks from '../infoBlocks/InfoBlocks';

const Hero = () => {
    const { t } = useTranslation('home');
    const textBlock1Ref = useRef(null);
    const textBlock2Ref = useRef(null);
    const buttonRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            if (textBlock1Ref.current) {
                textBlock1Ref.current.style.opacity = '1';
                textBlock1Ref.current.style.transform = 'translateY(0)';
            }
        }, 200);

        setTimeout(() => {
            if (textBlock2Ref.current) {
                textBlock2Ref.current.style.opacity = '1';
                textBlock2Ref.current.style.transform = 'translateY(0)';
            }
        }, 400);

        setTimeout(() => {
            if (buttonRef.current) {
                buttonRef.current.style.opacity = '1';
                buttonRef.current.style.transform = 'translateY(0)';
            }
        }, 600);
    }, []);

    return (
        <div className="hero">
            <div className="hero__content">
                <div className="hero__wrapper wrapper">
                    <div className="hero__center-content">
                        <div className="hero__text-block" ref={textBlock1Ref}>
                            <h1 className="hero__title">{t('hero.title')}</h1>
                        </div>
                        <div className="hero__text-block" ref={textBlock2Ref}>
                            <p className="hero__description">{t('hero.description')}</p>
                        </div>
                        <div className="hero__button-container" ref={buttonRef}>
                            <Button text={t('hero.button')} targetId="target-section" />
                        </div>
                    </div>
                </div>
            </div>
            <InfoBlocks />
        </div>
    );
};

export default Hero;