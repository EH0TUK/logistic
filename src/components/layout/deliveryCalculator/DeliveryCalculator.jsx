import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ContactsWindow from '../../common/ContactsWindow/ContactsWindow';
import TriangleIcon from '../../../assets/arrow-white.png';
import './DeliveryCalculator.css';
import '../../common/Button/Button.css';

const TelegramConfig = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID,
};

const DeliveryCalculator = () => {
    const { t } = useTranslation('home');
    const initialFormData = {
        origin: '',
        destination: '',
        deliveryType: 'multimodal',
        type: '',
        volume: '',
        weight: '',
        name: '',
        phone: '',
        port: '',
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('deliveryForm');
        if (savedData) setFormData(JSON.parse(savedData));
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
            default:
                error = ''; // Явное возвращение пустой строки для необрабатываемых полей
                break;
        }
        return error;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;

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
        Object.entries(formData).forEach(([name, value]) => {
            const error = validateField(name, value);
            if (error) newErrors[name] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const sendToTelegram = async (data) => {
        try {
            const deliveryTypeMap = {
                'multimodal': t('calculator.deliveryTypes.multimodal'),
                'road': t('calculator.deliveryTypes.road'),
                'rail': t('calculator.deliveryTypes.rail'),
                'sea': t('calculator.deliveryTypes.sea'),
                'air': t('calculator.deliveryTypes.air')
            };

            const message = `New transportation calculation request:
🚚 Delivery type: ${deliveryTypeMap[data.deliveryType]}
📍 From: ${data.origin}
🏁 To: ${data.destination}
📦 Cargo: ${data.type}
⚖️ Weight: ${data.weight}
📏 Volume: ${data.volume}
👤 Name: ${data.name}
📱 Phone: ${data.phone}
${data.port ? `🛳️ Port: ${data.port}` : ''}`;

            const response = await fetch(
                `https://api.telegram.org/bot${TelegramConfig.BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TelegramConfig.CHAT_ID,
                        text: message,
                    }),
                }
            );

            if (!response.ok) throw new Error('Send error');
            return true;
        } catch (error) {
            console.error('Error:', error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        const success = await sendToTelegram(formData);
        setSubmitStatus(success ? 'success' : 'error');
        setIsSubmitting(false);

        if (success) {
            setFormData(initialFormData);
            localStorage.removeItem('deliveryForm');
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
                    value={formData[name]}
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
        <div className="delivery-calculator">
            <div className="wrapper">
                <div className="delivery-calculator__content">
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
                            </div>

                            <div className="delivery-calculator__form-column">
                                {renderField('destination')}
                                {renderField('volume')}
                                {renderField('name')}

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
                        </form>
                    </div>
                    <ContactsWindow />


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
        </div>
    );
};

export default DeliveryCalculator;