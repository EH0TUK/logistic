import React, { useRef, useEffect } from 'react';
import InfoBlock from '../../common/InfoBlock/InfoBlock';
import Truck from '../../../assets/truck.png';
import HeavyTruck from '../../../assets/heavy-truck.png';
import Train from '../../../assets/train.png';
import './InfoBlocks.css';
import { useTranslation } from 'react-i18next';

const InfoBlocks = () => {
    const infoBlocksRef = useRef([]);
    const { t } = useTranslation('home');

    useEffect(() => {
        setTimeout(() => {
            if (infoBlocksRef.current[0]) {
                infoBlocksRef.current[0].style.opacity = '1';
                infoBlocksRef.current[0].style.transform = 'translateX(0)';
            }
        }, 800);

        setTimeout(() => {
            if (infoBlocksRef.current[1]) {
                infoBlocksRef.current[1].style.opacity = '1';
                infoBlocksRef.current[1].style.transform = 'translateY(0)';
            }
        }, 1000);

        setTimeout(() => {
            if (infoBlocksRef.current[2]) {
                infoBlocksRef.current[2].style.opacity = '1';
                infoBlocksRef.current[2].style.transform = 'translateX(0)';
            }
        }, 1200);
    }, []);

    return (
        <div className="info-blocks">
            <InfoBlock
                ref={(el) => (infoBlocksRef.current[0] = el)}
                image={Truck}
                text={t('infoBlocks.truck')}
                className="info-blocks__block info-blocks__block--first"
            />
            <InfoBlock
                ref={(el) => (infoBlocksRef.current[1] = el)}
                image={HeavyTruck}
                text={t('infoBlocks.heavyTruck')}
                className="info-blocks__block info-blocks__block--second"
            />
            <InfoBlock
                ref={(el) => (infoBlocksRef.current[2] = el)}
                image={Train}
                text={t('infoBlocks.train')}
                className="info-blocks__block info-blocks__block--third"
            />
        </div>
    );
};

export default InfoBlocks;