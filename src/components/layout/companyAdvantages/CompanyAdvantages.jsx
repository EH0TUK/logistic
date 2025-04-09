import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Circle from '../../common/Circle/Circle';
import Loader from '../../../assets/loader.jpg';
import './CompanyAdvantages.css';

const CompanyAdvantages = () => {
    const { t } = useTranslation('home');
    const advantagesSectionRef = useRef(null);

    useEffect(() => {
        const advantagesSection = advantagesSectionRef.current;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('company-advantages--visible');
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (advantagesSection) observer.observe(advantagesSection);
        return () => {
            if (advantagesSection) observer.unobserve(advantagesSection);
        };
    }, []);

    return (
        <div className="company-advantages" ref={advantagesSectionRef}>
            <div className="company-advantages__content">
                <div className="company-advantages__center-image" style={{ '--b': `url(${Loader}) center/cover` }}>
                    <div className="company-advantages__top-layer"></div>
                </div>

                {t('advantages.items', { returnObjects: true }).map((text, index) => (
                    <div
                        key={index}
                        className={`company-advantages__block company-advantages__block--${[
                            'top-left', 'top-right', 'bottom-left', 'bottom-right'
                        ][index]}`}
                    >
                        <div className="company-advantages__text text">
                            <p>{text}</p>
                        </div>
                    </div>
                ))}

                {[...Array(8)].map((_, i) => (
                    <Circle
                        key={i}
                        radius={[60, 50, 70, 45, 100, 45, 40, 60][i]}
                        showPlus={i % 2 === 1}
                        className={`company-advantages__circle company-advantages__circle--${i + 1}`}
                    />
                ))}
            </div>
            <svg style={{ visibility: 'hidden', position: 'absolute' }} width="0" height="0">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                    </filter>
                </defs>
            </svg>
        </div>
    );
};

export default CompanyAdvantages;