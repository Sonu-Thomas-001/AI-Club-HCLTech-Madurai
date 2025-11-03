import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="relative text-center py-20 md:py-24 overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-teal-100 dark:from-gray-900 dark:via-gray-800 dark:to-hcl-teal/20"
      ></div>
      <div className="absolute inset-0 bg-grid-gray-200/[0.2] dark:bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white,transparent,white)]"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <h1 className="font-space-grotesk text-4xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-hcl-blue via-tech-purple to-hcl-teal pb-4">
          {title}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mt-2 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
};
