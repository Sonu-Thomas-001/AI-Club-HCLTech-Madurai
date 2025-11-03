import React, { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

interface CountUpStatProps {
  value: number;
  label: string;
}

export const CountUpStat: React.FC<CountUpStatProps> = ({ value, label }) => {
    const ref = useRef(null);
    const countRef = useRef<HTMLParagraphElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.5 });
    
    useEffect(() => {
        if (isInView && countRef.current) {
            const node = countRef.current;
            const controls = animate(0, value, {
                duration: 2,
                ease: 'easeOut',
                onUpdate(latest) {
                    node.textContent = `${Math.round(latest)}+`;
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-2 md:p-4">
      <p ref={countRef} className="font-space-grotesk text-4xl md:text-5xl font-bold gradient-text from-hcl-blue to-tech-purple">
        0+
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
};
