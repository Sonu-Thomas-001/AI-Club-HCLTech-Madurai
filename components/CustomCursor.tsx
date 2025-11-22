
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button'
      );
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  // Hide cursor on touch devices
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <motion.div
      className={`fixed top-0 left-0 w-8 h-8 rounded-full border border-hcl-blue z-[9999] pointer-events-none mix-blend-difference ${isPointer ? 'bg-hcl-blue/20 scale-150' : ''}`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        transition: 'background-color 0.2s, transform 0.2s',
      }}
    >
      <div className={`absolute top-1/2 left-1/2 w-1 h-1 bg-hcl-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 ${isPointer ? 'opacity-0' : 'opacity-100'}`} />
    </motion.div>
  );
};
