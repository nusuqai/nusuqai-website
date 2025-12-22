// config/chatConfigs.ts
import { Package, Search, ShoppingCart, CirclePlus, Store, Zap, TrendingUp, Users, BarChart3 } from "lucide-react";
import { ChatConfig } from "@/types/chat";

export const sallaChatConfig: ChatConfig = {
  title: "Salla Ecommerce Store Assistant",
  subtitle: "Online",
  storeUrl: "https://demostore.salla.sa/dev-v6b9z71d8gnepyop",
  icon: Store,
  primaryColor: "#0F1E3D",
  accentColor: "#00E0FF",
  welcomeMessage: "Hello. I'm connected to your Salla store. How can I assist you today?",
  placeholder: "Ask about orders, inventory...",
  suggestions: [
    {
      icon: Package,
      title: "Browse Products",
      prompt: "Show me available products",
    },
    { 
      icon: Search, 
      title: "Search Items", 
      prompt: "Search for winter clothes" 
    },
    {
      icon: ShoppingCart,
      title: "Check Inventory",
      prompt: "What products are in stock?",
    },
    {
      icon: Package,
      title: "Product Details",
      prompt: "Tell me about product {Product Name or ID}",
    },
    { 
      icon: CirclePlus,
      title: "Add Product",
      prompt: `Add this product to the store:
  Product Name: 
  Description: 
  Price: 
  Image URL: 
  Quantity: `,
    },
  ],
};

export const shopifyChatConfig: ChatConfig = {
  title: "Shopify Store Assistant",
  subtitle: "Online",
  storeUrl: "https://nusuq-store.myshopify.com/",
  icon: Zap,
  primaryColor: "#004C3F",
  accentColor: "#95BF47",
  welcomeMessage: "Hello! I'm connected to your Shopify store. What would you like to do today?",
  placeholder: "Ask about products, orders...",
  suggestions: [
    {
      icon: Package,
      title: "View Products",
      prompt: "Show me all products",
    },
    {
      icon: Search,
      title: "Search Products",
      prompt: "Show me products for ",
    },
    {
      icon: Store,
      title: "Filter Products by Price",
      prompt: "Show me products under $50",
    }
  ],
};