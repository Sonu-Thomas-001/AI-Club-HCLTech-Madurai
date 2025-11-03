import React, { useState } from 'react';
import { ChevronDown } from './Icons';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-semibold text-lg text-primary-text dark:text-gray-200 group"
        aria-expanded={isOpen}
      >
        <span className="group-hover:text-hcl-blue transition-colors">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 group-hover:text-hcl-blue ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
            <div className="pt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};
