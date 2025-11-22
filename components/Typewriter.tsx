
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterProps {
  words: string[];
  className?: string;
}

export const Typewriter: React.FC<TypewriterProps> = ({ words, className = "" }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  // Typing logic
  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, Math.max(reverse ? 75 : subIndex === words[index].length ? 1000 : 150, Math.random() * 350));

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words]);

  return (
    <span className={`${className} inline-flex items-center`}>
      {`${words[index].substring(0, subIndex)}`}
      <motion.span
        animate={{ opacity: blink ? 1 : 0 }}
        className="w-[2px] h-[1em] bg-hcl-blue ml-1 inline-block"
      />
    </span>
  );
};
