import { create } from 'zustand';
import { OpenRouterModel, ChatSession } from '@/lib/types';
import { db } from '@/lib/db';

interface AppState {
  models: OpenRouterModel[];
  activeChatId: number | null;
  setActiveChatId: (id: number | null) => void;
  fetchAndSetModels: () => Promise<void>;
  loadModelsFromDB: () => Promise<void>;
}

export const useStore = create<AppState>((set, get) => ({
  models: [],
  activeChatId: null,
  
  setActiveChatId: (id) => set({ activeChatId: id }),

  fetchAndSetModels: async () => {
    try {
      // In a real app, this would be a fetch to an API route that calls OpenRouter
      // For this example, we'll use a mock fetch.
      const response = await fetch('https://openrouter.ai/api/v1/models');
      if (!response.ok) throw new Error("Failed to fetch models");
      const data = await response.json();
      
      const models = data.data as OpenRouterModel[];
      
      await db.models.bulkPut(models); // Store in IndexedDB
      set({ models });
      console.log("Models updated from API and saved to DB.");
    } catch (error) {
      console.error("Error fetching models:", error);
      // Try to load from DB as a fallback
      get().loadModelsFromDB();
    }
  },

  loadModelsFromDB: async () => {
    const models = await db.models.toArray();
    if (models.length > 0) {
      set({ models });
      console.log("Models loaded from DB.");
    }
  },
}));