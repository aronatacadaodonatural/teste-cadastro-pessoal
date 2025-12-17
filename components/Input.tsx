import React from 'react';
import { LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
  error?: string;
}

export const Input: React.FC<InputProps> = ({ 
  label, 
  icon: Icon, 
  error, 
  className = '', 
  id,
  ...props 
}) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full space-y-1.5">
      <label 
        htmlFor={inputId} 
        className="block text-sm font-medium text-slate-700"
      >
        {label}
      </label>
      <div className="relative group">
        {Icon && (
          // Icon turns Brand Green on focus, Gold by default
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#be9d63] group-focus-within:text-[#155e37] transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          id={inputId}
          className={`
            w-full bg-white border border-slate-300 rounded-lg py-2.5 
            ${Icon ? 'pl-10' : 'pl-3'} pr-3
            text-sm text-slate-900 placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-[#155e37]/20 focus:border-[#155e37]
            transition-all duration-200 ease-in-out shadow-sm
            disabled:bg-slate-50 disabled:text-slate-500
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs text-red-500 animate-pulse">{error}</p>
      )}
    </div>
  );
};