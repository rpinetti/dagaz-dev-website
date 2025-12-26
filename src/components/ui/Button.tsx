import React from 'react';
import { cn } from '@/lib/cn';

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger';
  as?: React.ElementType;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  as: Component = 'button',
  className,
  children,
  ...props
}) => {
  const baseStyles = 'font-montserrat font-semibold rounded-lg transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-glacial-cyan text-fjord-blue hover:bg-glacial-cyan-light hover:shadow-cyan active:bg-glacial-cyan-dark focus:ring-glacial-cyan',
    secondary: 'bg-viking-gold text-fjord-blue hover:bg-viking-gold-light hover:shadow-gold active:bg-viking-gold-dark focus:ring-viking-gold',
    tertiary: 'border-2 border-viking-gold text-viking-gold hover:bg-viking-gold hover:text-fjord-blue hover:shadow-gold active:bg-viking-gold-dark focus:ring-viking-gold',
    ghost: 'bg-transparent border border-forge-gray-light text-runic-white hover:border-glacial-cyan hover:text-glacial-cyan active:bg-glacial-cyan-dark active:text-fjord-blue focus:ring-glacial-cyan',
    danger: 'bg-error text-runic-white hover:bg-error-dark active:bg-error-darker focus:ring-error',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const Comp = Component as any;

  return (
    <Comp className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)} {...(props as any)}>
      {children}
    </Comp>
  );
};

export default Button;