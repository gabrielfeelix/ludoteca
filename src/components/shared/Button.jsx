import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  onClick,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`cuphead-btn cuphead-btn--${variant} cuphead-btn--${size} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="btn-text">{children}</span>
    </button>
  );
};
