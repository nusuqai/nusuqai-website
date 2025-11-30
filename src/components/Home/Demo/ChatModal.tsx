"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  Sparkles,
  Package,
  Search,
  ShoppingCart,
  Store,
  CopyPlus,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { sendChatMessage } from "@/app/actions/chat";

// --- Types ---
interface Message {
  id: number;
  type: "bot" | "user";
  text: string;
  timestamp: Date;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface PromptSuggestion {
  icon: any;
  title: string;
  prompt: string;
}

// --- Configuration ---
const PROMPT_SUGGESTIONS: PromptSuggestion[] = [
  {
    icon: Package,
    title: "Browse Products",
    prompt: "Show me all available products",
  },
  { icon: Search, title: "Search Items", prompt: "Search for electronics" },
  {
    icon: ShoppingCart,
    title: "Check Inventory",
    prompt: "What products are in stock?",
  },
  {
    icon: Package,
    title: "Product Details",
    prompt: "Tell me about product ID 12345",
  },
];

export function ChatModal({ isOpen, onClose }: ChatModalProps) {
  // --- State ---
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "Hello. I'm connected to your Salla store. How can I assist you today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // --- Handlers ---
  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const result = await sendChatMessage(inputValue);

      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: result.success
          ? result.data?.response ||
            result.data?.message ||
            "Request processed."
          : "I couldn't complete that request.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          text: "Connection error. Please check your network.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (prompt: string) => {
    setInputValue(prompt);
    inputRef.current?.focus();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // --- Sub-Components ---

  // 1. Desktop Sidebar Suggestion
  const DesktopSuggestion = ({ item }: { item: PromptSuggestion }) => (
    <button
      onClick={() => handleSuggestionClick(item.prompt)}
      className="w-full text-left group p-3 rounded-lg border border-gray-100 hover:border-[#0F1E3D]/30 hover:bg-gray-50 transition-all duration-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-100 rounded-md text-gray-600 group-hover:text-[#0F1E3D] transition-colors">
            <item.icon size={16} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-500 truncate max-w-[120px] opacity-70">
              Click to draft
            </p>
          </div>
        </div>
        <CopyPlus
          size={14}
          className="text-gray-300 group-hover:text-[#0F1E3D] transition-colors"
        />
      </div>
    </button>
  );

  // 2. Mobile Slider Chip
  const MobileSuggestionChip = ({ item }: { item: PromptSuggestion }) => (
    <button
      onClick={() => handleSuggestionClick(item.prompt)}
      className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full active:scale-95 transition-transform active:bg-gray-200"
    >
      <item.icon size={12} className="text-[#0F1E3D]" />
      <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">
        {item.title}
      </span>
    </button>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            // LAYOUT UPDATE: Increased desktop size (w-[1100px], h-[85vh])
            className="fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl
              w-[92vw] h-[80vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl
              sm:w-[1100px] sm:h-[85vh] sm:max-h-[800px]"
          >
            {/* --- Header --- */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
                {/* Desktop Toggle Sidebar Button */}
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="hidden md:flex p-2 hover:bg-gray-100 rounded-lg text-gray-500 transition-colors mr-1"
                  title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
                >
                  {isSidebarOpen ? (
                    <PanelLeftClose size={18} />
                  ) : (
                    <PanelLeftOpen size={18} />
                  )}
                </button>

                <div className="w-9 h-9 bg-[#0F1E3D] rounded-lg flex items-center justify-center text-white shadow-md">
                  <Store size={18} />
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    Salla Ecommerce Store Assistant
                  </h2>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                        Online
                      </span>
                    </div>
                    {/* Store Link */}
                    <a
                      href="https://demostore.salla.sa/dev-v6b9z71d8gnepyop"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex items-center gap-1 text-[10px] sm:text-xs text-[#0F1E3D] hover:underline opacity-80 hover:opacity-100 transition-opacity"
                    >
                      <span>Visit Store</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden relative">
              {/* --- Desktop Sidebar (Retractable) --- */}
              <motion.div
                initial={{ width: 288, opacity: 1 }}
                animate={{
                  width: isSidebarOpen ? 288 : 0,
                  opacity: isSidebarOpen ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="hidden md:flex bg-white border-r border-gray-100 flex-col overflow-hidden whitespace-nowrap"
              >
                <div className="p-4 w-72">
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <Sparkles size={12} />
                    <span>Quick Drafts</span>
                  </div>
                  <div className="flex flex-col space-y-3">
                    {PROMPT_SUGGESTIONS.map((s, i) => (
                      <DesktopSuggestion key={i} item={s} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* --- Main Chat Area --- */}
              <div className="flex-1 flex flex-col bg-gray-50/50 relative min-w-0">
                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 scroll-smooth">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.type === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] space-y-1 ${
                          message.type === "user" ? "items-end" : "items-start"
                        } flex flex-col`}
                      >
                        <div
                          className={`px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed shadow-sm ${
                            message.type === "user"
                              ? "bg-[#0F1E3D] text-white rounded-2xl rounded-tr-sm"
                              : "bg-white text-gray-800 border border-gray-200/60 rounded-2xl rounded-tl-sm"
                          }`}
                        >
                          {message.text}
                        </div>
                        <span className="text-[10px] text-gray-400 px-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing Indicator */}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white border border-gray-200/60 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                        <div className="flex gap-1">
                          {[0, 1, 2].map((dot) => (
                            <div
                              key={dot}
                              className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: `${dot * 0.15}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* --- Input & Mobile Tips Area --- */}
                <div className="bg-white border-t border-gray-200 p-3 sm:p-5 flex-shrink-0">
                  {/* Mobile Suggestions Slider (Horizontal Scroll) */}
                  <div className="md:hidden flex gap-2 overflow-x-auto pb-3 -mx-3 px-3 scrollbar-hide snap-x">
                    {PROMPT_SUGGESTIONS.map((s, i) => (
                      <MobileSuggestionChip key={i} item={s} />
                    ))}
                  </div>

                  {/* Input Field */}
                  <div className="relative flex items-start gap-2">
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask about orders, inventory..."
                      className="flex-1 bg-gray-100 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F1E3D]/10 focus:bg-white transition-all border-transparent border focus:border-[#0F1E3D]/20 resize-none max-h-32 overflow-y-auto"
                      style={{ minHeight: "48px", height: "auto" }}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!inputValue.trim() || isTyping}
                      className="p-3.5 bg-[#0F1E3D] text-white rounded-xl hover:bg-[#1a2d4d] active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-md flex-shrink-0"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
