"use client";

import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '@/lib/db';
import { ChatHistorySidebar } from './chat/chat-history-sidebar';
import { ChatView } from './chat/chat-view';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useStore } from '@/hooks/use-store';
import { ChatSession } from '@/lib/types';

export function MainChatInterface() {
  const { activeChatId, setActiveChatId, loadModelsFromDB, fetchAndSetModels } = useStore();
  
  // Reactively get all chat sessions from IndexedDB, sorted by update time
  const chatSessions = useLiveQuery(
    () => db.chats.orderBy('updatedAt').reverse().toArray(),
    []
  );

  // Load models on initial mount
  useEffect(() => {
    loadModelsFromDB().then(() => {
      // Optionally fetch in the background to get the latest models
      fetchAndSetModels();
    });
  }, [loadModelsFromDB, fetchAndSetModels]);

  const activeChat = chatSessions?.find(c => c.id === activeChatId) as ChatSession | undefined;

  const handleCreateNewChat = async () => {
    const newChat: ChatSession = {
      title: 'New Conversation',
      modelId: 'deepseek/deepseek-chat', // Default as requested
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
      config: {
        systemPrompt: '',
        maxTokens: 4096,
      },
    };
    const newId = await db.chats.add(newChat);
    setActiveChatId(newId);
  };

  return (
    <div className="flex h-full w-full">
      <ChatHistorySidebar
        sessions={chatSessions || []}
        activeId={activeChatId}
        onSelectChat={setActiveChatId}
        onCreateNew={handleCreateNewChat}
      />
      <motion.main
        key={activeChatId || 'welcome'}
        className="flex-1 flex flex-col h-full overflow-hidden"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {activeChat ? (
          <ChatView chatSession={activeChat} />
        ) : (
          <WelcomeScreen onCreateNew={handleCreateNewChat} />
        )}
      </motion.main>
    </div>
  );
}

// A placeholder for when no chat is selected
function WelcomeScreen({ onCreateNew }: { onCreateNew: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full p-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, type: 'spring' }}
      >
        <h1 className="text-4xl font-bold text-gradient" style={{ backgroundImage: 'var(--gradient-text-accent)' }}>
          OpenBot9000
        </h1>
        <p className="mt-4 max-w-md text-gradient" style={{ backgroundImage: 'var(--gradient-text-secondary)' }}>
          Your premium, professional, and immersive chat interface for OpenRouter.
        </p>
        <motion.button
          onClick={onCreateNew}
          className="mt-8 px-8 py-4 shape-chamfer font-semibold text-lg"
          style={{ background: 'var(--gradient-action)', color: 'white' }}
          whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          Start New Chat
        </motion.button>
      </motion.div>
    </div>
  );
}