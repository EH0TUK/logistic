import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './DeliveryCalculator.css';
import '../../common/Button/Button.css';

const TelegramConfig = {
    BOT_TOKEN: process.env.REACT_APP_TELEGRAM_BOT_TOKEN,
    CHAT_ID: process.env.REACT_APP_TELEGRAM_CHAT_ID,
};

const sanitizeText = (text) => text ? String(text).replace(/[<>]/g, '') : '';

const DeliveryCalculator = () => {
    const { t } = useTranslation('home');

    const initialFormData = useMemo(() => ({
        origin: '',
        destination: '',
        cargoName: '',
        cargoCode: '',
        batchWeight: '',
        vehicleType: 'unknown',
        name: '',
        phone: '',
        email: '',
        contactPreference: '',
        deliveryType: 'rail',
        notes: '',
        port: ''
    }), []);


    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.setItem('deliveryForm', JSON.stringify(formData));
        }, 500);
        return () => clearTimeout(timer);
    }, [formData]);

    useEffect(() => {
        const savedData = localStorage.getItem('deliveryForm');
        if (savedData) setFormData(JSON.parse(savedData));
    }, []);

    const validateField = useCallback((name, value) => {
        let error = '';
        const trimmedValue = value ? value.toString().trim() : ''; // Добавлена безопасная обработка

        switch (name) {
            case 'origin':
            case 'destination':
            case 'cargoName':
            case 'cargoCode':
            case 'name':
            case 'deliveryType':
                if (!trimmedValue) error = t('calculator.errors.required');
                break;
            case 'contactPreference':
                if (!value) error = t('calculator.errors.required');
                break;
            case 'batchWeight':
                if (!/^\d*\.?\d+$/.test(trimmedValue)) error = t('calculator.errors.weightFormat');
                break;
            case 'phone':
                if (value && !/^\+[\d]{10,15}$/.test(value)) error = t('calculator.errors.phoneInvalid');
                break;
            case 'email':
                if (value && !/^\S+@\S+\.\S+$/.test(value)) error = t('calculator.errors.emailInvalid');
                break;
            case 'port':
                if (formData.deliveryType === 'sea' && !value.trim()) error = t('calculator.errors.portRequired');
                break;
            case 'vehicleType':
                break;
            default:
                break;
        }
        return error ? 'required' : '';
    }, [t, formData.deliveryType]);

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        let processedValue = value;

        if (name === 'phone') {
            processedValue = value.replace(/[^\d+]/g, '').slice(0, 16);
            if (!processedValue.startsWith('+')) {
                processedValue = `+${processedValue.replace(/\D/g, '')}`;
            }
        }

        setFormData(prev => {
            const newData = { ...prev, [name]: processedValue };
            // Отложенная валидация
            setTimeout(() => {
                const error = validateField(name, processedValue);
                setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
            }, 300);
            return newData;
        });
    }, [validateField]);

    const validateForm = useCallback(() => {
        const newErrors = {};
        let isValid = true;

        const requiredFields = [
            'origin', 'destination', 'cargoName',
            'batchWeight', 'name', 'deliveryType', 'contactPreference'
        ];

        requiredFields.forEach(field => {
            const error = validateField(field, formData[field]);
            if (error) {
                newErrors[field] = error;
                isValid = false;
            }
        });

        if (!formData.phone && !formData.email) {
            newErrors.contact = t('calculator.errors.contactRequired');
            isValid = false;
        }

        if (formData.deliveryType === 'sea') {
            const portError = validateField('port', formData.port);
            if (portError) {
                newErrors.port = portError;
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    }, [formData, t, validateField]);

    const sendToTelegram = useCallback(async (data) => {
        if (!TelegramConfig.BOT_TOKEN || !TelegramConfig.CHAT_ID) {
            console.error('Telegram configuration is incomplete');
            return false;
        }

        try {
            const deliveryTypeMap = {
                'rail': t('calculator.deliveryTypes.rail'),
                'multimodal': t('calculator.deliveryTypes.multimodal'),
                'road': t('calculator.deliveryTypes.road'),
                'sea': t('calculator.deliveryTypes.sea')
            };

            const vehicleTypeMap = {
                '20ft': t('calculator.vehicleTypes.20ft'),
                '40ft': t('calculator.vehicleTypes.40ft'),
                'covered': t('calculator.vehicleTypes.covered'),
                'platform': t('calculator.vehicleTypes.platform'),
                'halfwagon': t('calculator.vehicleTypes.halfwagon'),
                'special': t('calculator.vehicleTypes.special')
            };

            let message = `📦 Новая заявка:\n\n` +
                `🚂 Тип перевозки: ${deliveryTypeMap[data.deliveryType]}\n` +
                `📍 Точка отправки: ${sanitizeText(data.origin)}\n` +
                `🏁 Точка назначения: ${sanitizeText(data.destination)}\n` +
                `📋 Наименование груза: ${sanitizeText(data.cargoName)}\n` +
                `🔢 Код груза: ${sanitizeText(data.cargoCode)}\n` +
                `⚖️ Вес партии: ${sanitizeText(data.batchWeight)} тонн\n` +
                `🚚 Тип подвижного состава: ${data.vehicleType === 'unknown' ? 'Не знаю' : vehicleTypeMap[data.vehicleType]}\n\n` +
                `👤 Имя заказчика: ${sanitizeText(data.name)}\n` +
                `📱 Телефон: ${sanitizeText(data.phone)}\n` +
                `💬 Способ связи: ${sanitizeText(data.contactPreference)}\n` +
                `📧 Почта: ${sanitizeText(data.email)}\n\n` +
                `📝 Примечания: ${sanitizeText(data.notes)}`;

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
    }, [t]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        const success = await sendToTelegram(formData);

        if (success) {
            setFormData(initialFormData);
            localStorage.removeItem('deliveryForm');
            setSubmitStatus('success');
        } else {
            setSubmitStatus('error');
        }
        setIsSubmitting(false);
    }, [formData, validateForm, sendToTelegram, initialFormData]);

    const renderField = (name, type = 'text', options = {}) => {
        const inputProps = {
            name,
            value: formData[name] || '',
            onChange: handleChange,
            className: `delivery-calculator__input ${errors[name] ? 'invalid' : ''}`,
            placeholder: t(`calculator.placeholders.${name}`),
            'aria-invalid': !!errors[name]
        };

        if (type === 'number') {
            Object.assign(inputProps, {
                type: 'text',
                inputMode: 'numeric',
                pattern: '[0-9]*',
                style: {
                    appearance: 'textfield',
                    MozAppearance: 'textfield',
                    WebkitAppearance: 'none',
                }
            });
        }

        return (
            <div className={`delivery-calculator__field ${options.className || ''}`}>
                <label className="delivery-calculator__label">
                    {t(`calculator.fields.${name}`)}
                </label>
                <input
                    type={type}
                    {...inputProps}
                />
                {errors[name] && (
                    <span className="delivery-calculator__error active">
                        {t(`calculator.errors.${errors[name]}`)}
                    </span>
                )}
            </div>
        );
    };

    const renderSelect = (name, options) => (
        <div className="delivery-calculator__field">
            <label className="delivery-calculator__label">
                {t(`calculator.fields.${name}`)}
            </label>
            <select
                name={name}
                value={formData[name] || ''}
                onChange={handleChange}
                className={`delivery-calculator__input ${errors[name] ? 'invalid' : ''}`}
                aria-invalid={!!errors[name]}
            >
                <option value="">{t('calculator.selectDefault')}</option>
                {options.map(([key, value]) => (
                    <option key={key} value={key}>{value}</option>
                ))}
            </select>
            {errors[name] && (
                <span className="delivery-calculator__error active">
                    {t(`calculator.errors.${errors[name]}`)}
                </span>
            )}
        </div>
    );

    const vehicleTypeOptions = [
        ['unknown', t('calculator.vehicleTypes.unknown')],
        ['20ft', t('calculator.vehicleTypes.20ft')],
        ['40ft', t('calculator.vehicleTypes.40ft')],
        ['covered', t('calculator.vehicleTypes.covered')],
        ['platform', t('calculator.vehicleTypes.platform')],
        ['halfwagon', t('calculator.vehicleTypes.halfwagon')],
        ['special', t('calculator.vehicleTypes.special')]
    ];

    const deliveryTypeOptions = [
        ['rail', t('calculator.deliveryTypes.rail')],
        ['multimodal', t('calculator.deliveryTypes.multimodal')],
        ['road', t('calculator.deliveryTypes.road')],
        ['sea', t('calculator.deliveryTypes.sea')]
    ];

    const contactPreferenceOptions = [
        ['telegram', 'Telegram'],
        ['whatsapp', 'WhatsApp'],
        ['email', t('calculator.contactTypes.email')]
    ];

    return (
        <div className="delivery-calculator wrapper" id="target-section">
            <div className="delivery-calculator__content">
                <div className="delivery-calculator__title title">
                    {t('calculator.title')}
                </div>
                <p className="delivery-calculator__description">
                    {t('calculator.description')}
                </p>

                {submitStatus && (
                    <div className={`delivery-calculator__${submitStatus}`}>
                        {t(`calculator.${submitStatus}`)}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="delivery-calculator__form">
                    {/* Группировка связанных полей */}
                    <div className="delivery-calculator__form-group">
                        {renderField('origin', 'text', { required: true })}
                        {renderField('destination', 'text', { required: true })}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {renderField('cargoName', 'text', { required: true })}
                        {renderField('cargoCode', 'text')} {/* Теперь необязательное */}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {renderField('batchWeight', 'number', { required: true })}
                        {renderSelect('vehicleType', vehicleTypeOptions)}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {renderField('name', 'text', { required: true })}
                        {renderField('phone', 'tel')}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {renderField('email', 'email')}
                        {renderSelect('contactPreference', contactPreferenceOptions)}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {renderSelect('deliveryType', deliveryTypeOptions)}
                        {renderField('notes', 'text')}
                    </div>

                    <div className="delivery-calculator__form-group">
                        {formData.deliveryType === 'sea' &&
                            renderField('port', 'text')}
                    </div>

                    <div className="delivery-calculator__agree">
                        <button
                            className="button"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? t('calculator.sending') : t('calculator.button')}
                        </button>
                        <span className="delivery-calculator__note">
                            {t('calculator.agreement')}
                        </span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DeliveryCalculator;