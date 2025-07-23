import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Image.css';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: string | number;
  height?: string | number;
  effect?: 'blur' | 'opacity' | 'black-and-white';
  onClick?: () => void;
  placeholderSrc?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  effect = 'blur',
  onClick,
  placeholderSrc,
}) => {
  const [isError, setIsError] = useState(false);
  const fallbackSrc = 'https://via.placeholder.com/300x300?text=Image+Not+Found';

  const handleError = () => {
    setIsError(true);
  };

  const imageClasses = [
    'custom-image',
    className,
    onClick ? 'custom-image-clickable' : '',
  ].filter(Boolean).join(' ');

  return (
    <LazyLoadImage
      src={isError ? fallbackSrc : src}
      alt={alt}
      className={imageClasses}
      width={width}
      height={height}
      effect={effect}
      onClick={onClick}
      onError={handleError}
      placeholderSrc={placeholderSrc}
      wrapperClassName="custom-image-wrapper"
    />
  );
};

export default Image;