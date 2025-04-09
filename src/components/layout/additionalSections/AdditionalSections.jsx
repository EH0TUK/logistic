// AdditionalSections.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AdditionalSections.css';

const AdditionalSections = () => {
    const { t } = useTranslation('contact');
    const { requisites, faq } = t('additionalSections', { returnObjects: true });
    const [openFaqIndex, setOpenFaqIndex] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaqIndex(openFaqIndex === index ? null : index);
    };

    return (
        <section className="additional-sections">
            {/* Реквизиты */}
            <div className="additional-section">
                <h3 className="section-title title-card">{requisites.title}</h3>
                <ul className="requisites-list">
                    {requisites.items.map((item, index) => (
                        <li key={index} className="requisites-item">
                            <span className="requisites-label">{item.label}:</span>
                            <span className="requisites-value">{item.value}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* FAQ - переделанный вариант */}
            <div className="additional-section">
                <h3 className="section-title title-card">{faq.title}</h3>
                <ul className="faq-list">
                    {faq.items.map((item, index) => (
                        <li key={index} className="faq-item">
                            <button
                                className={`faq-question ${openFaqIndex === index ? 'faq-question--open' : ''}`}
                                onClick={() => toggleFaq(index)}
                                aria-expanded={openFaqIndex === index}
                                aria-controls={`faq-answer-${index}`}
                            >
                                {item.question}
                                <span
                                    className={`faq-arrow ${openFaqIndex === index ? 'faq-arrow--open' : ''}`}
                                    aria-hidden="true"
                                >
                                    ▼
                                </span>
                            </button>
                            <div
                                id={`faq-answer-${index}`}
                                className={`faq-answer ${openFaqIndex === index ? 'faq-answer--open' : ''}`}
                                aria-hidden={openFaqIndex !== index}
                            >
                                <p>{item.answer}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AdditionalSections;