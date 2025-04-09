// PublicOffer.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './PublicOffer.css';

const PublicOffer = () => {
  const { t } = useTranslation('offer');

  const sections = [
    {
      key: 'general',
      content: <p>{t('sections.general.content')}</p>
    },
    {
      key: 'acceptance',
      content: (
        <>
          <p>{t('sections.acceptance.content')}</p>
          <ul>
            {t('sections.acceptance.items', { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )
    },
    {
      key: 'deliveryTerms',
      content: (
        <>
          <p>{t('sections.deliveryTerms.content')}</p>
          <ul>
            {t('sections.deliveryTerms.items', { returnObjects: true }).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )
    }
  ];

  return (
    <div className='public-offer'>
      <div className="wrapper">
        <h1 className="title">{t('title')}</h1>

        {sections.map((section) => (
          <div className="text" key={section.key}>
            <h2 className="subtitle">{t(`sections.${section.key}.title`)}</h2>
            {section.content}
          </div>
        ))}

        <div className="text">
          <p dangerouslySetInnerHTML={{ __html: t('sections.companyDetails') }} />
        </div>
      </div>
    </div>
  );
};

export default PublicOffer;