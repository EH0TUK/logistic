import React from 'react';
import { useTranslation } from 'react-i18next';
import './Values.css';
import reliabilityIcon from '../../../assets/reliability-icon-dark.png';
import professionalismIcon from '../../../assets/professionalism-icon-dark.png';
import customerFocusIcon from '../../../assets/customer-focus-icon-dark.png';
import responsibilityIcon from '../../../assets/responsibility-icon-dark.png';

const Values = () => {
    const { t } = useTranslation('about');

    const values = [
        { icon: reliabilityIcon, text: t('values.reliability') },
        { icon: professionalismIcon, text: t('values.professionalism') },
        { icon: customerFocusIcon, text: t('values.customerFocus') },
        { icon: responsibilityIcon, text: t('values.responsibility') }
    ];

    return (
        <section className="values" aria-labelledby="values-title">
            <div className="wrapper">
                <h2 id="values-title" className="values__title title">{t('values.title')}</h2>
                <ul className="values__list">
                    {values.map((value, index) => (
                        <li key={index} className="values__item">
                            <img
                                src={value.icon}
                                alt={value.text}
                                className="values__icon"
                                loading="lazy"
                            />
                            <span>{value.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default Values;