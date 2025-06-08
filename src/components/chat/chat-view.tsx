"use client";

import { ChatSession } from "@/lib/types";
import { ChatInput } from "./chat-input";
import { MessageList } from "./message-list";
import { ChatHeader } from "./chat-header";
import { useChat } from "@/hooks/use-chat";

interface ChatViewProps {
  chatSession: ChatSession;
}

export function ChatView({ chatSession }: ChatViewProps) {
  const { messages, append, interrupt, isGenerating, setMessages } = useChat(chatSession);
  
  return (
    <div className="flex flex-col h-full w-full">
      <ChatHeader session={chatSession} />
      <MessageList messages={messages} />
      <div className="px-4 pb-4">
        <ChatInput
          onSend={append}
          onInterrupt={interrupt}
          isGenerating={isGenerating}
        />
      </div>
    </div>
  );
}