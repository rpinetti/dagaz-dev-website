import React from 'react';
import { cn } from '@/lib/cn';

interface BadgeProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ variant = 'default', size = 'md', children, className }) => {
  const baseStyles = 'inline-flex items-center rounded-full font-lato font-semibold transition-colors duration-200';

  const variantStyles = {
    default: 'bg-fjord-blue-light text-glacial-cyan',
    primary: 'bg-glacial-cyan text-fjord-blue',
    success: 'bg-success text-runic-white',
    warning: 'bg-warning text-runic-white',
    error: 'bg-error text-runic-white',
    outline: 'border border-viking-gold text-viking-gold',
  };

  const sizeStyles = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}>
      {children}
    </span>
  );
};

export default Badge;