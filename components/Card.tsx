import React from 'react';

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ icon, title, description, children }) => {
  return (
    <div className="glass-card p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out group flex flex-col relative overflow-hidden border-2 border-transparent hover:border-hcl-blue/50">
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-hcl-blue/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      {icon && (
         <div className="mb-6 bg-hcl-blue/10 dark:bg-hcl-blue/20 w-16 h-16 rounded-full flex items-center justify-center group-hover:bg-hcl-teal/10 dark:group-hover:bg-hcl-teal/20 transition-colors duration-300 flex-shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-grow">
        <h3 className="font-space-grotesk text-2xl font-bold text-primary-text dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
};
