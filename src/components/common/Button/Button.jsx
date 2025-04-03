import React from 'react';
import './Button.css'; // Подключаем стили
import TriangleIcon from '../../../assets/triangle-icon.png'

const Button = ({ text }) => {
  return (
    <button className="button">
      <span className="button__text">{text}</span>
        <span className="button__icon">
          <img src={TriangleIcon} alt="icon" className="button__icon-img" />
        </span>
    </button>
  );
};

export default Button;