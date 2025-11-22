
import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [text, setText] = useState('');
  const fullText = 'Initializing Intelligence...';

  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3500); // Total duration

    return () => clearTimeout(timer);
  }, [onComplete]);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Typing speed

    return () => clearInterval(interval);
  }, []);

  const circuitPathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: 'spring', duration: 1.5, bounce: 0 },
        opacity: { delay: i * 0.1, duration: 0.01 },
      },
    }),
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Glowing Core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-4 h-4 bg-hcl-blue rounded-full shadow-[0_0_20px_rgba(41,171,226,0.8)]"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Rotating Rings */}
        <motion.div
          className="absolute w-24 h-24 border border-hcl-blue/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-40 h-40 border border-dashed border-tech-purple/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Circuit Lines SVG */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {/* Define glow filter */}
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
            </defs>

            {/* Circuit Paths */}
            <g stroke="url(#circuit-gradient)" strokeWidth="0.5" fill="none" strokeLinecap="round" filter="url(#glow)">
                 <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#29ABE2" />
                    <stop offset="100%" stopColor="#5F1EBE" />
                </linearGradient>
                
                {/* Top Right Branch */}
                <motion.path d="M 50 45 L 50 35 L 65 35 L 70 20" variants={circuitPathVariants} custom={1} initial="hidden" animate="visible" />
                <motion.circle cx="70" cy="20" r="1" fill="#29ABE2" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}} />

                {/* Bottom Right Branch */}
                <motion.path d="M 55 50 L 65 50 L 75 60 L 85 60" variants={circuitPathVariants} custom={2} initial="hidden" animate="visible" />
                <motion.circle cx="85" cy="60" r="1" fill="#29ABE2" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.9}} />
                
                {/* Bottom Left Branch */}
                <motion.path d="M 50 55 L 50 65 L 40 65 L 30 80" variants={circuitPathVariants} custom={3} initial="hidden" animate="visible" />
                <motion.circle cx="30" cy="80" r="1" fill="#29ABE2" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.0}} />

                {/* Top Left Branch */}
                <motion.path d="M 45 50 L 35 50 L 25 40 L 15 40" variants={circuitPathVariants} custom={4} initial="hidden" animate="visible" />
                <motion.circle cx="15" cy="40" r="1" fill="#29ABE2" initial={{opacity:0}} animate={{opacity:1}} transition={{delay:1.1}} />
                
                {/* Inner connect */}
                <motion.path d="M 50 50 L 50 45" variants={circuitPathVariants} custom={0} initial="hidden" animate="visible" />
                <motion.path d="M 50 50 L 55 50" variants={circuitPathVariants} custom={0} initial="hidden" animate="visible" />
                <motion.path d="M 50 50 L 50 55" variants={circuitPathVariants} custom={0} initial="hidden" animate="visible" />
                <motion.path d="M 50 50 L 45 50" variants={circuitPathVariants} custom={0} initial="hidden" animate="visible" />

            </g>
        </svg>
      </div>

      <div className="mt-8 font-space-grotesk font-bold text-lg tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-hcl-blue to-white">
        {text}
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="inline-block w-2 h-4 bg-hcl-blue ml-1 align-middle"
        />
      </div>
    </motion.div>
  );
};
