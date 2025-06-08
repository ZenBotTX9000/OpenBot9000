"use client";

// 1. TECH STACK
// Core: Next.js 15 | State: Client-side Hooks | Fixing: Path Alias Resolution

// 2. THE FIX: Using an absolute path alias for robustness.
// The previous relative path was incorrect for the build environment.
import { ApiKeyModal } from "@/components/auth/api-key-modal";
import { useApiKey } from "@/hooks/use-api-key";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// This provider ensures that the app has a valid API key before rendering the main UI.
// It also handles the initial "hydration flicker" by waiting for client-side state.
export function AppProvider({ children }: { children: React.ReactNode }) {
  const { apiKey, isLoaded } = useApiKey();
  const [isClient, setIsClient] = useState(false);

  // Wait until the component has mounted on the client to avoid hydration mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient || !isLoaded) {
    // Render a blank screen or a subtle loader to prevent flicker while loading the API key from localStorage
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

// 3. FUTURE-PROOFING NOTE
/*
Why this scales:
 - The `@/` alias points to the project's root (`src/` or `./`).
 - If we move this provider file, the import path to `components` does NOT break.
 - This avoids confusing relative paths like `../../components/etc`.
*/
