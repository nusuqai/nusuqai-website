// types/chat.ts
import { LucideIcon } from 'lucide-react';
import { ComponentType } from 'react';

export interface ChatConfig {
  title: string;
  subtitle?: string;
  storeUrl?: string;
  icon: LucideIcon | string;
  primaryColor: string;
  accentColor: string;
  suggestions: Array<{ title: string; prompt: string; icon?: LucideIcon | string }>;
  welcomeMessage: string;
  placeholder: string;
}

export interface PromptSuggestion {
  icon: ComponentType<{ className?: string }> | string;
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