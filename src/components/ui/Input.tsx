import React from 'react';
import { cn } from '@/lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, helperText, error, className, ...props }) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg font-lato text-base transition-all duration-200 focus:outline-none';
  const inputStyles = 'bg-runic-white border border-forge-gray-light text-forge-gray placeholder-forge-gray-light focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan focus:ring-opacity-20';
  const errorStyles = 'border-error focus:ring-error';

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="font-montserrat font-semibold text-sm text-runic-white">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <input
        className={cn(baseStyles, inputStyles, error && errorStyles, className)}
        {...props}
      />
      {helperText && !error && (
        <p className="font-lato text-xs text-forge-gray-light">{helperText}</p>
      )}
      {error && (
        <p className="font-lato text-xs text-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </p>
      )}
    </div>
  );
};

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, helperText, error, className, ...props }) => {
  const baseStyles = 'w-full px-4 py-3 rounded-lg font-lato text-base transition-all duration-200 focus:outline-none min-h-[120px] resize-y';
  const textareaStyles = 'bg-runic-white border border-forge-gray-light text-forge-gray placeholder-forge-gray-light focus:border-glacial-cyan focus:ring-2 focus:ring-glacial-cyan focus:ring-opacity-20';
  const errorStyles = 'border-error focus:ring-error';

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={props.id} className="font-montserrat font-semibold text-sm text-runic-white">
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      <textarea
        className={cn(baseStyles, textareaStyles, error && errorStyles, className)}
        {...props}
      />
      {helperText && !error && (
        <p className="font-lato text-xs text-forge-gray-light">{helperText}</p>
      )}
      {error && (
        <p className="font-lato text-xs text-error flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;