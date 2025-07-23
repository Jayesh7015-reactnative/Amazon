import React from 'react';
import { motion } from 'framer-motion';
import './Button.css';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  className = '',
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      className={`btn btn-${variant} btn-${size} ${fullWidth ? 'btn-fullwidth' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {loading ? (
        <div className="btn-loader">
          <span className="loader"></span>
          Loading...
        </div>
      ) : (
        children
      )}
    </motion.button>
  );
};

export default Button;