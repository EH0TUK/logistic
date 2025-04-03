import React from 'react';
import { useTranslation } from 'react-i18next';
import './AdditionalSections.css';

const AdditionalSections = () => {
    const { t } = useTranslation('contact');
    const { socials, requisites, faq } = t('additionalSections', { returnObjects: true });

    return (
        <section className="additional-sections">
            {/* Соцсети */}
            <div className="additional-section">
                <h3 className="section-title">{socials.title}</h3>
                <div className="social-icons">
                    {socials.items.map((item, index) => (
                        <a
                            key={index}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-link"
                            aria-label={item.name}
                        >
                            <img
                                src={`/icons/${item.icon}-light.svg`}
                                alt={item.name}
                                className="social-icon"
                                onMouseOver={(e) => e.currentTarget.src = `/icons/${item.icon}-dark.svg`}
                                onMouseOut={(e) => e.currentTarget.src = `/icons/${item.icon}-light.svg`}
                            />
                        </a>
                    ))}
                </div>
            </div>

            {/* Реквизиты */}
            <div className="additional-section">
                <h3 className="section-title">{requisites.title}</h3>
                <ul className="requisites-list">
                    {requisites.items.map((item, index) => (
                        <li key={index} className="requisites-item">
                            <span className="requisites-label">{item.label}:</span>
                            <span className="requisites-value">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FAQ */}
            <div className="additional-section">
                <h3 className="section-title">{faq.title}</h3>
                <div className="faq-list">
                    {faq.items.map((item, index) => (
                        <details key={index} className="faq-item">
                            <summary className="faq-question">{item.question}</summary>
                            <p className="faq-answer">{item.answer}</p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AdditionalSections;