import { useEffect, useRef } from 'react';
import { MessageCircle, Send, MinusCircle, Maximize2, X, Loader2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore, ChatMessage } from '@/lib/stores/chatStore';
import Markdown from 'react-markdown';

const ChatAssistant = () => {
  const { 
    isOpen, 
    isMinimized, 
    messages, 
    inputMessage, 
    isGenerating,
    setOpen, 
    setMinimized, 
    setInputMessage, 
    sendMessage, 
    clearMessages,
  } = useChatStore();
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current && isOpen && !isMinimized) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isOpen, isMinimized]);

  // Focus textarea when chat is opened
  useEffect(() => {
    if (isOpen && !isMinimized && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isGenerating) return;
    sendMessage(inputMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setOpen(!isOpen);
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const MessageContent = ({ content, sender }: Pick<ChatMessage, 'content' | 'sender'>) => {
    if (sender === 'assistant') {
      return (
        <Markdown 
          className="text-sm prose prose-sm dark:prose-invert max-w-none break-words"
          components={{
            a: ({ node, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer" className="text-bioez-600 hover:underline" />
            ),
            code: ({ node, className, children, ...props }) => (
              <code className="bg-muted rounded px-1 py-0.5 text-xs" {...props}>
                {children}
              </code>
            ),
            pre: ({ node, children, ...props }) => (
              <pre className="bg-muted p-2 rounded-md my-2 overflow-x-auto text-xs" {...props}>
                {children}
              </pre>
            )
          }}
        >
          {content}
        </Markdown>
      );
    }
    
    return <div className="text-sm break-words">{content}</div>;
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
                    onClick={() => setMinimized(false)}
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
                      onClick={() => setMinimized(true)}
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
                      {msg.isLoading ? (
                        <div className="flex items-center justify-center py-2">
                          <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                      ) : (
                        <MessageContent content={msg.content} sender={msg.sender} />
                      )}
                      
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
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask about protein function..."
                      className="min-h-10 resize-none border-muted bg-background"
                      rows={1}
                      disabled={isGenerating}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isGenerating}
                      className={cn(
                        "shrink-0 bg-bioez-gradient hover:opacity-90 transition-opacity",
                        (!inputMessage.trim() || isGenerating) && "opacity-70"
                      )}
                      size="icon"
                    >
                      {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
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
