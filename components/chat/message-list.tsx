"use client";

import { Message } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MessageBubble } from "./message-bubble";

export function MessageList({ messages }: { messages: Message[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom on new message or stream chunk
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
      <AnimatePresence initial={false}>
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
      </AnimatePresence>
    </div>
  );
}