import React from 'react';
import './Card.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
  bordered?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverable = false,
  bordered = true,
  padding = 'medium',
  onClick,
}) => {
  const cardClasses = [
    'card',
    hoverable ? 'card-hoverable' : '',
    bordered ? 'card-bordered' : '',
    padding !== 'none' ? `card-padding-${padding}` : '',
    onClick ? 'card-clickable' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick} role={onClick ? 'button' : undefined}>
      {children}
    </div>
  );
};

export default Card;