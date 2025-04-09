// PrivacyPolicy.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation('privacy');

  const renderList = (items, isOrdered = false) => (
    isOrdered ? (
      <ol>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ol>
    ) : (
      <ul>
        {items.map((item, i) => <li key={i} className='section-content__item text'>{item}</li>)}
      </ul>
    )
  );

  const sections = [
    {
      key: 'dataCollection',
      content: (
        <>
          {renderList(t('sections.dataCollection.items', { returnObjects: true }))}
        </>
      )
    },
    {
      key: 'dataProcessing',
      content: (
        <>
          <p className='section-content__subtitle subtitle'>{t('sections.dataProcessing.content')}</p>
          {renderList(t('sections.dataProcessing.items', { returnObjects: true }))}
        </>
      )
    },
    {
      key: 'dataSharing',
      content: (
        <>
          <p className='section-content__subtitle subtitle'>{t('sections.dataSharing.partners')}</p>
          {renderList(t('sections.dataSharing.partnerItems', { returnObjects: true }))}
        </>
      )
    },
    {
      key: 'rights',
      content: (
        <>
          {renderList(t('sections.rights.items', { returnObjects: true }))}
          <p className="contact-info">{t('sections.rights.contact')}</p>
        </>
      )
    },
    {
      key: 'security',
      content: (
        <>
          {renderList(t('sections.security.measures', { returnObjects: true }))}
        </>
      )
    }
  ];

  return (
    <div className='privacy-policy'>
      <div className="wrapper">
        <header className="policy-header">
          <h1 className="title">{t('title')}</h1>
          <p className="intro-text text">{t('intro')}</p>
        </header>

        <div className="policy-content">
          {sections.map((section) => (
            <section className="policy-section" key={section.key}>
              <h2 className="subtitle">{t(`sections.${section.key}.title`)}</h2>
              <div className="section-content">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <footer className="policy-footer">
          <p className="update-info">{t('sections.updates')}</p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicy;