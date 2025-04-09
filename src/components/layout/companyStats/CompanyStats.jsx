// CompanyStats.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyStats.css';
import StatItem from '../../common/StatItem/StatItem';

const CompanyStats = () => {
    const { t } = useTranslation('home');
    const stats = [
        { number: 1000, text: t('stats.clients'), align: 'left' },
        { number: 500, text: t('stats.cargo'), align: 'right' },
        { number: 10, text: t('stats.years'), align: 'left' },
        { number: 50, text: t('stats.employees'), align: 'right' },
    ];

    return (
        <div className="company-stats">
            <div className="company-stats__container wrapper">
                {stats.map((stat, index) => (
                    <StatItem
                        key={index}
                        number={stat.number}
                        text={stat.text}
                        className={`stat-item ${stat.align === 'right' ? 'align-right' : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default CompanyStats;