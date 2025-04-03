import React from 'react';
import './InfoBlock.css';

const InfoBlock = React.forwardRef(({ image, text, className }, ref) => {
  return (
    <div className={`info-block ${className}`} ref={ref}>
      <img src={image} alt="Info" className="info-block__image" />
      <p className="info-block__text">{text}</p>
    </div>
  );
});

export default InfoBlock;