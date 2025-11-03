import React from 'react';
import { Quote } from './Icons';

export interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
    imageUrl: string;
  };
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="glass-card p-8 rounded-2xl shadow-lg flex flex-col h-full min-h-[280px]">
      <Quote className="w-8 h-8 text-hcl-blue/50 mb-4 flex-shrink-0" />
      <blockquote className="text-gray-600 dark:text-gray-300 italic flex-grow">
        <p>"{testimonial.quote}"</p>
      </blockquote>
      <div className="flex items-center mt-6 flex-shrink-0">
        <img src={testimonial.author.imageUrl} alt={testimonial.author.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
        <div className="text-left">
          <cite className="font-bold text-primary-text dark:text-white not-italic">{testimonial.author.name}</cite>
          <p className="text-sm text-secondary-text dark:text-gray-400">{testimonial.author.role}</p>
        </div>
      </div>
    </div>
  );
};
