import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProteinPredictionResult, ProteinPredictionRequest, proteinApi } from '../api';

interface ProteinState {
  // Current protein being analyzed
  currentProtein: {
    file: File | null;
    sequence: string;
    format: 'fasta' | 'pdb' | 'raw' | null;
  };
  
  // Prediction status
  isPredicting: boolean;
  predictionError: string | null;
  
  // Results
  predictionResults: ProteinPredictionResult[];
  currentResult: ProteinPredictionResult | null;
  
  // History - persisted results
  predictionHistory: {
    id: string;
    proteinName: string;
    timestamp: string;
    resultId: string;
  }[];
  
  // Actions
  setCurrentProtein: (file: File | null, sequence: string, format: 'fasta' | 'pdb' | 'raw' | null) => void;
  clearCurrentProtein: () => void;
  predictProtein: (options?: ProteinPredictionRequest['options']) => Promise<ProteinPredictionResult>;
  setPredictionResult: (result: ProteinPredictionResult) => void;
  loadResultById: (id: string) => ProteinPredictionResult | null;
  clearResults: () => void;
  deleteResultById: (id: string) => void;
}

export const useProteinStore = create<ProteinState>()(
  persist(
    (set, get) => ({
      // Initial state
      currentProtein: {
        file: null,
        sequence: '',
        format: null,
      },
      isPredicting: false,
      predictionError: null,
      predictionResults: [],
      currentResult: null,
      predictionHistory: [],
      
      // Actions
      setCurrentProtein: (file, sequence, format) => {
        set({
          currentProtein: {
            file,
            sequence,
            format,
          },
          predictionError: null,
        });
      },
      
      clearCurrentProtein: () => {
        set({
          currentProtein: {
            file: null,
            sequence: '',
            format: null,
          },
          predictionError: null,
        });
      },
      
      predictProtein: async (options) => {
        const { currentProtein } = get();
        
        if (!currentProtein.sequence || !currentProtein.format) {
          const error = 'No protein sequence provided for prediction';
          set({ predictionError: error });
          throw new Error(error);
        }
        
        set({ isPredicting: true, predictionError: null });
        
        try {
          const request: ProteinPredictionRequest = {
            sequence: currentProtein.sequence,
            format: currentProtein.format,
            options,
          };
          
          const result = await proteinApi.predictFunction(request);
          
          // Add to results and history
          set((state) => ({
            predictionResults: [result, ...state.predictionResults],
            currentResult: result,
            isPredicting: false,
            predictionHistory: [
              {
                id: `history-${Date.now()}`,
                proteinName: result.proteinName,
                timestamp: result.createdAt,
                resultId: result.id,
              },
              ...state.predictionHistory,
            ].slice(0, 50), // Keep only the last 50 items
          }));
          
          return result;
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to predict protein function';
          set({ isPredicting: false, predictionError: errorMessage });
          throw error;
        }
      },
      
      setPredictionResult: (result) => {
        set({
          currentResult: result,
          predictionResults: [
            result,
            ...get().predictionResults.filter(r => r.id !== result.id),
          ],
        });
      },
      
      loadResultById: (id) => {
        const { predictionResults } = get();
        const result = predictionResults.find(r => r.id === id) || null;
        if (result) {
          set({ currentResult: result });
        }
        return result;
      },
      
      clearResults: () => {
        set({
          predictionResults: [],
          currentResult: null,
        });
      },
      
      deleteResultById: (id) => {
        set((state) => ({
          predictionResults: state.predictionResults.filter(r => r.id !== id),
          predictionHistory: state.predictionHistory.filter(h => h.resultId !== id),
          currentResult: state.currentResult?.id === id ? null : state.currentResult,
        }));
      },
    }),
    {
      name: 'bioez-protein-storage', // localStorage key
      partialize: (state) => ({
        predictionResults: state.predictionResults,
        predictionHistory: state.predictionHistory,
      }),
    }
  )
); 