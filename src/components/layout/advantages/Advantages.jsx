import React, { useState } from 'react';
import './Advantages.css';
import { useTranslation } from 'react-i18next';

const Advantages = () => {
    const { t, ready } = useTranslation('about');
    const [openIndex, setOpenIndex] = useState(null);

    if (!ready) return <div className="loading">{t('common:loading')}</div>;

    const advantagesData = t('advantages.items', { returnObjects: true });
    const advantageKeys = Object.keys(advantagesData);

    const toggleDescription = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section className="advantages" aria-labelledby="advantages-title">
            <h2 id="advantages-title" className="advantages__title title">{t('advantages.title')}</h2>
            <ul className="advantages__list">
                {advantageKeys.map((key, index) => (
                    <li key={key} className="advantages__item">
                        <button
                            className={`advantages__item-header ${openIndex === index ? 'advantages__item-header--open' : ''}`}
                            onClick={() => toggleDescription(index)}
                            aria-expanded={openIndex === index}
                            aria-controls={`advantage-${index}`}
                        >
                            <span className="advantages__item-title subtitle">
                                {advantagesData[key].title}
                            </span>
                            <span
                                className={`advantages__item-arrow ${openIndex === index ? 'advantages__item-arrow--open' : ''}`}
                                aria-hidden="true"
                            >
                                ▼
                            </span>
                        </button>
                        <div
                            id={`advantage-${index}`}
                            className={`advantages__item-description text ${openIndex === index ? 'advantages__item-description--open' : ''}`}
                            aria-hidden={openIndex !== index}
                        >
                            <p>{advantagesData[key].description}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default Advantages;