import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  const variants = {
    // Brand Green with darker hover state
    primary: "bg-[#155e37] text-white hover:bg-[#0f4428] focus:ring-[#155e37] active:bg-[#0a331e]",
    // White background with Gold border and Green text
    secondary: "bg-white text-[#155e37] border border-[#be9d63] hover:bg-[#fdfbf7] focus:ring-[#be9d63]",
    // Danger stays red but softened to match theme
    danger: "bg-red-50 text-red-700 hover:bg-red-100 focus:ring-red-600 border border-red-100"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Processando...
        </>
      ) : (
        children
      )}
    </button>
  );
};