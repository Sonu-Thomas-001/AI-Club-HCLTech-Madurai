import React from 'react';
import { TestimonialCard, Testimonial } from './TestimonialCard';
import { motion } from 'framer-motion';

const testimonials: Testimonial[] = [
  {
    quote: "The AI Club has been a game-changer for my career. The hands-on projects and mentorship have accelerated my learning curve in ways I couldn't have imagined.",
    author: { name: 'Anitha J', role: 'Data Scientist', imageUrl: 'https://placehold.co/96x96/e0e0e0/333333?text=AJ' }
  },
  {
    quote: "Being part of this community is incredibly inspiring. Collaborating with talented peers on challenging AI problems is the best part of my week.",
    author: { name: 'Suresh P', role: 'Software Engineer', imageUrl: 'https://placehold.co/96x96/e0e0e0/333333?text=SP' }
  },
  {
    quote: "I came in with very little AI knowledge, but the welcoming environment and excellent workshops helped me build a solid foundation. Now I'm contributing to a major project!",
    author: { name: 'Member One', role: 'Junior Developer', imageUrl: 'https://placehold.co/96x96/e0e0e0/333333?text=M1' }
  },
  {
    quote: "The club provides unparalleled access to resources and experts. It's the perfect place to experiment with new ideas and stay at the forefront of AI.",
    author: { name: 'Member Two', role: 'Cloud Architect', imageUrl: 'https://placehold.co/96x96/e0e0e0/333333?text=M2' }
  },
    {
    quote: "The networking opportunities are fantastic. I've connected with so many brilliant people from different departments, leading to exciting cross-functional collaborations.",
    author: { name: 'Member Three', role: 'Project Manager', imageUrl: 'https://placehold.co/96x96/e0e0e0/333333?text=M3' }
  },
];

const Marquee: React.FC<{ children: React.ReactNode, duration?: number }> = ({ children, duration = 60 }) => {
    return (
        <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-100%' }}
            transition={{ duration, repeat: Infinity, ease: 'linear' }}
            className="flex"
        >
            {children}
        </motion.div>
    );
}

export const ScrollingTestimonials: React.FC = () => {
  const allTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-white via-transparent to-white dark:from-gray-900 dark:via-transparent dark:to-gray-900"></div>
      <div className="flex">
        <Marquee>
            {allTestimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full max-w-sm px-4">
                    <TestimonialCard testimonial={testimonial} />
                </div>
            ))}
        </Marquee>
      </div>
    </div>
  );
};
