import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import './Carousel.css';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
  height?: string;
}

const Carousel: React.FC<CarouselProps> = ({ 
  images, 
  autoPlay = true, 
  interval = 5000,
  height = '600px'
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(goToNext, interval);
      return () => clearInterval(timer);
    }
  }, [autoPlay, interval, goToNext]);

  return (
    <div className="carousel" style={{ height }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="carousel-image"
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
        />
      </AnimatePresence>

      <button className="carousel-btn carousel-btn-prev" onClick={goToPrevious}>
        <ChevronLeftIcon />
      </button>
      
      <button className="carousel-btn carousel-btn-next" onClick={goToNext}>
        <ChevronRightIcon />
      </button>

      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;