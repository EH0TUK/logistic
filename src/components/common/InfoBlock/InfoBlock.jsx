import React from 'react';
import './InfoBlock.css';

const InfoBlock = React.forwardRef(({ image, text, className }, ref) => {
  // Проверяем, является ли изображение SVG (по расширению файла)
  const isSvg = typeof image === 'string' && image.endsWith('.svg');

  return (
    <div className={`info-block ${className}`} ref={ref}>
      {isSvg ? (
        <div
          className="info-block__image info-block__svg-image"
          style={{ '--svg-url': `url(${image})` }}
        />
      ) : (
        <img src={image} alt="Info" className="info-block__image" />
      )}
      <p className="info-block__text">{text}</p>
    </div>
  );
});

export default InfoBlock;