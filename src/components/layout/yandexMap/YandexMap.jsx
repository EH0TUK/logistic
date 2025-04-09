import React from 'react';
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { useTranslation } from 'react-i18next';

const YandexMap = () => {
    const { t } = useTranslation('contact');

    // Получаем данные с защитой от undefined и проверкой структуры
    const offices = React.useMemo(() => {
        const rawData = t('offices.items', { returnObjects: true }) || [];
        return rawData
            .filter(office =>
                office?.coordinates &&
                Array.isArray(office.coordinates) &&
                office.coordinates.length === 2
            )
            .map(office => ({
                ...office,
                coordinates: office.coordinates.map(coord => Number(coord))
            }));
    }, [t]);

    // Центр карты (первый валидный офис или Москва по умолчанию)
    const center = offices[0]?.coordinates || [55.751244, 37.618423];

    // Проверка готовности данных
    if (offices.length === 0) {
        return (
            <div style={{
                height: '500px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#666',
                fontSize: '1.2rem'
            }}>
                Нет данных для отображения карты
            </div>
        );
    }

    return (
        <div style={{
            height: '500px',
            width: '100%',
            margin: '40px 0',
            borderRadius: '12px',
            overflow: 'hidden'
        }}>
            <YMaps
                query={{
                    apikey: '041dad95-f574-4198-baca-cc766799d4de',
                    lang: 'ru_RU',
                    load: "package.full"
                }}
            >
                <Map
                    state={{ center, zoom: 10 }}
                    width="100%"
                    height="100%"
                    options={{ suppressMapOpenBlock: true }}
                >
                    {offices.map((office, index) => (
                        <Placemark
                            key={`office-${index}-${office.coordinates.join('-')}`}
                            geometry={office.coordinates}
                            properties={{
                                hintContent: office.name || 'Филиал',
                                balloonContent: `
                                    <strong>${office.name || 'Филиал'}</strong><br>
                                    ${office.address || 'Адрес не указан'}<br>
                                    ${office.phone ? `Телефон: ${office.phone}` : ''}
                                `
                            }}
                            options={{
                                preset: 'islands#redDotIcon',
                                iconColor: '#ff0000'
                            }}
                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                        />
                    ))}
                    <ZoomControl options={{ float: 'right' }} />
                </Map>
            </YMaps>
        </div>
    );
};

export default YandexMap;