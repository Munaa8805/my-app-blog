import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: React.ReactNode;
  containerClassName?: string;
};

export default function Input({ label, icon, containerClassName = '', className = '', ...props }: InputProps) {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors">
            {icon}
          </div>
        )}
        <input 
          {...props}
          className={`w-full rounded-2xl py-4 ${icon ? 'pl-12' : 'px-6'} pr-6 outline-none transition-all text-sm font-medium bg-gray-50 border-gray-100 text-black focus:bg-white focus:border-black ${className}`}
        />
      </div>
    </div>
  );
}
