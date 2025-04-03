import React, { useEffect, useRef, useState } from 'react';
import './StatItem.css';

const StatItem = ({ number, text }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false); // Состояние для отслеживания видимости
    const statRef = useRef(null);

    useEffect(() => {
        const currentRef = statRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true); // Устанавливаем видимость

                        // Запускаем анимацию цифр через 800 мс (после завершения анимации появления)
                        setTimeout(() => {
                            animateNumber(0, number);
                        }, 800);

                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [number]);

    const animateNumber = (start, end) => {
        const duration = 2000; // Длительность анимации цифр
        const startTime = performance.now();

        const step = (currentTime) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            setCount(Math.floor(progress * (end - start) + start));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    return (
        <div
            className={`stat-item ${isVisible ? 'stat-item--visible' : ''}`} // Добавляем класс при видимости
            ref={statRef}
        >
            <span className="stat-item__number">
                &nbsp;&nbsp;{count}+
            </span>
            <div className="stat-item__line"></div>
            <span className="stat-item__text">{text}</span>
        </div>
    );
};

export default StatItem;