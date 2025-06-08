"use client";

import { ApiKeyModal } from "../components/auth/api-key-modal";
import { useApiKey } from "../hooks/use-api-key";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const { apiKey, isLoaded } = useApiKey();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoaded) {
    return <div className="w-full h-screen" style={{ background: 'var(--gradient-bg)' }} />;
  }

  return (
    <AnimatePresence mode="wait">
      {apiKey ? (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div key="modal">
          <ApiKeyModal />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
