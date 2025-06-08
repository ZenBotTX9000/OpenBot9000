// 1. TECH STACK
// Core: Next.js 15 | VCS: Git | CI/CD: Vercel

"use client";

// 2. THE FIX: Using the absolute path alias `@/`.
// This is the code that must be committed to your repository.
import { ApiKeyModal } from "@/components/auth/api-key-modal";
import { useApiKey } from "@/hooks/use-api-key";
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
        <motion.div key="app" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
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

// 3. FUTURE-PROOFING NOTE / CI/CD DIAGNOSIS
/*
Why the build failed again:
 - Vercel builds from your GitHub repository directly.
 - The commit hash `0ec5469` confirms it pulled the old code.
 - A new `git commit` and `git push` are required to update the source
   for the next build. This is the core of automated deployment.
*/