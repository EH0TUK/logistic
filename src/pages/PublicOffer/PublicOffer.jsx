// PublicOffer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './PublicOffer.css';

const PublicOffer = () => {
  const { t } = useTranslation('offer');

  const sections = [
    {
      key: 'general',
      content: <p className='public-offer__section'>{t('sections.general.content')}</p>
    },
    {
      key: 'acceptance',
      content: (
        <>
          <div className="public-offer__section">
            <p>{t('sections.acceptance.content')}</p>
            <ul>
              {t('sections.acceptance.items', { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )
    },
    {
      key: 'deliveryTerms',
      content: (
        <>
          <div className="public-offer__section">
            <p>{t('sections.deliveryTerms.content')}</p>
            <ul>
              {t('sections.deliveryTerms.items', { returnObjects: true }).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </>
      )
    }
  ];

  return (
    <div className='public-offer'>
      <div className="public-offer__wrapper wrapper">
        <h1 className="public-offer__title title">{t('title')}</h1>

        {sections.map((section) => (
          <div className="public-offer__content text" key={section.key}>
            <h2 className="public-offer__subtitle subtitle">{t(`sections.${section.key}.title`)}</h2>
            {section.content}
          </div>
        ))}

        <div className="public-offer__section text">
          <p dangerouslySetInnerHTML={{ __html: t('sections.companyDetails') }} />
        </div>
      </div>
    </div>
  );
};

export default PublicOffer;