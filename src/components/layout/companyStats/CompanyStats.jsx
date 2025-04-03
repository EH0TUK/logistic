import React from 'react';
import { useTranslation } from 'react-i18next';
import './CompanyStats.css';
import StatItem from '../../common/StatItem/StatItem';

const CompanyStats = () => {
    const { t } = useTranslation('home');
    const stats = [
        { number: 1000, text: t('stats.clients') },
        { number: 500, text: t('stats.cargo') },
        { number: 10, text: t('stats.years') },
        { number: 50, text: t('stats.employees') },
    ];

    return (
        <div className="company-stats">
            <div className="compaty-stats__container wrapper">
                {stats.map((stat, index) => (
                    <StatItem key={index} number={stat.number} text={stat.text} />
                ))}
            </div>
        </div>
    );
};

export default CompanyStats;