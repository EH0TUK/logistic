import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './DeliveryCalculator.css';
import '../../common/Button/Button.css';

const TelegramConfig = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID,
};

const sanitizeText = (text) => {
    if (!text) return '';
    return String(text).replace(/[<>]/g, '');
};

const DeliveryCalculator = ({ fullForm = false }) => {
    const { t } = useTranslation('home');

    const getInitialFormData = useCallback(() => ({
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
    }), [fullForm]);

    const [formData, setFormData] = useState(getInitialFormData());
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('deliveryForm', JSON.stringify(formData));
        }, 500);

        return () => clearTimeout(timer);
    }, [formData]);

    useEffect(() => {
        const savedData = localStorage.getItem('deliveryForm');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const validateField = useCallback((name, value) => {
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
                    if (!/^\+[\d]{10,15}$/.test(cleanPhone)) {
                        error = t('calculator.errors.phoneInvalid');
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
            default:
                break;
        }
        return error;
    }, [t, formData.deliveryType]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        let processedValue = value || '';

        if (name === 'phone') {
            processedValue = value.replace(/[^\d+]/g, '').slice(0, 16);
            if (!processedValue.startsWith('+')) {
                processedValue = `+${processedValue.replace(/\D/g, '')}`;
            }
        }

        const error = validateField(name, processedValue);
        setErrors(prev => ({ ...prev, [name]: error }));
        setFormData(prev => ({ ...prev, [name]: processedValue }));
    }, [validateField]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        Object.keys(formData).forEach(name => {
            const error = validateField(name, formData[name]);
            if (error) newErrors[name] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, validateField]);

    const sendToTelegram = useCallback(async (data) => {
        if (!TelegramConfig.BOT_TOKEN || !TelegramConfig.CHAT_ID) {
            console.error('Telegram configuration is incomplete');
            return false;
        }

        try {
            const deliveryTypeMap = {
                'multimodal': t('calculator.deliveryTypes.multimodal'),
                'road': t('calculator.deliveryTypes.road'),
                'rail': t('calculator.deliveryTypes.rail'),
                'sea': t('calculator.deliveryTypes.sea')
            };

            let message = `New transportation request:\n` +
                `🚚 Delivery: ${deliveryTypeMap[data.deliveryType]}\n` +
                `📍 From: ${sanitizeText(data.origin)}\n` +
                `🏁 To: ${sanitizeText(data.destination)}\n` +
                `📦 Cargo: ${sanitizeText(data.type)}\n` +
                `⚖️ Weight: ${sanitizeText(data.weight)}\n` +
                `📏 Volume: ${sanitizeText(data.volume)}\n` +
                `👤 Name: ${sanitizeText(data.name)}\n` +
                `📱 Phone: ${sanitizeText(data.phone)}`;

            if (data.port) message += `\n🛳️ Port: ${sanitizeText(data.port)}`;
            if (fullForm) {
                message += `\n📦 Container: ${sanitizeText(data.containerType)}\n` +
                    `🛃 Customs: ${sanitizeText(data.customsClearance)}\n` +
                    `⏱ Time: ${sanitizeText(data.deliveryTime)}`;
            }

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(
                `https://api.telegram.org/bot${TelegramConfig.BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TelegramConfig.CHAT_ID,
                        text: message,
                        parse_mode: 'Markdown',
                    }),
                    signal: controller.signal
                }
            );

            clearTimeout(timeoutId);
            return response.ok;
        } catch (error) {
            console.error('Telegram API Error:', error);
            return false;
        }
    }, [t, fullForm]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        const success = await sendToTelegram(formData);

        if (success) {
            setFormData(getInitialFormData());
            localStorage.removeItem('deliveryForm');
        }

        setIsSubmitting(false);
    }, [formData, validateForm, sendToTelegram, getInitialFormData]);

    const renderField = useCallback((name, type = 'text') => (
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
                aria-invalid={!!errors[name]}
            />
            {errors[name] && (
                <span className="delivery-calculator__error active">
                    {errors[name]}
                </span>
            )}
        </div>
    ), [formData, errors, t, handleChange]);

    return (
        <div className="delivery-calculator wrapper" id="target-section">
            <div className="delivery-calculator__content full-width">
                <div className="delivery-calculator__wrapper">
                    <div className="delivery-calculator__title">
                        <h2>{t('calculator.title')}</h2>
                        <h2>{t('calculator.subtitle')}</h2>
                    </div>
                    <p className="delivery-calculator__description">
                        {t('calculator.description')}
                    </p>

                    <form onSubmit={handleSubmit} className="delivery-calculator__form">
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
                                    value={formData.deliveryType}
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

                        <div className="delivery-calculator__agree">
                            <button
                                className="button"
                                type="submit"
                                disabled={isSubmitting}
                                aria-label={isSubmitting ? t('calculator.sending') : t('calculator.button')}
                            >
                                <span className="button__text">
                                    {isSubmitting ? t('calculator.sending') : t('calculator.button')}
                                </span>
                            </button>
                            <span className="delivery-calculator__note">
                                {t('calculator.agreement')}
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

DeliveryCalculator.propTypes = {
    fullForm: PropTypes.bool
};

DeliveryCalculator.defaultProps = {
    fullForm: false
};

export default DeliveryCalculator;