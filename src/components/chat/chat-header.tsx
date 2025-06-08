"use client";

import { ChatSession } from "@/lib/types";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

export function ChatHeader({ session }: { session: ChatSession }) {
  return (
    <motion.div
      className="flex items-center justify-between p-4 border-b"
      style={{ borderColor: 'rgb(var(--color-grey-800) / 0.1)' }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div>
        <h3 className="font-bold text-gradient" style={{ backgroundImage: 'var(--gradient-text-primary)' }}>
          {session.title}
        </h3>
        <p className="text-xs text-gradient" style={{ backgroundImage: 'var(--gradient-text-secondary)' }}>
          Model: {session.modelId}
        </p>
      </div>
      <motion.button
        className="touch-target-48 shape-chamfer"
        style={{ background: 'var(--gradient-surface-interactive)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Chat Settings"
      >
        <SlidersHorizontal size={20} className="text-gray-800" />
      </motion.button>
    </motion.div>
  );
}