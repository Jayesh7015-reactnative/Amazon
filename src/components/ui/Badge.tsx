import React from 'react';
import { motion } from 'framer-motion';
import './Badge.css';

interface BadgeProps {
  count: number;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning';
  max?: number;
  showZero?: boolean;
  dot?: boolean;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  count,
  color = 'primary',
  max = 99,
  showZero = false,
  dot = false,
  className = ''
}) => {
  if (!showZero && count === 0 && !dot) {
    return null;
  }

  const displayCount = count > max ? `${max}+` : count;

  return (
    <motion.span
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`badge badge-${color} ${dot ? 'badge-dot' : ''} ${className}`}
    >
      {!dot && displayCount}
    </motion.span>
  );
};

export default Badge;