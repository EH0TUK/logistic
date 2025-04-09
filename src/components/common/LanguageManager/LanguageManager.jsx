import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageManager = () => {
    const { i18n } = useTranslation();

    useEffect(() => {
        const handleLanguageChange = (lng) => {
            document.documentElement.lang = lng;
        };

        // Устанавливаем текущий язык при загрузке
        handleLanguageChange(i18n.language);

        // Подписываемся на изменения языка
        i18n.on('languageChanged', handleLanguageChange);

        // Отписываемся при размонтировании
        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [i18n]);

    return null; // Этот компонент ничего не рендерит
};

export default LanguageManager;