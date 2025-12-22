// types/chat.ts

export interface ToolResult {
  toolName: string;
  data: any;
}

export interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  timestamp: Date;
  file?: {
    name: string;
    size: number;
    type: string;
  };
  toolResults?: ToolResult[];
}

export interface ChatSuggestion {
  title: string;
  icon: React.ComponentType<{ size?: number }> | string;
  prompt: string;
}

export interface ChatConfig {
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ size?: number }> | string;
  primaryColor: string;
  accentColor: string;
  welcomeMessage: string;
  placeholder: string;
  suggestions: ChatSuggestion[];
  storeUrl?: string;
}