import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-6 py-3 font-semibold rounded-xl text-md transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'bg-gradient-to-r from-hcl-blue to-hcl-teal text-white hover:shadow-lg hover:shadow-hcl-blue/30 focus:ring-hcl-blue',
    secondary: 'bg-tech-purple text-white hover:bg-hcl-blue focus:ring-tech-purple',
    outline: 'border-2 border-hcl-blue text-hcl-blue hover:bg-hcl-blue hover:text-white focus:ring-hcl-blue dark:text-hcl-blue dark:hover:text-white',
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
