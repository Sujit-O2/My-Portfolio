import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESUME_DATA } from '../constants';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: `Hi! I'm Sujit's AI Assistant. Ask me anything about his projects, skills, or experience!` }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        You are an AI portfolio assistant for Sujit Swain. 
        You are helpful, professional, and enthusiastic about technology.
        Your goal is to answer questions about Sujit strictly based on the provided resume data.
        
        RESUME CONTEXT:
        ${JSON.stringify(RESUME_DATA)}
        
        Guidelines:
        - Be concise and direct.
        - If asked about contact info, provide the email or linkedin from the data.
        - Use a friendly tone.
        - Highlight his key strengths: Java, Spring Boot, and Full Stack development.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userMessage,
        config: {
          systemInstruction: systemInstruction,
        }
      });

      const aiResponse = response.text || "I'm having trouble connecting right now. Please try again.";
      setMessages(prev => [...prev, { role: 'model', text: aiResponse }]);
    } catch (error: any) {
      console.error("AI Error:", error);
      let errorMessage = "Sorry, I encountered an error. Please check your connection.";
      if (error?.toString().includes("API key")) {
         errorMessage = "API Configuration Error: Unable to access the brain.";
      }
      setMessages(prev => [...prev, { role: 'model', text: errorMessage }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-[100] p-4 rounded-full shadow-2xl animate-glow-pulse transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center dark:bg-neutral-900 bg-white border border-emerald-500 text-emerald-600 dark:text-emerald-500 cursor-pointer`}
      >
        <Bot size={28} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[100] w-[90vw] md:w-[400px] h-[500px] dark:bg-neutral-900/95 bg-white/95 backdrop-blur-xl border border-emerald-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-emerald-500/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r dark:from-neutral-900 dark:to-neutral-800 from-slate-100 to-white border-b dark:border-neutral-800 border-slate-200 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping absolute top-0 right-0"></div>
                  <Bot size={20} className="text-emerald-500" />
                </div>
                <h3 className="font-mono font-bold dark:text-white text-slate-800 text-sm">AI_Assistant <span className="text-emerald-500 text-[10px] animate-pulse">● ONLINE</span></h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-400 hover:text-rose-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar dark:bg-neutral-900/50 bg-slate-50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user' 
                        ? 'bg-rose-600 text-white rounded-br-none shadow-md' 
                        : 'dark:bg-neutral-800 bg-white dark:text-neutral-200 text-slate-800 rounded-bl-none border dark:border-neutral-700 border-slate-200 shadow-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="dark:bg-neutral-800 bg-white p-3 rounded-2xl rounded-bl-none border dark:border-neutral-700 border-slate-200 flex items-center gap-2 shadow-sm">
                    <Loader2 size={16} className="animate-spin text-emerald-500" />
                    <span className="text-xs dark:text-neutral-400 text-slate-500">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 border-t dark:border-neutral-800 border-slate-200 dark:bg-neutral-900/50 bg-white">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about Sujit..."
                  className="w-full dark:bg-neutral-950 bg-slate-50 border dark:border-neutral-700 border-slate-300 rounded-xl py-3 pl-4 pr-12 text-sm dark:text-white text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-neutral-500"
                />
                <button 
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="absolute right-2 p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
              <div className="text-[10px] text-center dark:text-neutral-600 text-slate-400 mt-2 font-mono">
                Powered by Gemini 2.5 Flash
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AiAssistant;