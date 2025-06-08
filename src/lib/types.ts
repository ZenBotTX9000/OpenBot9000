export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
}

export interface ModelCapability {
  canReason: boolean;
  tokenLimit: number;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  reasoning?: string;
  status: 'streaming' | 'complete' | 'error' | 'interrupted';
}

export interface ChatConfig {
  systemPrompt: string;
  maxTokens: number;
  maxReasoningTokens?: number;
}

export interface ChatSession {
  id?: number;
  title: string;
  modelId: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
  config: ChatConfig;
}