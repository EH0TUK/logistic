import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: 'ru',
        debug: false,
        ns: ['home', 'about', 'common', 'contact'], // Указываем пространства имен
        defaultNS: 'common',    // Пространство имен по умолчанию
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Путь к файлам
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
            lookupLocalStorage: 'i18nextLng',
        },
        interpolation: {
            escapeValue: false,
        }
    });

export default i18n;