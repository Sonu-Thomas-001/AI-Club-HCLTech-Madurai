import React, { useState, useRef } from 'react';
import { LinkedIn } from './Icons';

interface TeamMemberCardProps {
  member: {
    name: string;
    role: string;
    imageUrl: string;
    linkedinUrl: string;
  };
}

export const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member }) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-80 rounded-2xl glass-card group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-hcl-blue/20 hover:-translate-y-2 border-2 border-transparent hover:border-hcl-blue/30"
    >
      {/* Aurora Effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px at ${position.x}px ${position.y}px, rgba(41, 171, 226, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-6">
        <div className="relative w-32 h-32 mb-4">
          <img
            src={member.imageUrl}
            alt={member.name}
            className="w-full h-full rounded-full bg-gray-200 shadow-lg object-cover"
          />
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 bg-hcl-blue/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label={`${member.name}'s LinkedIn`}
          >
            <LinkedIn className="w-8 h-8 text-white" />
          </a>
        </div>
        <h4 className="font-space-grotesk text-xl font-bold">{member.name}</h4>
        <p className="text-hcl-teal font-semibold">{member.role}</p>
      </div>
    </div>
  );
};
