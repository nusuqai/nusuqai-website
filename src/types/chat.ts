// types/chat.ts
export interface ChatConfig {
  title: string;
  subtitle?: string;
  storeUrl?: string;
  icon: any;
  primaryColor: string;
  accentColor: string;
  suggestions: PromptSuggestion[];
  welcomeMessage: string;
  placeholder: string;
}

export interface PromptSuggestion {
  icon: any;
  title: string;
  prompt: string;
}

export interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
  file?: {
    name: string;
    size: number;
    type: string;
  };
}