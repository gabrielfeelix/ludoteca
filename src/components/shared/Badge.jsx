import React from 'react';
import './Badge.css';

export const Badge = ({
  children,
  variant = 'default',
  animated = false,
  className = '',
  ...props
}) => {
  return (
    <span
      className={`cuphead-badge cuphead-badge--${variant} ${animated ? 'cuphead-badge--animated' : ''} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
