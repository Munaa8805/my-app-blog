import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
};

export default function Button({ variant = 'primary', icon, children, className = '', ...props }: ButtonProps) {
  const baseStyles = "py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center space-x-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-black text-white hover:bg-gray-800 shadow-lg shadow-black/5",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
    outline: "bg-transparent border border-gray-200 text-black hover:border-black"
  };

  return (
    <button 
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      {icon && <span className="group-hover:translate-x-1 transition-transform">{icon}</span>}
    </button>
  );
}
