"use client";

import { useState, useEffect, useCallback } from 'react';

const API_KEY_STORAGE_KEY = 'openrouter_api_key';

export function useApiKey() {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      setApiKey(storedKey);
    } catch (error) {
      console.error("Could not access localStorage:", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  const saveApiKey = useCallback((key: string) => {
    try {
      localStorage.setItem(API_KEY_STORAGE_KEY, key);
      setApiKey(key);
    } catch (error) {
      console.error("Could not save to localStorage:", error);
    }
  }, []);

  const clearApiKey = useCallback(() => {
    try {
      localStorage.removeItem(API_KEY_STORAGE_KEY);
      setApiKey(null);
    } catch (error) {
      console.error("Could not clear localStorage:", error);
    }
  }, []);

  return { apiKey, saveApiKey, clearApiKey, isLoaded };
}