import React, { useState } from 'react';

const PizzaSliceIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M 50 0 L 95 80 A 50 50 0 0 1 5 80 Z" fill="#FBBF24" />
        <path d="M 50 5 L 88 72 A 45 45 0 0 1 12 72 Z" fill="#F59E0B" />
        <circle cx="50" cy="35" r="8" fill="#EF4444" />
        <circle cx="35" cy="55" r="6" fill="#EF4444" />
        <circle cx="65" cy="55" r="6" fill="#EF4444" />
    </svg>
);

const FullPizzaIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="50" cy="50" r="48" fill="#FBBF24" />
        <circle cx="50" cy="50" r="43" fill="#F59E0B" />
        <circle cx="30" cy="30" r="7" fill="#EF4444" />
        <circle cx="70" cy="30" r="7" fill="#EF4444" />
        <circle cx="50" cy="50" r="7" fill="#EF4444" />
        <circle cx="30" cy="70" r="7" fill="#EF4444" />
        <circle cx="70" cy="70" r="7" fill="#EF4444" />
    </svg>
);

interface PizzaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'icon' | 'ghost';
}

const PizzaButton: React.FC<PizzaButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled,
  variant = 'primary',
  ...props
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || isAnimating) {
      e.preventDefault();
      return;
    }

    setIsAnimating(true);
    
    const animationDuration = 500;
    
    setTimeout(() => {
      if(onClick) {
        const syntheticEvent = Object.create(e);
        syntheticEvent.currentTarget = e.currentTarget;
        onClick(syntheticEvent as React.MouseEvent<HTMLButtonElement>);
      }
      setIsAnimating(false);
    }, animationDuration);
  };

  const baseClasses = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: 'bg-red-700 text-white hover:bg-red-800 disabled:bg-red-700 px-4 py-2 space-x-2',
    secondary: 'bg-stone-800 text-white hover:bg-stone-900 disabled:bg-stone-800 px-4 py-3 space-x-2',
    ghost: 'bg-white text-red-700 border border-red-700 hover:bg-red-50 disabled:bg-white px-4 py-3 space-x-2',
    icon: 'p-2 space-x-0',
  };

  const iconSize = variant === 'icon' ? 'w-8 h-8' : 'w-7 h-7';

  return (
    <button
      onClick={handleClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isAnimating}
      {...props}
    >
      <div className={`relative ${iconSize} transition-transform duration-500 ease-in-out ${isAnimating ? 'rotate-[360deg] scale-110' : 'rotate-[-25deg]'}`}>
        <div className={`absolute inset-0 transition-opacity duration-200 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
            <PizzaSliceIcon className="w-full h-full" />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-200 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}>
            <FullPizzaIcon className="w-full h-full" />
        </div>
      </div>
      {children && <span>{children}</span>}
    </button>
  );
};

export default PizzaButton;