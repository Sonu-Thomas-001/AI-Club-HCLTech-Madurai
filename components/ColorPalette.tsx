
import React from 'react';
import { Section } from './Section';

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  textColor?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex, textColor = 'text-white' }) => (
  <div className="w-full">
    <div className={`h-32 rounded-t-2xl ${color}`}></div>
    <div className="bg-white p-4 rounded-b-2xl shadow-sm">
      <h3 className="font-bold text-primary-text">{name}</h3>
      <p className="text-secondary-text uppercase">{hex}</p>
    </div>
  </div>
);

export const ColorPalette: React.FC = () => {
  return (
    <Section title="Color Palette">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8">
        <ColorSwatch color="bg-hcl-blue" name="HCLTech Blue" hex="#29ABE2" />
        <ColorSwatch color="bg-hcl-teal" name="Teal" hex="#008080" />
        <ColorSwatch color="bg-light-gray" name="Light Gray" hex="#F0F0F0" textColor="text-black" />
        <ColorSwatch color="bg-primary-text" name="Primary Text" hex="#1E1E1E" />
        <ColorSwatch color="bg-secondary-text" name="Secondary Text" hex="#555555" />
      </div>
    </Section>
  );
};
