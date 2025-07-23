import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import './Image.css';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  placeholder?: string;
  onClick?: () => void;
  effect?: 'blur' | 'opacity';
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'contain',
  placeholder = '/placeholder.svg',
  onClick,
  effect = 'blur'
}) => {
  return (
    <div className={`image-wrapper ${className}`} onClick={onClick}>
      <LazyLoadImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        effect={effect}
        placeholderSrc={placeholder}
        className="lazy-image"
        style={{ 
          objectFit,
          objectPosition: 'center',
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto'
        }}
        onError={(e: any) => {
          e.target.src = placeholder;
        }}
      />
    </div>
  );
};

export default Image;