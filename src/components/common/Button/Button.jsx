import React from 'react';
import './Button.css';
import TriangleIcon from '../TriangleIcon/TriangleIcon';

const smoothScroll = (targetId) => {
  const target = document.getElementById(targetId);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 800;
  let startTime = null;

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  };

  const ease = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  };

  requestAnimationFrame(animation);
};

const Button = ({ text, targetId }) => {
  const handleClick = () => {
    if (targetId) {
      if ('scrollBehavior' in document.documentElement.style) {
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } else {
        smoothScroll(targetId);
      }
    }
  };

  return (
    <button className="button button-light" onClick={handleClick}>
      <span className="button__text">{text}</span>
      <span className="button__icon">
        <TriangleIcon color="var(--color-background-card)" />
      </span>
    </button>
  );
};

export default Button;