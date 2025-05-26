import React from 'react';
import { useTranslation } from 'react-i18next';
import './ContactInfo.css';

const ContactInfo = () => {
  const { t } = useTranslation('contact');
  const offices = t('offices.items', { returnObjects: true }) || [];
  const labels = t('labels', { returnObjects: true });

  const renderWorkingHours = (hours) => {
    if (typeof hours === 'string') {
      return <span>{hours}</span>;
    }
    return (
      <>
        <span>{hours.weekdays}</span>
        {hours.weekend && <span className="weekend-hours">, {hours.weekend}</span>}
      </>
    );
  };

  return (
    <section className="contact-info">
      <h2 className="contact-title title">{t('offices.title')}</h2>
      <div className="offices-grid">
        {offices.map((office, index) => (
          <div key={index} className="office-card">
            <h3 className="office-name subtitle">{office.name}</h3>

            {office.address && (
              <div className="contact-row">
                <span className="label">{labels.address}:</span>
                <span className="value">{office.address}</span>
              </div>
            )}

            <div className="contact-row">
              <span className="label">{labels.phone}:</span>
              <span className="value">{office.phone}</span>
            </div>

            <div className="contact-row">
              <span className="label">{labels.email}:</span>
              <span className="value">{office.email}</span>
            </div>

            {office.workingHours && (
              <div className="contact-row">
                <span className="label">{labels.workingHours}:</span>
                <span className="value">
                  {renderWorkingHours(office.workingHours)}
                </span>
              </div>
            )}

            {/* Новые поля: банк и УНП */}
            {office.bank && (
              <div className="contact-row">
                <span className="label">{labels.bank}:</span>
                <span className="value">{office.bank}</span>
              </div>
            )}

            {office.PIN && (
              <div className="contact-row">
                <span className="label">{labels.pin}:</span>
                <span className="value">{office.PIN}</span>
              </div>
            )}

            {office.description && (
              <p className="office-description">{office.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactInfo;