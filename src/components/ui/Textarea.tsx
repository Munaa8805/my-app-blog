import React from 'react';

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  containerClassName?: string;
};

export default function Textarea({ label, containerClassName = '', className = '', ...props }: TextareaProps) {
  return (
    <div className={`space-y-2 ${containerClassName}`}>
      <label className="text-xs font-bold uppercase tracking-wider text-gray-400">
        {label}
      </label>
      <textarea 
        {...props}
        className={`w-full rounded-2xl py-4 px-6 outline-none transition-all text-sm font-medium min-h-[120px] resize-none bg-gray-50 border-gray-100 text-black focus:bg-white focus:border-black ${className}`}
      />
    </div>
  );
}
