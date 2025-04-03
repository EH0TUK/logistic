import React, { useState } from 'react';
import './WhyChooseUs.css';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
    const { t, ready } = useTranslation('about');
    const [openIndex, setOpenIndex] = useState(null);

    if (!ready) return <div className="loading">{t('common:loading')}</div>;

    const whyChooseUsData = t('whyChooseUs.items', { returnObjects: true });
    const itemKeys = Object.keys(whyChooseUsData);

    const toggleDescription = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="why-choose-us" aria-labelledby="why-choose-us-title">
            <h2 id="why-choose-us-title" className="why-choose-us__title">{t('whyChooseUs.title')}</h2>
            <ul className="why-choose-us__list">
                {itemKeys.map((key, index) => (
                    <li key={key} className="why-choose-us__item">
                        <button
                            className={`why-choose-us__item-header ${openIndex === index ? 'why-choose-us__item-header--open' : ''}`}
                            onClick={() => toggleDescription(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`why-choose-us-${index}`}
                        >
                            <span className="why-choose-us__item-title">
                                {whyChooseUsData[key].title}
                            </span>
                            <span
                                className={`why-choose-us__item-arrow ${openIndex === index ? 'why-choose-us__item-arrow--open' : ''}`}
                                aria-hidden="true"
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            id={`why-choose-us-${index}`}
                            className={`why-choose-us__item-description ${openIndex === index ? 'why-choose-us__item-description--open' : ''}`}
                            aria-hidden={openIndex !== index}
                        >
                            <p>{whyChooseUsData[key].description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default WhyChooseUs;