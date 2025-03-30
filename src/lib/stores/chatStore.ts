import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { chatApi } from '../api';

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'system';
  timestamp: Date;
  isLoading?: boolean;
}

interface ChatState {
  // Chat UI state
  isOpen: boolean;
  isMinimized: boolean;
  
  // Messages
  messages: ChatMessage[];
  inputMessage: string;
  isGenerating: boolean;
  
  // Context about current user activity
  context: {
    currentProteinId: string | null;
    currentDatabaseSearch: string | null;
    currentView: 'prediction' | 'search' | 'dashboard' | 'home' | null;
  };
  
  // Actions
  setOpen: (isOpen: boolean) => void;
  setMinimized: (isMinimized: boolean) => void;
  setInputMessage: (message: string) => void;
  sendMessage: (message: string) => Promise<void>;
  clearMessages: () => void;
  updateContext: (context: Partial<ChatState['context']>) => void;
}

// Helper to generate the system message based on context
const getSystemMessage = (context: ChatState['context']): string => {
  let systemPrompt = `You are BioEZ assistant, an AI designed to help with protein biology and bioinformatics. 
Current date: ${new Date().toISOString().split('T')[0]}. 
Be helpful, concise, and scientifically accurate. 
Provide references when possible.`;

  if (context.currentProteinId) {
    systemPrompt += `\nThe user is currently analyzing protein with ID: ${context.currentProteinId}.`;
  }

  if (context.currentDatabaseSearch) {
    systemPrompt += `\nThe user recently searched for: "${context.currentDatabaseSearch}" in biological databases.`;
  }

  if (context.currentView) {
    systemPrompt += `\nThe user is currently in the ${context.currentView} section of the application.`;
  }

  return systemPrompt;
};

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      // Initial state
      isOpen: false,
      isMinimized: false,
      messages: [
        {
          id: 'welcome-message',
          content: 'Hello! I\'m your BioEZ assistant. I can help you understand protein predictions and answer any questions about molecular biology.',
          sender: 'assistant',
          timestamp: new Date(),
        },
      ],
      inputMessage: '',
      isGenerating: false,
      context: {
        currentProteinId: null,
        currentDatabaseSearch: null,
        currentView: null,
      },
      
      // Actions
      setOpen: (isOpen) => {
        set({ isOpen, isMinimized: isOpen ? false : get().isMinimized });
      },
      
      setMinimized: (isMinimized) => {
        set({ isMinimized });
      },
      
      setInputMessage: (message) => {
        set({ inputMessage: message });
      },
      
      sendMessage: async (message) => {
        if (!message.trim()) return;
        
        const { messages, context } = get();
        
        // Add user message
        const userMessage: ChatMessage = {
          id: `user-${Date.now()}`,
          content: message,
          sender: 'user',
          timestamp: new Date(),
        };
        
        // Add placeholder for assistant response
        const assistantMessageId = `assistant-${Date.now()}`;
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          content: '',
          sender: 'assistant',
          timestamp: new Date(),
          isLoading: true,
        };
        
        // Update state with both messages
        set((state) => ({ 
          messages: [...state.messages, userMessage, assistantMessage],
          inputMessage: '',
          isGenerating: true,
        }));
        
        try {
          // Create the conversation history including system message
          const systemMessage = {
            role: 'system' as const,
            content: getSystemMessage(context),
          };
          
          const conversation = [
            systemMessage,
            ...messages
              .filter(msg => msg.sender !== 'system')
              .map(msg => ({
                role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
                content: msg.content,
              })),
            { role: 'user' as const, content: message },
          ];
          
          // Generate response from the API
          const responseContent = await chatApi.generateResponse(conversation);
          
          // Update the assistant message with the response content
          set((state) => ({
            messages: state.messages.map(msg => 
              msg.id === assistantMessageId
                ? { ...msg, content: responseContent, isLoading: false }
                : msg
            ),
            isGenerating: false,
          }));
        } catch (error) {
          console.error('Error generating assistant response:', error);
          
          // Update with error message
          set((state) => ({
            messages: state.messages.map(msg => 
              msg.id === assistantMessageId
                ? { 
                    ...msg, 
                    content: 'Sorry, I encountered an error while processing your request. Please try again.',
                    isLoading: false,
                  }
                : msg
            ),
            isGenerating: false,
          }));
        }
      },
      
      clearMessages: () => {
        set({
          messages: [
            {
              id: 'welcome-message',
              content: 'Hello! I\'m your BioEZ assistant. I can help you understand protein predictions and answer any questions about molecular biology.',
              sender: 'assistant',
              timestamp: new Date(),
            },
          ],
          inputMessage: '',
        });
      },
      
      updateContext: (newContext) => {
        set((state) => ({
          context: {
            ...state.context,
            ...newContext,
          },
        }));
      },
    }),
    {
      name: 'bioez-chat-storage',
      partialize: (state) => ({
        messages: state.messages.slice(-50), // Only persist last 50 messages
      }),
    }
  )
); 