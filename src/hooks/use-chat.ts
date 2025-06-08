"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { ChatSession, Message } from "@/lib/types";
import { db } from "@/lib/db";
import { v4 as uuidv4 } from 'uuid'; // Use uuid for unique message keys

// Note: `uuid` would need to be installed: `npm install uuid @types/uuid`
// For simplicity, I'll add a simple polyfill if not installed.
const getUUID = () => (typeof uuidv4 === 'function' ? uuidv4() : Date.now().toString());

export function useChat(initialSession: ChatSession) {
  const [messages, setMessages] = useState<Message[]>(initialSession.messages);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const sessionId = initialSession.id!;

  // Sync state if the underlying session changes
  useEffect(() => {
    setMessages(initialSession.messages);
  }, [initialSession]);

  const updateSessionInDB = useCallback(async (updatedMessages: Message[], title?: string) => {
    const updateData: Partial<ChatSession> = {
      messages: updatedMessages,
      updatedAt: new Date(),
    };
    if (title) {
      updateData.title = title;
    }
    await db.chats.update(sessionId, updateData);
  }, [sessionId]);

  const interrupt = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsGenerating(false);
      setMessages(prev => prev.map(m => m.status === 'streaming' ? { ...m, status: 'interrupted' } : m));
    }
  }, []);

  const append = useCallback(async (content: string) => {
    if (isGenerating) return;

    setIsGenerating(true);
    abortControllerRef.current = new AbortController();

    const userMessage: Message = { id: getUUID(), role: 'user', content, status: 'complete' };
    const assistantMessage: Message = { id: getUUID(), role: 'assistant', content: '', reasoning: '', status: 'streaming' };

    const newMessages = [...messages, userMessage, assistantMessage];
    setMessages(newMessages);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortControllerRef.current.signal,
        body: JSON.stringify({
          messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })), // Send history
          config: initialSession.config,
          model: initialSession.modelId,
          // API key is fetched from localStorage on each request.
          // For more complex scenarios, consider managing this via React Context or a dedicated state manager.
          apiKey: localStorage.getItem('openrouter_api_key'),
        }),
      });

      if (!response.body) throw new Error("Response has no body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let finalContent = "";
      let finalReasoning = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        // Current streaming protocol assumes simple "R:" for reasoning and "D:" for data prefixes.
        // This is fragile. For robust production systems, consider using Server-Sent Events (SSE)
        // or Newline Delimited JSON (NDJSON), where each line is a self-contained JSON object
        // indicating the type and payload of the message.
        const lines = chunk.split('\n').filter(line => line.trim() !== '');
        
        for (const line of lines) {
           if (line.startsWith('R:')) {
            finalReasoning += line.substring(2);
           } else if (line.startsWith('D:')) {
            finalContent += line.substring(2);
           } else {
             finalContent += line;
           }

          setMessages(prev => prev.map(m =>
            m.id === assistantMessage.id ? { ...m, content: finalContent, reasoning: finalReasoning, status: 'streaming' } : m
          ));
        }
      }
      
      const finalMessages = newMessages.map(m =>
        m.id === assistantMessage.id ? { ...m, content: finalContent, reasoning: finalReasoning, status: 'complete' } as Message : m
      );
      setMessages(finalMessages);
      await updateSessionInDB(finalMessages);

    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log("Stream generation aborted.");
        const finalMessages = messages.map(m => m.id === assistantMessage.id ? {...m, status: 'interrupted'} as Message : m);
        await updateSessionInDB(finalMessages);
      } else {
        console.error("Streaming error:", error);
        setMessages(prev => prev.map(m =>
          m.id === assistantMessage.id ? { ...m, content: `Error: ${error.message}`, status: 'error' } : m
        ));
      }
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  }, [messages, isGenerating, initialSession, updateSessionInDB]);

  return { messages, setMessages, append, interrupt, isGenerating };
}