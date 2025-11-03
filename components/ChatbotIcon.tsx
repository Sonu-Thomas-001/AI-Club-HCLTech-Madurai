import React from 'react';
import { MessageSquare } from './Icons';

interface ChatbotIconProps {
  onClick: () => void;
}

export const ChatbotIcon: React.FC<ChatbotIconProps> = ({ onClick }) => {
  return (
    <button
      className="fixed bottom-5 right-5 z-50 p-3 rounded-full bg-gradient-to-r from-tech-purple to-hcl-blue text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
      aria-label="Open AI Assistant"
      onClick={onClick}
    >
      <MessageSquare className="w-6 h-6" />
    </button>
  );
};