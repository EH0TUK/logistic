import React from 'react';
import { Map, Placemark, YMaps, ZoomControl } from '@pbe/react-yandex-maps';
import { useTranslation } from 'react-i18next';

const YandexMap = () => {
    const { t } = useTranslation('contact');  // Убедитесь, что namespace правильный
    const offices = t('offices.items', { returnObjects: true }) || [];

    // Центр карты (координаты первого филиала)
    const center = offices[0]?.coordinates || [55.751244, 37.618423];

    return (
        <div style={{ height: '500px', width: '100%', margin: '40px 0', borderRadius: '12px', overflow: 'hidden' }}>
            <YMaps query={{ apikey: '041dad95-f574-4198-baca-cc766799d4de', lang: 'ru_RU' }}>
                <Map
                    state={{ center, zoom: 10 }}
                    width="100%"
                    height="500px"
                >
                    {/* Маркеры для филиалов */}
                    {offices.map((office, index) => (
                        <Placemark
                            key={index}
                            geometry={office.coordinates}
                            properties={{
                                hintContent: office.name,
                                balloonContent: `
                                    <strong>${office.name}</strong><br>
                                    ${office.address}<br>
                                    Телефон: ${office.phone}
                                `
                            }}
                            options={{
                                preset: 'islands#redDotIcon',
                                iconColor: '#ff0000'
                            }}
                        />
                    ))}
                    <ZoomControl options={{ float: 'right' }} />
                </Map>
            </YMaps>
        </div>
    );
};

export default YandexMap;