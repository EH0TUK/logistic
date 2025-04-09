import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import ContactsWindow from '../../common/ContactsWindow/ContactsWindow';
import TriangleIcon from '../../../assets/arrow-white.png';
import './DeliveryCalculator.css';
import '../../common/Button/Button.css';

const TelegramConfig = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID,
};

const DeliveryCalculator = ({ fullForm = false, showContacts = true }) => {
    const { t } = useTranslation('home');

    const getInitialFormData = () => ({
        origin: '',
        destination: '',
        deliveryType: 'multimodal',
        type: '',
        volume: '',
        weight: '',
        name: '',
        phone: '',
        port: '',
        ...(fullForm && {
            containerType: '',
            customsClearance: '',
            deliveryTime: ''
        })
    });

    const [formData, setFormData] = useState(getInitialFormData());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const savedData = localStorage.getItem('deliveryForm');
        if (isMounted && savedData) {
            setFormData(JSON.parse(savedData));
        }

        return () => {
            isMounted = false;
        };
    }, []);

    useEffect(() => {
        localStorage.setItem('deliveryForm', JSON.stringify(formData));
    }, [formData]);

    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'origin':
            case 'destination':
            case 'type':
            case 'name':
                if (!value.trim()) error = t('calculator.errors.required');
                break;
            case 'phone':
                if (!value.trim()) {
                    error = t('calculator.errors.phoneRequired');
                } else {
                    const cleanPhone = value.replace(/[^\d+]/g, '');
                    if (cleanPhone.replace(/\D/g, '').length < 9) {
                        error = t('calculator.errors.phoneShort');
                    }
                }
                break;
            case 'weight':
                if (!/^\d+кг?$/.test(value)) error = t('calculator.errors.weightFormat');
                break;
            case 'volume':
                if (!/^\d+ м3?$/.test(value)) error = t('calculator.errors.volumeFormat');
                break;
            case 'port':
                if (formData.deliveryType === 'sea' && !value.trim()) {
                    error = t('calculator.errors.portRequired');
                }
                break;
            case 'containerType':
            case 'customsClearance':
                if (fullForm && !value.trim()) error = t('calculator.errors.required');
                break;
            case 'deliveryTime':
                if (fullForm && !/^\d+-\d+ days$/.test(value)) error = t('calculator.errors.deliveryFormat');
                break;
            default:
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value || ''; // Защита от undefined/null
        if (name === 'phone') {
            processedValue = value.replace(/[^\d+]/g, '').slice(0, 16);
            if (!processedValue.startsWith('+')) {
                processedValue = `+${processedValue.replace(/\D/g, '')}`;
            }
        }

        const error = validateField(name, processedValue);
        setErrors({ ...errors, [name]: error });
        setFormData({ ...formData, [name]: processedValue });
    };

    const validateForm = () => {
        const newErrors = {};
        Object.keys(formData).forEach(name => {
            const error = validateField(name, formData[name]);
            if (error) newErrors[name] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendToTelegram = (data) => {
        return new Promise(async (resolve) => {
            try {
                const deliveryTypeMap = {
                    'multimodal': t('calculator.deliveryTypes.multimodal'),
                    'road': t('calculator.deliveryTypes.road'),
                    'rail': t('calculator.deliveryTypes.rail'),
                    'sea': t('calculator.deliveryTypes.sea'),
                    'air': t('calculator.deliveryTypes.air')
                };

                // Формируем сообщение
                let message = `New transportation calculation request:\n` +
                    `🚚 Delivery type: ${deliveryTypeMap[data.deliveryType]}\n` +
                    `📍 From: ${data.origin}\n` +
                    `🏁 To: ${data.destination}\n` +
                    `📦 Cargo: ${data.type}\n` +
                    `⚖️ Weight: ${data.weight}\n` +
                    `📏 Volume: ${data.volume}\n` +
                    `👤 Name: ${data.name}\n` +
                    `📱 Phone: ${data.phone}`;

                // Добавляем опциональные поля
                if (data.port) message += `\n🛳️ Port: ${data.port}`;
                if (fullForm) {
                    message += `\n📦 Container: ${data.containerType || 'N/A'}` +
                        `\n🛃 Customs: ${data.customsClearance || 'N/A'}` +
                        `\n⏱ Delivery Time: ${data.deliveryTime || 'N/A'}`;
                }

                // Проверяем наличие обязательных параметров
                if (!TelegramConfig.BOT_TOKEN || !TelegramConfig.CHAT_ID) {
                    throw new Error('Telegram configuration is incomplete');
                }

                // Отправляем запрос
                const response = await fetch(
                    `https://api.telegram.org/bot${TelegramConfig.BOT_TOKEN}/sendMessage`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: TelegramConfig.CHAT_ID,
                            text: message,
                            parse_mode: 'Markdown',
                        }),
                    }
                );

                // Обрабатываем ответ
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.description || 'Failed to send message');
                }

                const result = await response.json();
                resolve({ success: true, data: result });

            } catch (error) {
                console.error('Telegram API Error:', error);
                resolve({
                    success: false,
                    error: error.message || 'Unknown error occurred'
                });
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        const { success, error } = await sendToTelegram(formData);

        setSubmitStatus(success ? 'success' : 'error');
        setIsSubmitting(false);

        if (success) {
            setFormData(getInitialFormData());
            localStorage.removeItem('deliveryForm');
        } else {
            console.error('Failed to send:', error);
        }
    };

    const renderField = (name, type = 'text') => {
        return (
            <div className="delivery-calculator__field" key={name}>
                <label className="delivery-calculator__label">
                    {t(`calculator.fields.${name}`)}
                </label>
                <input
                    type={type}
                    name={name}
                    value={formData[name] || ''}
                    onChange={handleChange}
                    placeholder={t(`calculator.placeholders.${name}`)}
                    className={`delivery-calculator__input ${errors[name] ? 'invalid' : ''}`}
                />
                <span className={`delivery-calculator__error ${errors[name] ? 'active' : ''}`}>
                    {errors[name]}
                </span>
            </div>
        );
    };

    return (
        <div className="delivery-calculator wrapper" id="target-section">
            <div className={`delivery-calculator__content ${showContacts ? 'with-contacts' : 'full-width'}`}>
                <div className="delivery-calculator__wrapper">
                    <div className="delivery-calculator__title">
                        <h2>{t('calculator.title')}</h2>
                        <h2>{t('calculator.subtitle')}</h2>
                    </div>
                    <p className="delivery-calculator__description">
                        {t('calculator.description')}
                    </p>

                    {submitStatus && (
                        <div className={`delivery-calculator__${submitStatus}`}>
                            {t(`calculator.${submitStatus}`)}
                        </div>
                    )}

                    <form id="delivery-form" onSubmit={handleSubmit} className="delivery-calculator__form">
                        <div className="delivery-calculator__form-column">
                            {renderField('origin')}
                            {renderField('type')}
                            {renderField('weight')}
                            {renderField('phone')}

                            <div className="delivery-calculator__field">
                                <label className="delivery-calculator__label">
                                    {t('calculator.fields.deliveryType')}
                                </label>
                                <select
                                    name="deliveryType"
                                    value={formData.deliveryType || 'multimodal'}
                                    onChange={handleChange}
                                    className="delivery-calculator__input"
                                >
                                    {Object.entries(t('calculator.deliveryTypes', { returnObjects: true })).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                            </div>

                            {formData.deliveryType === 'sea' && renderField('port')}
                        </div>

                        <div className="delivery-calculator__form-column">
                            {renderField('destination')}
                            {renderField('volume')}
                            {renderField('name')}

                            {fullForm && (
                                <>
                                    {renderField('containerType')}
                                    {renderField('customsClearance')}
                                    {renderField('deliveryTime')}
                                </>
                            )}
                        </div>
                    </form>
                </div>

                {showContacts && (
                    <div className="contacts-container">
                        <ContactsWindow />
                    </div>
                )}
            </div>

            <div className="delivery-calculator__agree">
                <button
                    className="button"
                    type="submit"
                    form="delivery-form"
                    disabled={isSubmitting}
                >
                    <span className="button__text">
                        {isSubmitting ? t('calculator.sending') : t('calculator.button')}
                    </span>
                    <span className="button__icon">
                        <img src={TriangleIcon} alt="icon" className="button__icon-img" />
                    </span>
                </button>
                <span className="delivery-calculator__note">
                    {t('calculator.agreement')}
                </span>
            </div>
        </div>
    );
};

DeliveryCalculator.propTypes = {
    fullForm: PropTypes.bool,
    showContacts: PropTypes.bool
};

DeliveryCalculator.defaultProps = {
    fullForm: false,
    showContacts: true
};

export default DeliveryCalculator;