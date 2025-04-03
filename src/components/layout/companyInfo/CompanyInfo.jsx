import React, { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyInfo.css';

const CompanyInfo = () => {
    const { t } = useTranslation('home');
    const companyNameRef = useRef(null);
    const companyDescriptionRef = useRef(null);

    useEffect(() => {
        const companySection = document.querySelector('.company-info');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (companyNameRef.current) {
                            companyNameRef.current.style.opacity = '1';
                            companyNameRef.current.style.transform = 'translateY(0)';
                        }
                        setTimeout(() => {
                            if (companyDescriptionRef.current) {
                                companyDescriptionRef.current.style.opacity = '1';
                                companyDescriptionRef.current.style.transform = 'translateY(0)';
                            }
                        }, 500);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (companySection) observer.observe(companySection);
        return () => {
            if (companySection) observer.unobserve(companySection);
        };
    }, []);

    return (
        <div className="company-info">
            <div className="company-info__wrapper wrapper">
                <div className="company-info__content">
                    <div className="company-info__name" ref={companyNameRef}>
                        <h2 className="company-info__title">{t('companyInfo.title')}</h2>
                    </div>
                    <div className="company-info__description" ref={companyDescriptionRef}>
                        <p className="company-info__text">
                            {t('companyInfo.description')}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;