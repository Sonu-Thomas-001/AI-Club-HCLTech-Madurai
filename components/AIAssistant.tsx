import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, X } from './Icons';
import type { Chat } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  content: string;
}

interface AIAssistantProps {
  onClose: () => void;
}

const systemInstruction = `You are a friendly and helpful AI assistant for the HCLTech Madurai AI Club website. Your goal is to answer questions about the club, its projects, events, and how to join. Be concise, encouraging, and use a professional yet approachable tone. If you don't know an answer, say so politely and suggest they use the contact form for specific queries. Do not answer questions unrelated to the AI Club or HCLTech.`;

export const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello! I'm the AI Assistant for the HCLTech Madurai AI Club. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // FIX: Use a state to hold the chat instance to ensure component re-renders upon initialization.
  const [chat, setChat] = useState<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const initializeAI = async () => {
      try {
        const API_KEY = process.env.API_KEY;
        if (!API_KEY) {
          throw new Error("API key is not available.");
        }
        const { GoogleGenAI } = await import('@google/genai');
        const ai = new GoogleGenAI({ apiKey: API_KEY });
        // FIX: Initialize a stateful chat session for a better conversational experience.
        const newChat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
        });
        setChat(newChat);
      } catch (e: any) {
        setError("Failed to initialize the AI Assistant. Please try again later.");
        console.error(e);
      }
    };
    
    initializeAI();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !chat) return;

    const userMessage: Message = { role: 'user', content: input };
    const currentInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    try {
       // FIX: Use the more efficient chat.sendMessage method for conversations.
      const response = await chat.sendMessage({ message: currentInput });
      const modelMessage: Message = { role: 'model', content: response.text };
      setMessages((prev) => [...prev, modelMessage]);
    } catch (e: any)
    {
      const errorMessage = "Sorry, I encountered an error. Please try again.";
      setError(errorMessage);
      setMessages((prev) => [...prev, { role: 'model', content: errorMessage }]);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ y: '100%', opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-[calc(100%-40px)] max-w-sm h-[70vh] max-h-[600px] flex flex-col glass-card rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/20 flex-shrink-0">
        <div className="flex items-center">
          <Bot className="w-6 h-6 text-hcl-blue" />
          <h3 className="font-space-grotesk font-bold text-lg ml-2">AI Assistant</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10" aria-label="Close chat">
          <X className="w-5 h-5" />
        </button>
      </header>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-hcl-blue/20 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-hcl-blue" /></div>}
              <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-hcl-blue text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-primary-text dark:text-gray-200 rounded-bl-none'}`}>
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-hcl-blue/20 flex items-center justify-center flex-shrink-0"><Bot className="w-5 h-5 text-hcl-blue" /></div>
              <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 dark:bg-gray-700">
                 <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-hcl-blue rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 bg-hcl-blue rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 bg-hcl-blue rounded-full animate-bounce"></span>
                 </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Form */}
      <div className="p-4 border-t border-white/20 flex-shrink-0">
        {error && !isLoading && <p className="text-xs text-red-500 mb-2 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-grow w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-hcl-blue transition"
            disabled={isLoading || !chat}
          />
          <button type="submit" className="p-3 rounded-full bg-hcl-blue text-white disabled:bg-gray-400 transition-colors" disabled={isLoading || !input.trim() || !chat}>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </motion.div>
  );
};
