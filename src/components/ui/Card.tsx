import React from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'minimal' | 'elevated' | 'outlined';
}

const Card: React.FC<CardProps> = ({ children, variant = 'default', className, ...props }) => {
  const baseStyles = 'bg-fjord-blue rounded-xl transition-all duration-300';

  const variantStyles = {
    default: 'border border-fjord-blue-light shadow-md hover:shadow-lg hover:border-glacial-cyan',
    minimal: 'shadow-sm hover:shadow-md',
    elevated: 'shadow-lg hover:shadow-xl',
    outlined: 'border-2 border-viking-gold hover:shadow-gold',
  };

  return (
    <div className={cn(baseStyles, variantStyles[variant], className)} {...props}>
      {children}
    </div>
  );
};

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className, ...props }) => (
  <div className={cn('p-6 pb-4 border-b border-fjord-blue-light flex justify-between items-center', className)} {...props}>
    {children}
  </div>
);

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className, ...props }) => (
  <h3 className={cn('font-montserrat font-semibold text-xl text-viking-gold', className)} {...props}>
    {children}
  </h3>
);

interface CardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardBody: React.FC<CardBodyProps> = ({ children, className, ...props }) => (
  <div className={cn('p-6 pt-4 font-lato text-base text-runic-white leading-relaxed', className)} {...props}>
    {children}
  </div>
);

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({ children, className, ...props }) => (
  <div className={cn('p-6 pt-4 border-t border-fjord-blue-light flex justify-end gap-3', className)} {...props}>
    {children}
  </div>
);

export default Card;