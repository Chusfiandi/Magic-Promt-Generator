import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  icon?: React.ReactNode;
  color?: 'pink' | 'purple' | 'blue' | 'green';
}

export const Card: React.FC<CardProps> = ({ children, className = "", title, icon, color = 'purple' }) => {
  const colorClasses = {
    pink: "border-pink-200 bg-white shadow-pink-100",
    purple: "border-purple-200 bg-white shadow-purple-100",
    blue: "border-sky-200 bg-white shadow-sky-100",
    green: "border-teal-200 bg-white shadow-teal-100",
  };

  return (
    <div className={`rounded-2xl border-2 p-5 shadow-lg transition-all hover:shadow-xl ${colorClasses[color]} ${className}`}>
      {title && (
        <div className="flex items-center gap-2 mb-3">
          {icon}
          <h3 className="font-bold text-lg text-slate-700">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};

export const Label: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-bold text-slate-600 mb-1.5 ml-1">
    {children}
  </label>
);

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export const Select: React.FC<SelectProps> = ({ options, ...props }) => (
  <div className="relative">
    <select
      {...props}
      className="w-full appearance-none rounded-xl border-2 border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all font-semibold cursor-pointer"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
      <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

export const TextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className="w-full rounded-xl border-2 border-slate-200 bg-slate-50 p-4 text-slate-700 placeholder-slate-400 focus:border-pink-400 focus:outline-none focus:ring-4 focus:ring-pink-100 transition-all resize-none font-medium"
  />
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const MagicButton: React.FC<ButtonProps> = ({ children, isLoading, ...props }) => (
  <button
    {...props}
    disabled={isLoading || props.disabled}
    className={`
      w-full group relative overflow-hidden rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-4 font-extrabold text-white shadow-xl shadow-purple-300
      transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-400 active:scale-[0.98]
      disabled:opacity-70 disabled:cursor-not-allowed
    `}
  >
    <div className="relative flex items-center justify-center gap-2">
      {isLoading ? (
        <>
          <svg className="h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Conjuring Magic...</span>
        </>
      ) : (
        children
      )}
    </div>
    {!isLoading && (
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
    )}
  </button>
);