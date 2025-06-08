"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Square } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  onInterrupt: () => void;
  isGenerating: boolean;
}

export function ChatInput({ onSend, onInterrupt, isGenerating }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-resize the textarea based on content
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text]);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      className="flex items-end p-2 shape-chamfer backdrop-blur-md gap-2"
      style={{ background: 'var(--gradient-surface-primary)' }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.2 }}
    >
      <textarea
        ref={textareaRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Message OpenBot9000..."
        rows={1}
        className="flex-1 bg-transparent resize-none max-h-48 focus:outline-none p-2 text-gradient"
        style={{ backgroundImage: 'var(--gradient-text-primary)' }}
      />
      <motion.button
        onClick={isGenerating ? onInterrupt : handleSend}
        className="touch-target-48 rounded-full text-white"
        style={{
          background: isGenerating ? 'var(--gradient-stop)' : 'var(--gradient-action)'
        }}
        whileHover={{ scale: 1.1, filter: 'brightness(1.1)' }}
        whileTap={{ scale: 0.9 }}
        animate={{ scale: 1, rotate: isGenerating ? 360 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        aria-label={isGenerating ? "Stop Generation" : "Send Message"}
      >
        <AnimatePresence mode="wait">
          {isGenerating ? (
            <motion.div key="stop" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
              <Square size={20} />
            </motion.div>
          ) : (
            <motion.div key="send" initial={{ rotate: -90, scale: 0 }} animate={{ rotate: 0, scale: 1 }} exit={{ rotate: 90, scale: 0 }}>
              <Send size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}