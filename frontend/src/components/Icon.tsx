
import React from 'react';

interface IconProps {
  children: React.ReactNode;
  className?: string;
  size?: number;
}

const Icon: React.FC<IconProps> = ({ children, className = '', size = 6 }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`w-${size} h-${size} ${className}`}
    >
      {children}
    </svg>
  );
};

export default Icon;
