import React from 'react';
import { motion } from 'framer-motion';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  onClick?: () => void;
  padding?: 'none' | 'small' | 'medium' | 'large';
  shadow?: 'none' | 'small' | 'medium' | 'large';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  onClick,
  padding = 'medium',
  shadow = 'small'
}) => {
  const cardContent = (
    <div className={`card card-padding-${padding} card-shadow-${shadow} ${hoverable ? 'card-hoverable' : ''} ${className}`}>
      {children}
    </div>
  );

  if (hoverable) {
    return (
      <motion.div
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        onClick={onClick}
        style={{ cursor: onClick ? 'pointer' : 'default' }}
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
};

export default Card;