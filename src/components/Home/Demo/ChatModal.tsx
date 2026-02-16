"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Send,
  Sparkles,
  CopyPlus,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
  Paperclip,
  FileSpreadsheet,
  FileText,
  File,
  ShoppingCart,
  Package,
  LogIn,
  LogOut,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChatConfig, Message, ToolResult } from "@/types/chat";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  sendChatMessage: (msg: string, sessionId?: string, file?: File) => Promise<any>;
  config: ChatConfig;
  enableFileUpload?: boolean;
  requiresAuth?: boolean;
  isAuthenticated?: boolean;
  isAuthLoading?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

const ACCEPTED_FILE_TYPES = [
  '.csv',
  '.xls',
  '.xlsx',
  '.pdf',
  '.docx',
  'text/csv',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Product Card Component
function ProductCard({ product, onAddToCart }: { product: any; onAddToCart?: (title: string) => void }) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product.title);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      {product.featuredImage && (
        <div className="relative w-full h-48 bg-gray-100 flex-shrink-0">
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
          {product.title}
        </h3>
        {product.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>
        )}
        
        {/* Spacer to push bottom content down */}
        <div className="flex-1"></div>
        
        {/* Bottom section - always at the bottom */}
        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-gray-900">
              {product.priceRange?.minVariantPrice?.amount} {product.priceRange?.minVariantPrice?.currencyCode}
            </div>
            {product.storeUrl && (
              <a
                href={product.storeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View
                <ExternalLink size={14} />
              </a>
            )}
          </div>
          
          {product.availableForSale !== undefined && (
            <div className={`text-xs font-medium ${product.availableForSale ? 'text-green-600' : 'text-red-600'}`}>
              {product.availableForSale ? '✓ In Stock' : '✗ Out of Stock'}
            </div>
          )}
          
          {onAddToCart && product.availableForSale !== false && (
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium active:scale-95"
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// Cart Display Component
function CartDisplay({ cart }: { cart: any }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingCart size={18} className="text-gray-600" />
        <h3 className="font-semibold text-gray-900">Shopping Cart</h3>
      </div>
      
      {cart.lines?.edges && cart.lines.edges.length > 0 ? (
        <div className="space-y-3 mb-4">
          {cart.lines.edges.map((edge: any, idx: number) => {
            const merchandise = edge.node.merchandise;
            const product = merchandise?.product;
            const imageUrl = product?.images?.edges?.[0]?.node?.url || 
                           product?.featuredImage?.url || 
                           merchandise?.image?.url;
            
            return (
              <div key={idx} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                {imageUrl && (
                  <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={imageUrl} 
                      alt={product?.title || merchandise?.title || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm mb-1">
                    {product?.title || merchandise?.title || "Product"}
                  </p>
                  {merchandise?.title && merchandise.title !== product?.title && (
                    <p className="text-xs text-gray-500 mb-1">{merchandise.title}</p>
                  )}
                  <p className="text-xs text-gray-600">
                    Qty: {edge.node.quantity} × {merchandise?.priceV2?.amount} {merchandise?.priceV2?.currencyCode}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-gray-500 mb-4">Cart is empty</p>
      )}

      {cart.cost?.totalAmount && (
        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-900">Total:</span>
            <span className="text-lg font-bold text-gray-900">
              {cart.cost.totalAmount.amount} {cart.cost.totalAmount.currencyCode}
            </span>
          </div>
        </div>
      )}

      {cart.checkoutUrl && (
        <a
          href={cart.checkoutUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Proceed to Checkout
          <ExternalLink size={14} />
        </a>
      )}
    </div>
  );
}

// Tool Results Renderer
function ToolResultsDisplay({ toolResults, onAddToCart }: { toolResults: ToolResult[]; onAddToCart?: (title: string) => void }) {
  if (!toolResults || toolResults.length === 0) return null;

  // Check if there are any cart operations in the results
  const hasCartOperation = toolResults.some(result => 
    result.toolName === 'create_cart' || 
    result.toolName === 'add_to_cart' || 
    result.toolName === 'get_cart' ||
    result.toolName === 'update_cart_lines'
  );

  // If there's a cart operation, ONLY show cart-related results
  if (hasCartOperation) {
    return (
      <div className="space-y-4">
        {toolResults
          .filter(result => 
            result.toolName === 'create_cart' || 
            result.toolName === 'add_to_cart' || 
            result.toolName === 'get_cart' ||
            result.toolName === 'update_cart_lines'
          )
          .map((result, idx) => {
            const cart = result.data.cart || result.data;
            return (
              <div key={idx} className="max-w-md">
                <CartDisplay cart={cart} />
              </div>
            );
          })}
      </div>
    );
  }

  // Otherwise, show all results normally
  return (
    <div className="space-y-4">
      {toolResults.map((result, idx) => {
        // Handle different tool types
        if (result.toolName === 'get_all_products' || 
            result.toolName === 'search_products' || 
            result.toolName === 'filter_products_by_price' ||
            result.toolName === 'filter_products_by_category' ||
            result.toolName === 'filter_products_by_color') {
          
          const products = result.data.products || [];
          
          if (products.length === 0) {
            return (
              <div key={idx} className="text-sm text-gray-500 italic">
                No products found.
              </div>
            );
          }

          return (
            <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
              {products.map((product: any, pIdx: number) => (
                <ProductCard key={pIdx} product={product} onAddToCart={onAddToCart} />
              ))}
            </div>
          );
        }

        if (result.toolName === 'get_product' || result.toolName === 'get_product_variants') {
          const product = result.data;
          return (
            <div key={idx} className="max-w-md">
              <ProductCard product={product} onAddToCart={onAddToCart} />
            </div>
          );
        }

        // For other tool results, just show a simple info box
        return (
          <div key={idx} className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Package size={16} />
              <span className="font-medium">{result.toolName}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ChatModal({ isOpen, onClose, sendChatMessage, config, enableFileUpload = false, requiresAuth = false, isAuthenticated = true, isAuthLoading = false, onLogin, onLogout }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: config.welcomeMessage,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // Reset messages and session when config changes or modal opens
  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          id: 1,
          type: "bot",
          text: config.welcomeMessage,
          timestamp: new Date(),
        },
      ]);
      setSessionId(undefined);
    }
  }, [config, isOpen]);

  // --- File Handling ---
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert(`File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
      return;
    }

    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    if (!ACCEPTED_FILE_TYPES.some(type => type === fileExtension || type === file.type)) {
      alert('Please upload a supported file type: CSV, Excel, PDF, or Word document');
      return;
    }

    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'csv' || ext === 'xls' || ext === 'xlsx') {
      return FileSpreadsheet;
    } else if (ext === 'pdf' || ext === 'docx') {
      return FileText;
    }
    return File;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // --- Handlers ---
  const handleSend = async (messageOverride?: string) => {
    const messageToSend = messageOverride || inputValue;
    
    if ((!messageToSend.trim() && !selectedFile) || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      text: messageToSend || (selectedFile ? `Uploaded file: ${selectedFile.name}` : ''),
      timestamp: new Date(),
      file: selectedFile ? {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      } : undefined
    };

    setMessages((prev) => [...prev, userMessage]);
    const fileToSend = selectedFile || undefined;
    
    setInputValue("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsTyping(true);

    try {
      const result = await sendChatMessage(messageToSend, sessionId, fileToSend);

      if (result.sessionId) {
        setSessionId(result.sessionId);
      }

      const botMessage: Message = {
        id: Date.now() + 1,
        type: "bot",
        text: result.success
          ? result.data?.response || result.data?.message || "Request processed."
          : "I couldn't complete that request.",
        timestamp: new Date(),
        toolResults: result.data?.toolResults || [],
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
    if (e.key === "Enter" && !e.shiftKey && !isTyping) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAddToCart = (productTitle: string) => {
    const prompt = `Add "${productTitle}" to the cart`;
    // Send the message immediately
    handleSend(prompt);
  };

  // --- Sub-Components ---
  const DesktopSuggestion = ({ item }: { item: any }) => (
    <button
      onClick={() => handleSuggestionClick(item.prompt)}
      className="w-full text-left group p-3 rounded-lg border border-gray-100 hover:border-opacity-30 hover:bg-gray-50 transition-all duration-200"
      style={{ 
        borderColor: `${config.primaryColor}20`,
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="p-2 rounded-md text-gray-600 transition-colors"
            style={{ 
              backgroundColor: `${config.primaryColor}10`,
            }}
          >
            {typeof item.icon === 'string' ? (
              item.icon
            ) : (
              (() => {
                const Icon = item.icon;
                return <Icon size={16} />;
              })()
            )}
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
          className="text-gray-300 transition-colors"
          style={{ 
            color: `${config.primaryColor}40`,
          }}
        />
      </div>
    </button>
  );

  const MobileSuggestionChip = ({ item }: { item: any }) => (
    <button
      onClick={() => handleSuggestionClick(item.prompt)}
      className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-full active:scale-95 transition-transform active:bg-gray-200"
    >
      {typeof item.icon === 'string' ? (
        item.icon
      ) : (
        (() => {
          const Icon = item.icon;
          return <Icon size={12} style={{ color: config.primaryColor }} />;
        })()
      )}
      <span className="text-[11px] font-medium text-gray-700 whitespace-nowrap">
        {item.title}
      </span>
    </button>
  );

  const IconComponent = config.icon;

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
            dir="ltr"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed z-50 flex flex-col overflow-hidden bg-white shadow-2xl
              w-[92vw] h-[80vh] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl
              sm:w-[1100px] sm:h-[85vh] sm:max-h-[800px]"
          >
            {/* --- Header --- */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-gray-100 bg-white flex-shrink-0">
              <div className="flex items-center gap-3">
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

                <div 
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: config.primaryColor }}
                >
                  {typeof IconComponent === 'string' ? (
                    IconComponent
                  ) : (
                    <IconComponent size={18} />
                  )}
                </div>

                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                    {config.title}
                  </h2>
                  <div className="flex items-center gap-3 mt-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 font-medium">
                        {config.subtitle}
                      </span>
                    </div>
                    {config.storeUrl && (
                      <a
                        href={config.storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-1 text-[10px] sm:text-xs hover:underline opacity-80 hover:opacity-100 transition-opacity"
                        style={{ color: config.primaryColor }}
                      >
                        <span>Visit Store</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {requiresAuth && isAuthenticated && onLogout && (
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Disconnect Salla"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">Disconnect</span>
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Auth Prompt Screen */}
            {requiresAuth && !isAuthenticated ? (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  {isAuthLoading ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center animate-pulse" style={{ backgroundColor: `${config.primaryColor}15` }}>
                        <div className="w-8 h-8 border-2 border-gray-300 border-t-current rounded-full animate-spin" style={{ borderTopColor: config.primaryColor }} />
                      </div>
                      <p className="text-gray-500 text-sm">Checking authentication...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${config.primaryColor}10` }}>
                        <LogIn size={32} style={{ color: config.primaryColor }} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Connect to Salla</h3>
                      <p className="text-sm text-gray-500 mb-8 leading-relaxed">
                        To use this assistant, please authorize access to your Salla store. This connection expires every 2 weeks.
                      </p>
                      <button
                        onClick={onLogin}
                        className="inline-flex items-center gap-2 px-6 py-3 text-white rounded-xl font-medium text-sm shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                        style={{ backgroundColor: config.primaryColor }}
                      >
                        <LogIn size={18} />
                        Authorize with Salla
                      </button>
                      <p className="text-xs text-gray-400 mt-4">
                        You&apos;ll be redirected to Salla to grant access
                      </p>
                    </>
                  )}
                </div>
              </div>
            ) : (

            <div className="flex flex-1 overflow-hidden relative">
              {/* --- Desktop Sidebar --- */}
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

                  <div className="flex flex-col gap-2">
                    {config.suggestions.map((item, idx) => (
                      <DesktopSuggestion key={idx} item={item} />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* --- Main Chat Area --- */}
              <div className="flex-1 flex flex-col bg-gray-50/50 relative min-w-0">
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
                        className={`max-w-[90%] sm:max-w-[75%] space-y-3 ${
                          message.type === "user"
                            ? "items-end"
                            : "items-start"
                        } flex flex-col`}
                      >
                        {/* Text Message */}
                        <div
                          className={`px-4 py-3 text-[15px] leading-relaxed shadow-sm w-full overflow-hidden ${
                            message.type === "user"
                              ? "text-white rounded-2xl rounded-tr-sm"
                              : "bg-white text-gray-900 border border-gray-200/60 rounded-2xl rounded-tl-sm"
                          }`}
                          style={
                            message.type === "user"
                              ? { backgroundColor: config.primaryColor }
                              : {}
                          }
                        >
                          {message.file && (
                            <div className={`mb-2 flex items-center gap-2 p-2 rounded-lg ${
                              message.type === "user" ? "bg-white/10" : "bg-gray-50"
                            }`}>
                              {(() => {
                                const Icon = getFileIcon(message.file.name);
                                return <Icon size={16} className={message.type === "user" ? "text-white" : "text-gray-600"} />;
                              })()}
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-medium truncate ${
                                  message.type === "user" ? "text-white" : "text-gray-700"
                                }`}>
                                  {message.file.name}
                                </p>
                                <p className={`text-[10px] ${
                                  message.type === "user" ? "text-white/70" : "text-gray-500"
                                }`}>
                                  {formatFileSize(message.file.size)}
                                </p>
                              </div>
                            </div>
                          )}

                          {message.type === "user" ? (
                            <div className="whitespace-pre-wrap">
                              {message.text}
                            </div>
                          ) : (
                            <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-2 prose-li:my-0.5 text-inherit dark:prose-invert break-words">
                              <ReactMarkdown
                                components={{
                                  p: ({ children }) => (
                                    <p dir="auto" className="m-0 mb-2 last:mb-0">
                                      {children}
                                    </p>
                                  ),
                                  h1: ({ children }) => (
                                    <h1 dir="auto" className="text-lg font-bold mb-2">
                                      {children}
                                    </h1>
                                  ),
                                  h2: ({ children }) => (
                                    <h2 dir="auto" className="text-base font-bold mb-2">
                                      {children}
                                    </h2>
                                  ),
                                  h3: ({ children }) => (
                                    <h3 dir="auto" className="text-sm font-bold mb-1">
                                      {children}
                                    </h3>
                                  ),
                                  img: ({ src, alt }) => {
                                    // Don't render images if we have tool results with products/carts
                                    const hasProductsOrCart = message.toolResults?.some(result =>
                                      result.toolName === 'get_all_products' ||
                                      result.toolName === 'search_products' ||
                                      result.toolName === 'filter_products_by_price' ||
                                      result.toolName === 'filter_products_by_category' ||
                                      result.toolName === 'filter_products_by_color' ||
                                      result.toolName === 'get_product' ||
                                      result.toolName === 'get_product_variants' ||
                                      result.toolName === 'create_cart' ||
                                      result.toolName === 'add_to_cart' ||
                                      result.toolName === 'get_cart' ||
                                      result.toolName === 'update_cart_lines'
                                    );
                                    
                                    if (hasProductsOrCart) {
                                      return null; // Don't render markdown images
                                    }
                                    
                                    return (
                                      <div className="relative w-full my-3 overflow-hidden rounded-xl border border-gray-100 shadow-sm bg-gray-50">
                                        <img
                                          src={src || ""}
                                          alt={alt || "Product Image"}
                                          className="w-full h-auto max-h-[300px] object-cover object-center block m-0"
                                          loading="lazy"
                                        />
                                      </div>
                                    );
                                  },
                                  ul: ({ children }) => (
                                    <ul
                                      dir="auto"
                                      className="list-disc list-inside space-y-1 my-2 ps-2"
                                    >
                                      {children}
                                    </ul>
                                  ),
                                  ol: ({ children }) => (
                                    <ol
                                      dir="auto"
                                      className="list-decimal list-inside space-y-1 my-2 ps-2"
                                    >
                                      {children}
                                    </ol>
                                  ),
                                  li: ({ children }) => (
                                    <li className="marker:text-gray-400 text-inherit">
                                      {children}
                                    </li>
                                  ),
                                  a: ({ href, children }) => (
                                    <a
                                      href={href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-baseline gap-1 font-medium text-blue-600 hover:text-blue-700 hover:underline decoration-blue-300 underline-offset-2 transition-colors"
                                      dir="auto"
                                    >
                                      <span>{children}</span>
                                      <ExternalLink
                                        size={12}
                                        strokeWidth={2.5}
                                        className="opacity-60 self-center"
                                      />
                                    </a>
                                  ),
                                  code: ({ children }) => (
                                    <code className="px-1.5 py-0.5 rounded-md bg-gray-100 text-gray-800 text-xs font-mono border border-gray-200">
                                      {children}
                                    </code>
                                  ),
                                }}
                              >
                                {message.text}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>

                        {/* Tool Results */}
                        {message.toolResults && message.toolResults.length > 0 && (
                          <div className="w-full">
                            <ToolResultsDisplay toolResults={message.toolResults} onAddToCart={handleAddToCart} />
                          </div>
                        )}

                        <span className="text-[10px] text-gray-400 px-1">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </motion.div>
                  ))}

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

                {/* --- Input Area --- */}
                <div className="bg-white border-t border-gray-100 p-3 sm:p-4 flex-shrink-0">
                  <div className="md:hidden flex gap-2 overflow-x-auto pb-3 -mx-3 px-3 scrollbar-hide snap-x">
                    {config.suggestions.map((item, idx) => (
                      <MobileSuggestionChip key={idx} item={item} />
                    ))}
                  </div>

                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {(() => {
                            const Icon = getFileIcon(selectedFile.name);
                            return <Icon size={20} className="text-gray-600 flex-shrink-0" />;
                          })()}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={removeFile}
                          className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        >
                          <X size={16} className="text-gray-500" />
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <div className="relative flex items-start gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={ACCEPTED_FILE_TYPES.join(',')}
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                    {enableFileUpload && (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 flex-shrink-0"
                        title="Attach file"
                      >
                        <Paperclip size={18} />
                      </button>
                    )}
                    <textarea
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder={config.placeholder}
                      className="flex-1 bg-gray-50 text-gray-900 placeholder-gray-400 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all border border-gray-200 resize-none max-h-32 overflow-y-auto"
                      style={{
                        minHeight: "42px",
                        height: "auto",
                      }}
                    />
                    <button
                      onClick={() => handleSend()}
                      disabled={(!inputValue.trim() && !selectedFile) || isTyping}
                    >
                      <Send size={18} />
                    </button>

                  </div>
                </div>
              </div>
            </div>

            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}