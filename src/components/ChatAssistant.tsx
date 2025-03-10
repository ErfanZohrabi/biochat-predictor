
import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, MinusCircle, Maximize2, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your BioEZ assistant. I can help you understand protein predictions and answer any questions about molecular biology.',
      sender: 'assistant',
      timestamp: new Date()
    }
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    
    // Simulate assistant response (would be replaced with actual API call)
    setTimeout(() => {
      let response: string;
      
      if (message.toLowerCase().includes('protein') || message.toLowerCase().includes('function')) {
        response = "Proteins function through their unique 3D structure which determines how they interact with other molecules. The function prediction is based on sequence similarity to known proteins and structural motifs.";
      } else if (message.toLowerCase().includes('confidence') || message.toLowerCase().includes('accuracy')) {
        response = "Our confidence score is calculated from multiple factors including sequence similarity, structural prediction accuracy, and conservation of functional domains. Scores above 90% are highly reliable.";
      } else if (message.toLowerCase().includes('how') && message.toLowerCase().includes('work')) {
        response = "BioEZ uses a combination of deep learning models trained on protein sequences, structures, and experimental data to predict function. We analyze motifs, domains, and evolutionary relationships to generate predictions.";
      } else {
        response = "I'm happy to help with your protein biology questions. Could you provide more details about what you'd like to know?";
      }
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-bioez-gradient shadow-lg text-white z-50 p-0 hover:opacity-90 transition-opacity"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={isMinimized 
              ? { opacity: 1, y: 0, scale: 1, height: 'auto', width: 'auto', right: '1.5rem', bottom: '1.5rem' } 
              : { opacity: 1, y: 0, scale: 1, height: '500px', width: '380px', right: '1.5rem', bottom: '1.5rem' }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "fixed z-50 glass shadow-xl rounded-xl flex flex-col overflow-hidden border border-white/20",
              isMinimized ? "w-auto" : "w-full max-w-sm md:max-w-md"
            )}
          >
            {isMinimized ? (
              <div className="p-3 flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-bioez-600" />
                <span className="font-medium text-sm">BioEZ Assistant</span>
                <div className="flex ml-auto">
                  <button 
                    onClick={maximizeChat}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Maximize chat"
                  >
                    <Maximize2 className="h-4 w-4" />
                  </button>
                  <button 
                    onClick={toggleChat}
                    className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="p-3 bg-bioez-gradient text-white flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">BioEZ Assistant</span>
                  <div className="flex ml-auto">
                    <button 
                      onClick={minimizeChat}
                      className="text-white/80 hover:text-white transition-colors"
                      aria-label="Minimize chat"
                    >
                      <MinusCircle className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={toggleChat}
                      className="ml-2 text-white/80 hover:text-white transition-colors"
                      aria-label="Close chat"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={chatContainerRef}
                  className="flex-1 overflow-y-auto p-4 bg-white/50 backdrop-blur-sm"
                >
                  {messages.map((msg) => (
                    <div 
                      key={msg.id}
                      className={cn(
                        "mb-4 max-w-[85%] rounded-xl p-3",
                        msg.sender === 'user' 
                          ? "ml-auto bg-bioez-500 text-white" 
                          : "bg-white shadow-sm border border-gray-100"
                      )}
                    >
                      <div className="text-sm">{msg.content}</div>
                      <div 
                        className={cn(
                          "text-xs mt-1 text-right",
                          msg.sender === 'user' ? "text-white/70" : "text-muted-foreground"
                        )}
                      >
                        {formatTime(msg.timestamp)}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 bg-white border-t border-border">
                  <div className="flex items-end gap-2">
                    <Textarea
                      ref={textareaRef}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about protein function..."
                      className="min-h-10 resize-none border-muted bg-background"
                      maxRows={4}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className={cn(
                        "shrink-0 bg-bioez-gradient hover:opacity-90 transition-opacity",
                        !message.trim() && "opacity-70"
                      )}
                      size="icon"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground text-center">
                    Ask about protein functions, prediction results, or biological concepts
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatAssistant;
