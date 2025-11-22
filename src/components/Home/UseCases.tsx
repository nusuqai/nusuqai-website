'use client';
import { ShoppingCart, Database, MessageSquare, Calendar, ArrowRight, User, Bot, Server, Package } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type MCPUseCase = {
  icon: any;
  title: string;
  subtitle: string;
  color: string;
  description: string;
};

const mcpUseCases : MCPUseCase[] = [
  {
    icon: ShoppingCart,
    title: "E-commerce Integration",
    subtitle: "Manage orders and inventory",
    color: "#00E0FF",
    description: "Connect your AI assistant to Shopify, WooCommerce, or custom e-commerce platforms. Handle customer inquiries, process orders, check inventory, and update product information in real-time through natural conversation.",
  },
  {
    icon: Database,
    title: "Database Operations",
    subtitle: "Query and analyze data",
    color: "#00D4C2",
    description: "Enable direct database access for your AI assistant. Query customer data, sales records, and analytics from PostgreSQL, MySQL, or MongoDB. Get instant insights without manual data exports or complex queries.",
  },
  {
    icon: MessageSquare,
    title: "Customer Support",
    subtitle: "Access ticket systems",
    color: "#00E0FF",
    description: "Integrate with Zendesk, Intercom, or Freshdesk to manage customer support tickets. AI can read ticket history, update status, assign to teams, and provide context-aware responses based on past interactions.",
  },
  {
    icon: Calendar,
    title: "Calendar & Scheduling",
    subtitle: "Manage meetings and events",
    color: "#00D4C2",
    description: "Connect to Google Calendar, Outlook, or Calendly. Let AI check availability, schedule meetings, send invites, and manage your calendar through natural language commands without switching applications.",
  }
];

export default function UseCases() {
  const [selectedCase, setSelectedCase] = useState(0);

  const renderAnimation = (index: number) => {
    const colors = mcpUseCases[index].color;
    
    if (index === 0) {
      // E-commerce animation
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          {/* User */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg border-2 border-white">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-[#0F1E3D] max-w-[140px] text-center border border-gray-100"
            >
              "Check order #12345"
            </motion.div>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
              style={{ backgroundColor: colors }}
            >
              <Bot className="w-12 h-12 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700 whitespace-nowrap font-medium"
            >
              Processing...
            </motion.div>
          </motion.div>

          {/* Connection line to Shopify */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.7, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 w-36 h-1 origin-left rounded-full"
            style={{ backgroundColor: colors }}
          />

          {/* Data packets traveling */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 0 }}
              animate={{ scale: [0, 1, 1, 0], x: [0, 144, 144, 144] }}
              transition={{ 
                delay: 1.7 + (i * 0.2), 
                duration: 1.2,
                times: [0, 0.2, 0.8, 1]
              }}
              className="absolute left-1/2 top-1/2 w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: colors,
                translateY: `${(i - 1) * 8}px`
              }}
            />
          ))}

          {/* Shopify/E-commerce */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
            className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl border-2 border-white">
              <ShoppingCart className="w-10 h-10 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="mt-4 bg-green-50 px-4 py-2 rounded-lg text-sm text-green-700 font-medium border border-green-200"
            >
              ✓ Order found
            </motion.div>
          </motion.div>

          {/* Response data flowing back */}
          <motion.div
            initial={{ scale: 0, x: 144 }}
            animate={{ scale: [0, 1, 1, 0], x: [144, 0, 0, -120] }}
            transition={{ delay: 3.2, duration: 1.4, times: [0, 0.2, 0.7, 1] }}
            className="absolute left-1/2 top-1/2 w-4 h-4 rounded-full shadow-lg"
            style={{ backgroundColor: colors }}
          />

          {/* Final response */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 4.3, type: "spring" }}
            className="absolute left-12 bottom-12 bg-gradient-to-r from-green-50 to-emerald-50 px-5 py-3 rounded-xl shadow-lg text-sm text-green-800 font-medium border border-green-200"
          >
            "Order #12345 shipped! Arriving Monday"
          </motion.div>
        </div>
      );
    } else if (index === 1) {
      // Database animation
      return (
        <div className="relative w-full h-96 flex items-center justify-center">
          {/* User */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="absolute left-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center shadow-lg border-2 border-white">
              <User className="w-10 h-10 text-gray-600" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 bg-white px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-[#0F1E3D] max-w-[140px] text-center border border-gray-100"
            >
              "Show Q4 revenue"
            </motion.div>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            className="relative z-10"
          >
            <div 
              className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
              style={{ backgroundColor: colors }}
            >
              <Bot className="w-12 h-12 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-blue-50 px-3 py-1 rounded-full text-xs text-blue-700 whitespace-nowrap font-medium"
            >
              Querying database...
            </motion.div>
          </motion.div>

          {/* Connection line to Database */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.5, duration: 0.7, ease: "easeInOut" }}
            className="absolute left-1/2 top-1/2 w-36 h-1 origin-left rounded-full"
            style={{ backgroundColor: colors }}
          />

          {/* SQL query visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1, 0.8] }}
            transition={{ delay: 1.8, duration: 1.5, times: [0, 0.3, 0.7, 1] }}
            className="absolute left-1/2 top-1/3 transform -translate-x-1/2 bg-gray-900 text-green-400 px-3 py-2 rounded text-xs font-mono whitespace-nowrap"
          >
            SELECT SUM(revenue)...
          </motion.div>

          {/* Database */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2.2, type: "spring", stiffness: 200 }}
            className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center shadow-2xl border-2 border-white">
              <Database className="w-10 h-10 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 }}
              className="mt-4 bg-blue-50 px-4 py-2 rounded-lg text-sm text-blue-700 font-medium border border-blue-200"
            >
              Computing...
            </motion.div>
          </motion.div>

          {/* Multiple data packets flowing back */}
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, x: 144 }}
              animate={{ scale: [0, 1, 1, 0], x: [144, 0, 0, -120] }}
              transition={{ 
                delay: 3.2 + (i * 0.15), 
                duration: 1.2,
                times: [0, 0.2, 0.7, 1]
              }}
              className="absolute left-1/2 w-3 h-3 rounded-full shadow-md"
              style={{ 
                backgroundColor: colors,
                top: `calc(50% + ${(i - 2) * 10}px)`
              }}
            />
          ))}

          {/* Final response */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 4.5, type: "spring" }}
            className="absolute left-12 bottom-12 bg-gradient-to-r from-blue-50 to-cyan-50 px-5 py-3 rounded-xl shadow-lg text-sm font-medium border border-blue-200"
          >
            <div className="text-[#0F1E3D]">Q4 Revenue</div>
            <div className="text-2xl text-blue-600 font-bold">$2.4M</div>
            <div className="text-xs text-blue-600">↑ 15% from Q3</div>
          </motion.div>
        </div>
      );
    } else if (index === 2) {
      // Customer Support animation
      return (
        <div className="relative w-full h-80 flex items-center justify-center">
          {/* User */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-8 top-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-28 top-2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
            >
              "Update ticket #789"
            </motion.div>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors }}
            >
              <Bot className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Connection line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-1/2 top-1/2 w-32 h-0.5 origin-left"
            style={{ backgroundColor: colors }}
          />

          {/* Support System */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute right-8 top-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center">
              <MessageSquare className="w-8 h-8 text-white" />
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.6 }}
              className="absolute -top-8 -left-8 bg-green-500 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs"
            >
              ✓
            </motion.div>
          </motion.div>

          {/* Status update notification */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            className="absolute bottom-8 right-8 bg-green-50 px-4 py-2 rounded-lg text-sm text-green-700"
          >
            Status: Resolved
          </motion.div>
        </div>
      );
    } else {
      // Calendar animation
      return (
        <div className="relative w-full h-80 flex items-center justify-center">
          {/* User */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute left-8 top-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-8 h-8 text-gray-600" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -right-36 top-2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap"
            >
              "Schedule meeting 2pm"
            </motion.div>
          </motion.div>

          {/* Chatbot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative z-10"
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: colors }}
            >
              <Bot className="w-10 h-10 text-white" />
            </div>
          </motion.div>

          {/* Connection line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-1/2 top-1/2 w-32 h-0.5 origin-left"
            style={{ backgroundColor: colors }}
          />

          {/* Calendar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute right-8 top-1/2 -translate-y-1/2"
          >
            <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center">
              <Calendar className="w-8 h-8 text-white" />
            </div>
          </motion.div>

          {/* Calendar event created */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.6, type: "spring" }}
            className="absolute right-8 top-12 bg-blue-500 text-white px-3 py-2 rounded text-xs w-24 text-center"
          >
            2:00 PM
            <div className="text-xs opacity-75">Meeting</div>
          </motion.div>

          {/* Confirmation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-green-50 px-4 py-2 rounded-lg text-sm text-green-700"
          >
            Meeting scheduled ✓
          </motion.div>
        </div>
      );
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl lg:text-5xl text-[#0F1E3D] mb-4">
              Real-World MCP Integrations
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              See how AI connects to your business tools in real-time
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Cards */}
          <div className="space-y-4">
            {mcpUseCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const isSelected = selectedCase === index;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedCase(index)}
                  className={`cursor-pointer rounded-xl p-6 border transition-all duration-300 ${
                    isSelected
                      ? 'border-transparent shadow-xl bg-gradient-to-br from-white to-gray-50'
                      : 'border-gray-100 hover:border-gray-200 bg-white shadow-md hover:shadow-lg'
                  }`}
                  style={{
                    borderColor: isSelected ? useCase.color : undefined,
                    borderWidth: isSelected ? '2px' : '1px',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                      style={{
                        backgroundColor: isSelected ? useCase.color : `${useCase.color}15`,
                      }}
                    >
                      <Icon
                        className="w-7 h-7 transition-colors duration-300"
                        style={{
                          color: isSelected ? "white" : useCase.color,
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[#0F1E3D] text-xl mb-1 font-medium">
                        {useCase.title}
                      </h3>
                      <p className="text-[#94A3B8] text-sm">
                        {useCase.subtitle}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-all duration-300 ${
                        isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                      }`}
                      style={{ color: useCase.color }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Animation & Content */}
          <div className="lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Animation */}
                <div className="mb-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
                  {renderAnimation(selectedCase)}
                </div>

                {/* Description */}
                <div className="flex items-start gap-3 mb-4">
                  {(() => {
                    const Icon = mcpUseCases[selectedCase].icon;
                    return (
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: mcpUseCases[selectedCase].color }}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                    );
                  })()}
                  <div>
                    <h3 className="text-xl text-[#0F1E3D] font-medium mb-2">
                      {mcpUseCases[selectedCase].title}
                    </h3>
                    <p className="text-[#94A3B8] leading-relaxed">
                      {mcpUseCases[selectedCase].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}