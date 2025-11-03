
import React from 'react';

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <section className="py-16 sm:py-20">
      <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-primary-text mb-8 text-center sm:text-left">
        {title}
      </h2>
      <div>{children}</div>
    </section>
  );
};
