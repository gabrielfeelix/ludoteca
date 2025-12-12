import React from 'react';
import './Card.css';

export const Card = ({
  children,
  variant = 'default',
  className = '',
  hover = true,
  ...props
}) => {
  return (
    <div
      className={`cuphead-card cuphead-card--${variant} ${hover ? 'cuphead-card--hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
