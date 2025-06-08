import Dexie, { type Table } from 'dexie';
import type { ChatSession, OpenRouterModel } from './types';

export class OpenBotDB extends Dexie {
  chats!: Table<ChatSession>;
  models!: Table<OpenRouterModel>;

  constructor() {
    super('OpenBot9000DB');
    this.version(1).stores({
      chats: '++id, title, modelId, createdAt, updatedAt',
      models: '&id', // The '&' makes 'id' the primary key
    });
  }
}

// Export a singleton instance of the database
export const db = new OpenBotDB();