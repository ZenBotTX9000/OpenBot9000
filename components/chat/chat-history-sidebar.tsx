"use client";

import { ChatSession } from "@/lib/types";
import { motion } from "framer-motion";
import { MessageSquarePlus, Trash2 } from "lucide-react";
import { emergeAnimation } from "@/lib/animations";
import { db } from "@/lib/db";

interface ChatHistorySidebarProps {
  sessions: ChatSession[];
  activeId: number | null;
  onSelectChat: (id: number) => void;
  onCreateNew: () => void;
}

export function ChatHistorySidebar({ sessions, activeId, onSelectChat, onCreateNew }: ChatHistorySidebarProps) {
  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    // Add a confirmation dialog here in a real app
    await db.chats.delete(id);
  };

  return (
    <motion.aside
      className="w-72 h-full p-4 flex flex-col backdrop-blur-md"
      style={{ background: 'rgb(var(--color-grey-100) / 0.5)' }}
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gradient" style={{ backgroundImage: 'var(--gradient-text-accent)'}}>
          Chats
        </h2>
        <motion.button
          onClick={onCreateNew}
          className="touch-target-48 shape-chamfer"
          style={{ background: 'var(--gradient-accent)' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquarePlus size={20} className="text-gray-800" />
        </motion.button>
      </div>

      <motion.div
        layout
        className="flex-1 overflow-y-auto space-y-2 pr-2 -mr-2"
      >
        {sessions.map((session) => (
          <motion.div
            key={session.id}
            variants={emergeAnimation}
            initial="initial"
            animate="enter"
            exit="exit"
            layout
            onClick={() => onSelectChat(session.id!)}
            className="p-3 shape-chamfer cursor-pointer relative group"
            style={{
              background: activeId === session.id
                ? 'var(--gradient-accent)'
                : 'var(--gradient-surface-interactive)',
            }}
            whileHover={{ scale: 1.03 }}
          >
            <p className="font-semibold truncate text-gradient" style={{ backgroundImage: 'var(--gradient-text-primary)' }}>
              {session.title}
            </p>
            <p className="text-xs truncate text-gradient" style={{ backgroundImage: 'var(--gradient-text-secondary)' }}>
              {new Date(session.updatedAt).toLocaleString()}
            </p>
            <motion.button
              onClick={(e) => handleDelete(e, session.id!)}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 touch-target-48"
              whileHover={{ scale: 1.2, color: 'rgb(var(--color-accent-red))' }}
              aria-label="Delete chat"
            >
              <Trash2 size={16} />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.aside>
  );
}