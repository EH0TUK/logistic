import React from 'react';
import { useTranslation } from 'react-i18next';
import './Values.css';
import reliabilityIcon from '../../../assets/reliability-icon-dark.png';
import professionalismIcon from '../../../assets/professionalism-icon-dark.png';
import customerFocusIcon from '../../../assets/customer-focus-icon-dark.png';
import responsibilityIcon from '../../../assets/responsibility-icon-dark.png';

const Values = () => {
    const { t } = useTranslation('about');

    return (
        <section className="values" aria-labelledby="values-title">
            <h2 id="values-title" className="values__title">{t('values.title')}</h2>
            <ul className="values__list">
                <li className="values__item">
                    <img
                        src={reliabilityIcon}
                        alt={t('values.reliability')}
                        className="values__icon"
                        loading="lazy"
                    />
                    <span>{t('values.reliability')}</span>
                </li>
                <li className="values__item">
                    <img
                        src={professionalismIcon}
                        alt={t('values.professionalism')}
                        className="values__icon"
                        loading="lazy"
                    />
                    <span>{t('values.professionalism')}</span>
                </li>
                <li className="values__item">
                    <img
                        src={customerFocusIcon}
                        alt={t('values.customerFocus')}
                        className="values__icon"
                        loading="lazy"
                    />
                    <span>{t('values.customerFocus')}</span>
                </li>
                <li className="values__item">
                    <img
                        src={responsibilityIcon}
                        alt={t('values.responsibility')}
                        className="values__icon"
                        loading="lazy"
                    />
                    <span>{t('values.responsibility')}</span>
                </li>
            </ul>
        </section>
    );
};

export default Values;