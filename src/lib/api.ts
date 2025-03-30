import axios from 'axios';

// Base API configuration
const API_CONFIG = {
  prediction: {
    baseURL: import.meta.env.VITE_API_URL || 'https://api.bioez.ai',
    timeout: 30000,
  },
  databases: {
    rcsb: import.meta.env.VITE_RCSB_API_URL || 'https://search.rcsb.org/rcsbsearch/v1/query',
    uniprot: import.meta.env.VITE_UNIPROT_API_URL || 'https://rest.uniprot.org/uniprotkb/search',
    ncbi: import.meta.env.VITE_NCBI_API_URL || 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
    pubchem: import.meta.env.VITE_PUBCHEM_API_URL || 'https://pubchem.ncbi.nlm.nih.gov/rest/pug',
  },
  llm: {
    baseURL: import.meta.env.VITE_LLM_API_URL || 'https://api.openai.com/v1',
    timeout: 10000,
  }
};

// Type definitions
export interface ProteinPredictionRequest {
  sequence: string;
  format: 'fasta' | 'pdb' | 'raw';
  options?: {
    includeDomains?: boolean;
    includeStructure?: boolean;
    confidenceThreshold?: number;
  };
}

export interface ProteinDomain {
  name: string;
  start: number;
  end: number;
  confidence: number;
  function?: string;
}

export interface LiteratureReference {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  url: string;
}

export interface ProteinPredictionResult {
  id: string;
  proteinName: string;
  function: string;
  confidence: number;
  domains: ProteinDomain[];
  structure?: string; // PDB format or URL
  goTerms?: { id: string; term: string; evidence: string }[];
  literature: LiteratureReference[];
  createdAt: string;
}

export interface PredictionResult {
  id: string;
  sequence: string;
  prediction: string;
  confidence: number;
  timestamp: string;
  details?: {
    domains?: string[];
    functions?: string[];
    potentialInteractions?: string[];
    structuralFeatures?: string[];
  };
}

export interface ChatResponse {
  id: string;
  response: string;
  sources?: Array<{
    title: string;
    url: string;
    snippet: string;
  }>;
}

// Create API instances
const predictionApi = axios.create({
  baseURL: API_CONFIG.prediction.baseURL,
  timeout: API_CONFIG.prediction.timeout,
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': import.meta.env.VITE_API_KEY || '',
  },
});

const rcsbApi = axios.create({
  baseURL: import.meta.env.VITE_RCSB_API_URL || 'https://data.rcsb.org/rest/v1',
  timeout: 10000
});

const uniprotApi = axios.create({
  baseURL: import.meta.env.VITE_UNIPROT_API_URL || 'https://rest.uniprot.org/uniprotkb',
  timeout: 10000
});

const ncbiApi = axios.create({
  baseURL: import.meta.env.VITE_NCBI_API_URL || 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils',
  timeout: 10000
});

const pubchemApi = axios.create({
  baseURL: import.meta.env.VITE_PUBCHEM_API_URL || 'https://pubchem.ncbi.nlm.nih.gov/rest/pug',
  timeout: 10000
});

const llmApi = axios.create({
  baseURL: import.meta.env.VITE_LLM_API_URL || 'https://api.bioez.com/v1/chat',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_KEY}`
  }
});

// Mock data for development
const getMockPrediction = (sequence: string): ProteinPredictionResult => {
  return {
    id: `mock-${Date.now()}`,
    proteinName: sequence.length > 20 ? 'Unknown Protein' : 'Hemoglobin Beta Chain',
    function: 'Oxygen transport protein that carries oxygen from the lungs to tissues and carbon dioxide from tissues back to lungs.',
    confidence: 97,
    domains: [
      { name: 'Globin domain', start: 1, end: 146, confidence: 99 },
      { name: 'Heme binding site', start: 63, end: 99, confidence: 98 }
    ],
    literature: [
      { 
        id: 'PMID12345678',
        title: 'Structure and function of hemoglobin',
        authors: ['Smith J', 'Johnson A'],
        journal: 'Journal of Molecular Biology',
        year: 2023,
        url: 'https://pubmed.ncbi.nlm.nih.gov/12345678/' 
      },
      { 
        id: 'PMID87654321',
        title: 'Evolutionary conservation of globin proteins',
        authors: ['Lee A', 'Wong B', 'Garcia C'],
        journal: 'Evolutionary Biology',
        year: 2022,
        url: 'https://pubmed.ncbi.nlm.nih.gov/87654321/' 
      }
    ],
    createdAt: new Date().toISOString()
  };
};

// Legacy API methods that will be refactored
/**
 * Predict protein function from sequence
 */
export const predictFunction = async (sequence: string): Promise<PredictionResult> => {
  try {
    const response = await predictionApi.post('/predict', { sequence });
    return response.data;
  } catch (error) {
    console.error('Prediction error:', error);
    
    // In development, return mock data for testing
    if (import.meta.env.DEV) {
      return {
        id: 'mock-id-123',
        sequence,
        prediction: 'Hypothetical protein with potential kinase activity',
        confidence: 0.87,
        timestamp: new Date().toISOString(),
        details: {
          domains: ['Kinase-like domain', 'ATP-binding site'],
          functions: ['ATP binding', 'Protein phosphorylation'],
          potentialInteractions: ['ATP', 'Other kinases', 'Substrate proteins'],
          structuralFeatures: ['Alpha helix-rich', 'Beta sheets in binding region']
        }
      };
    }
    
    throw error;
  }
};

/**
 * Generate a response from the chat assistant
 */
export const generateResponse = async (
  query: string,
  context?: string,
  includeSources: boolean = true
): Promise<ChatResponse> => {
  try {
    const response = await llmApi.post('/generate', {
      query,
      context,
      includeSources
    });
    return response.data;
  } catch (error) {
    console.error('Chat generation error:', error);
    
    // In development, return mock data for testing
    if (import.meta.env.DEV) {
      return {
        id: 'chat-mock-123',
        response: 'Based on the protein sequence, this appears to be a member of the kinase family, which is involved in phosphorylation of proteins. These enzymes play crucial roles in cellular signaling pathways.',
        sources: includeSources ? [
          {
            title: 'Introduction to Protein Kinases',
            url: 'https://example.com/kinases',
            snippet: 'Protein kinases are enzymes that modify other proteins by chemically adding phosphate groups.'
          },
          {
            title: 'Cellular Signaling Mechanisms',
            url: 'https://example.com/signaling',
            snippet: 'Phosphorylation by kinases is a key mechanism in cellular signal transduction.'
          }
        ] : undefined
      };
    }
    
    throw error;
  }
};

/**
 * Search for a protein in the RCSB PDB database
 */
export const searchRCSB = async (query: string) => {
  try {
    const response = await rcsbApi.get('/search', { 
      params: {
        q: query,
        format: 'json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('RCSB search error:', error);
    throw error;
  }
};

/**
 * Search for a protein in the UniProt database
 */
export const searchUniProt = async (query: string) => {
  try {
    const response = await uniprotApi.get('/search', {
      params: {
        query: query,
        format: 'json',
        limit: 10
      }
    });
    return response.data;
  } catch (error) {
    console.error('UniProt search error:', error);
    throw error;
  }
};

/**
 * Search for information in the NCBI database
 */
export const searchNCBI = async (query: string, database: string = 'protein') => {
  try {
    const params: Record<string, string> = {
      db: database,
      term: query,
      retmode: 'json',
      retmax: '10'
    };
    
    // Add API key if available
    if (import.meta.env.VITE_NCBI_API_KEY) {
      params.api_key = import.meta.env.VITE_NCBI_API_KEY;
    }
    
    const response = await ncbiApi.get('/esearch.fcgi', { params });
    return response.data;
  } catch (error) {
    console.error('NCBI search error:', error);
    throw error;
  }
};

/**
 * Search for a compound in the PubChem database
 */
export const searchPubChem = async (query: string) => {
  try {
    const response = await pubchemApi.get('/compound/name/' + encodeURIComponent(query) + '/JSON');
    return response.data;
  } catch (error) {
    console.error('PubChem search error:', error);
    throw error;
  }
};

/**
 * Fetch detailed protein information from UniProt
 */
export const fetchProteinDetails = async (accession: string) => {
  try {
    const response = await uniprotApi.get(`/${accession}`);
    return response.data;
  } catch (error) {
    console.error('Protein details fetch error:', error);
    throw error;
  }
};

/**
 * Fetch PDB structure from RCSB
 */
export const fetchPDBStructure = async (pdbId: string) => {
  try {
    const response = await rcsbApi.get(`/entry/${pdbId}`);
    return response.data;
  } catch (error) {
    console.error('PDB structure fetch error:', error);
    throw error;
  }
};

// Updated structured API modules
export const proteinApi = {
  // Predict protein function
  predictFunction: async (data: ProteinPredictionRequest): Promise<ProteinPredictionResult> => {
    try {
      const response = await predictionApi.post('/predict', data);
      return response.data;
    } catch (error) {
      console.error('Error predicting protein function:', error);
      // Fallback to mock data during development
      if (import.meta.env.DEV) {
        return getMockPrediction(data.sequence);
      }
      throw error;
    }
  },

  // Search protein databases
  searchRCSB: async (term: string, limit = 10) => {
    const query = {
      query: {
        type: 'terminal',
        service: 'text',
        parameters: { value: term }
      },
      return_type: 'entry',
      request_options: { pager: { start: 0, rows: limit } }
    };

    try {
      const response = await axios.post(API_CONFIG.databases.rcsb, query);
      return response.data;
    } catch (error) {
      console.error('Error searching RCSB:', error);
      throw error;
    }
  },

  searchUniProt: async (term: string, limit = 10) => {
    try {
      const response = await axios.get(`${API_CONFIG.databases.uniprot}?query=${encodeURIComponent(term)}&format=json&size=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error searching UniProt:', error);
      throw error;
    }
  },

  searchNCBI: async (term: string, database = 'pubmed', limit = 10) => {
    try {
      // Add API key if available
      const apiKeyParam = import.meta.env.VITE_NCBI_API_KEY ? 
        `&api_key=${import.meta.env.VITE_NCBI_API_KEY}` : '';
        
      // First get IDs
      const searchResponse = await axios.get(
        `${API_CONFIG.databases.ncbi}/esearch.fcgi?db=${database}&term=${encodeURIComponent(term)}&retmode=json&retmax=${limit}${apiKeyParam}`
      );
      
      if (!searchResponse.data.esearchresult?.idlist?.length) {
        return { results: [] };
      }
      
      // Then get summaries
      const ids = searchResponse.data.esearchresult.idlist.join(',');
      const summaryResponse = await axios.get(
        `${API_CONFIG.databases.ncbi}/esummary.fcgi?db=${database}&id=${ids}&retmode=json${apiKeyParam}`
      );
      
      return summaryResponse.data;
    } catch (error) {
      console.error('Error searching NCBI:', error);
      throw error;
    }
  },
  
  // New PubChem integration
  searchPubChem: async (term: string, searchType = 'name') => {
    try {
      const response = await axios.get(
        `${API_CONFIG.databases.pubchem}/compound/${searchType}/${encodeURIComponent(term)}/JSON`
      );
      return response.data;
    } catch (error) {
      console.error('Error searching PubChem:', error);
      throw error;
    }
  }
};

// Chat API for the assistant
export const chatAssistantApi = {
  generateResponse: async (messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) => {
    try {
      const response = await axios.post(
        `${API_CONFIG.llm.baseURL}/chat/completions`,
        {
          model: import.meta.env.VITE_OPENAI_MODEL || "gpt-4-turbo",
          messages,
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY || ''}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating chat response:', error);
      // Return fallback response during development
      if (import.meta.env.DEV) {
        return "I'm your BioEZ assistant. I can help you understand protein predictions and answer questions about molecular biology. What would you like to know?";
      }
      throw error;
    }
  }
};

export default {
  predictFunction,
  generateResponse,
  searchRCSB,
  searchUniProt,
  searchNCBI,
  searchPubChem,
  fetchProteinDetails,
  fetchPDBStructure,
  proteinApi,
  chatAssistantApi
}; 