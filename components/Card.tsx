
import React, { useRef, useState, useEffect } from 'react';

interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ icon, title, description, children }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
    setIsFocused(true);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    setIsFocused(false);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-8 rounded-2xl relative overflow-hidden transition-transform duration-300 ease-in-out hover:-translate-y-1 group h-full border border-transparent bg-white dark:bg-gray-900 shadow-lg"
    >
      {/* Spotlight Gradient Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(41, 171, 226, 0.1), transparent 40%)`,
        }}
      />
      
      {/* Border Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
         style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(41, 171, 226, 0.4), transparent 40%)`,
          maskImage: 'linear-gradient(black, black) content-box, linear-gradient(black, black)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          padding: '1px', // Border width
          borderRadius: 'inherit'
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {icon && (
          <div className="mb-6 bg-hcl-blue/10 dark:bg-hcl-blue/20 w-16 h-16 rounded-xl flex items-center justify-center text-hcl-blue dark:text-hcl-blue group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
        )}
        <div className="flex-grow">
          <h3 className="font-space-grotesk text-2xl font-bold text-primary-text dark:text-white mb-3 group-hover:text-hcl-blue transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </div>
  );
};
