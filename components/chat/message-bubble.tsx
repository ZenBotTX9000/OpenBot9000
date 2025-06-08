"use client";

import { Message } from "@/lib/types";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { MarkdownRenderer } from "../shared/markdown-renderer";
import { emergeAnimation } from "@/lib/animations";

export function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  const Icon = isUser ? User : Bot;
  
  return (
    <motion.div
      variants={emergeAnimation}
      initial="initial"
      animate="enter"
      exit="exit"
      layout
      className={`flex items-start gap-3 w-full ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
             style={{ background: 'var(--gradient-accent)' }}>
          <Icon size={20} />
        </div>
      )}
      
      <div className={`max-w-[85%] md:max-w-[75%] space-y-2 ${isUser ? 'order-first' : ''}`}>
        {message.reasoning && (
          <motion.div
            layout
            className="p-3 shape-chamfer text-sm border-dashed border"
            style={{ borderColor: 'rgb(var(--color-accent-blue) / 0.5)' }}
          >
            <p className="font-bold text-gradient mb-2" style={{backgroundImage: 'var(--gradient-text-secondary)'}}>Thinking...</p>
            <MarkdownRenderer content={message.reasoning} />
          </motion.div>
        )}
        <div
          className="p-4 shape-chamfer"
          style={{ background: isUser ? 'var(--gradient-accent)' : 'var(--gradient-surface-primary)' }}
        >
          <MarkdownRenderer content={message.content} />
        </div>
      </div>
    </motion.div>
  );
}
