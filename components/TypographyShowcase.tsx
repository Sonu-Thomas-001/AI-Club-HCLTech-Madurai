
import React from 'react';
import { Section } from './Section';

export const TypographyShowcase: React.FC = () => {
  return (
    <Section title="Typography">
      <div className="bg-white p-8 rounded-2xl shadow-sm space-y-8">
        <div>
          <p className="text-sm uppercase text-secondary-text tracking-wider mb-2">Headline 1</p>
          <h1 className="font-space-grotesk text-5xl font-bold">Space Grotesk - Bold</h1>
        </div>
        <div>
          <p className="text-sm uppercase text-secondary-text tracking-wider mb-2">Headline 2</p>
          <h2 className="font-space-grotesk text-4xl font-semibold">Space Grotesk - Semi-Bold</h2>
        </div>
        <div>
          <p className="text-sm uppercase text-secondary-text tracking-wider mb-2">Body Text</p>
          <p className="text-lg text-secondary-text max-w-prose">
            Inter - Regular. This font is chosen for its exceptional readability on screens. It ensures that all content, from project descriptions to articles, is clear, accessible, and comfortable to read across all devices. The quick brown fox jumps over the lazy dog.
          </p>
        </div>
        <div>
          <p className="text-sm uppercase text-secondary-text tracking-wider mb-2">Link Style</p>
          <a href="#" className="text-lg text-hcl-blue hover:text-link-hover underline transition-colors duration-300">
            This is a hyperlink
          </a>
        </div>
      </div>
    </Section>
  );
};
