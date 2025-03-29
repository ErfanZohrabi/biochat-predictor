import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Database, FileText, ExternalLink, AlertCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import ChatAssistant from '@/components/ChatAssistant';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  url: string;
}

interface SearchState {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
}

const API_TIMEOUT = 10000; // 10 seconds timeout
const RATE_LIMIT_DELAY = 1000; // 1 second between API calls

const BioDatabaseSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [rcsbState, setRcsbState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null
  });
  const [uniprotState, setUniprotState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null
  });
  const [ncbiState, setNcbiState] = useState<SearchState>({
    results: [],
    isLoading: false,
    error: null
  });
  const [activeTab, setActiveTab] = useState('all');

  const handleSearch = useCallback(async () => {
    if (!debouncedSearchTerm.trim()) {
      return;
    }

    // Reset previous search results
    setRcsbState({ results: [], isLoading: true, error: null });
    setUniprotState({ results: [], isLoading: true, error: null });
    setNcbiState({ results: [], isLoading: true, error: null });

    // Search all databases with rate limiting
    await searchRCSB(debouncedSearchTerm);
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
    await searchUniProt(debouncedSearchTerm);
    await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY));
    await searchNCBI(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const searchWithTimeout = async (url: string, options: RequestInit) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  };

  const searchRCSB = async (term: string) => {
    try {
      const query = {
        query: {
          type: 'terminal',
          service: 'text',
          parameters: {
            value: term
          }
        },
        return_type: 'entry'
      };

      const response = await searchWithTimeout('https://search.rcsb.org/rcsbsearch/v1/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query)
      });

      if (!response.ok) {
        throw new Error(`RCSB PDB API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.result_set && data.result_set.length > 0) {
        const results: SearchResult[] = data.result_set.slice(0, 10).map((entry: any) => ({
          id: entry.identifier,
          title: `PDB ID: ${entry.identifier}`,
          description: entry.title || 'No description available',
          url: `https://www.rcsb.org/structure/${entry.identifier}`
        }));
        setRcsbState({
          results,
          isLoading: false,
          error: null
        });
      } else {
        setRcsbState({
          results: [],
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error searching RCSB PDB:', error);
      setRcsbState({
        results: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch results from RCSB PDB'
      });
    }
  };

  const searchUniProt = async (term: string) => {
    try {
      const response = await searchWithTimeout(
        `https://rest.uniprot.org/uniprotkb/search?query=${encodeURIComponent(term)}&format=json`,
        {}
      );
      
      if (!response.ok) {
        throw new Error(`UniProt API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const results: SearchResult[] = data.results.slice(0, 10).map((result: any) => {
          const accession = result.primaryAccession;
          const name = result.proteinDescription?.recommendedName?.fullName?.value || 
                       result.proteinDescription?.submissionNames?.[0]?.fullName?.value ||
                       'No name available';
          
          return {
            id: accession,
            title: name,
            description: `Accession: ${accession} | Organism: ${result.organism?.scientificName || 'Unknown'}`,
            url: `https://www.uniprot.org/uniprotkb/${accession}`
          };
        });
        
        setUniprotState({
          results,
          isLoading: false,
          error: null
        });
      } else {
        setUniprotState({
          results: [],
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error searching UniProt:', error);
      setUniprotState({
        results: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch results from UniProt'
      });
    }
  };

  const searchNCBI = async (term: string) => {
    try {
      const response = await searchWithTimeout(
        `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term=${encodeURIComponent(term)}&retmode=json&retmax=10`,
        {}
      );
      
      if (!response.ok) {
        throw new Error(`NCBI API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.esearchresult && data.esearchresult.idlist && data.esearchresult.idlist.length > 0) {
        const ids = data.esearchresult.idlist.join(',');
        const summaryResponse = await searchWithTimeout(
          `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&id=${ids}&retmode=json`,
          {}
        );
        
        if (!summaryResponse.ok) {
          throw new Error(`NCBI Summary API error: ${summaryResponse.status}`);
        }
        
        const summaryData = await summaryResponse.json();
        
        const results: SearchResult[] = [];
        for (const id of data.esearchresult.idlist) {
          if (summaryData.result && summaryData.result[id]) {
            const article = summaryData.result[id];
            results.push({
              id,
              title: article.title || `PubMed ID: ${id}`,
              description: article.pubdate ? `Published: ${article.pubdate}` : 'No date available',
              url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
            });
          } else {
            results.push({
              id,
              title: `PubMed ID: ${id}`,
              url: `https://pubmed.ncbi.nlm.nih.gov/${id}/`
            });
          }
        }
        
        setNcbiState({
          results,
          isLoading: false,
          error: null
        });
      } else {
        setNcbiState({
          results: [],
          isLoading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error searching NCBI:', error);
      setNcbiState({
        results: [],
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch results from NCBI'
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 mb-12"
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Biological Database Search</h1>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Search across multiple biological databases including RCSB PDB, UniProt, and NCBI to find proteins,
                structures, and scientific literature.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-12">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter a protein name, gene, or keyword..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button 
                  onClick={handleSearch} 
                  className="bg-bioez-gradient"
                  disabled={rcsbState.isLoading || uniprotState.isLoading || ncbiState.isLoading}
                >
                  {(rcsbState.isLoading || uniprotState.isLoading || ncbiState.isLoading) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>Search</>
                  )}
                </Button>
              </div>
              
              <div className="flex items-center justify-center gap-8 mt-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  <span>RCSB PDB</span>
                </div>
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  <span>UniProt</span>
                </div>
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-1" />
                  <span>NCBI PubMed</span>
                </div>
              </div>
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="all" className="text-center py-3">
                  All Results
                </TabsTrigger>
                <TabsTrigger value="rcsb" className="text-center py-3">
                  RCSB PDB
                  {rcsbState.results.length > 0 && (
                    <span className="ml-2 bg-bioez-100 text-bioez-600 px-2 py-0.5 rounded-full text-xs">
                      {rcsbState.results.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="uniprot" className="text-center py-3">
                  UniProt
                  {uniprotState.results.length > 0 && (
                    <span className="ml-2 bg-bioez-100 text-bioez-600 px-2 py-0.5 rounded-full text-xs">
                      {uniprotState.results.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="ncbi" className="text-center py-3">
                  NCBI PubMed
                  {ncbiState.results.length > 0 && (
                    <span className="ml-2 bg-bioez-100 text-bioez-600 px-2 py-0.5 rounded-full text-xs">
                      {ncbiState.results.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-8">
                {/* RCSB PDB Results */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      RCSB PDB Results
                    </h2>
                    {rcsbState.results.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('rcsb')}
                      >
                        View All
                      </Button>
                    )}
                  </div>
                  
                  {rcsbState.isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-bioez-500" />
                    </div>
                  ) : rcsbState.error ? (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{rcsbState.error}</AlertDescription>
                    </Alert>
                  ) : rcsbState.results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {rcsbState.results.slice(0, 4).map((result) => (
                        <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                          <h3 className="font-medium mb-1">{result.title}</h3>
                          {result.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{result.description}</p>
                          )}
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-bioez-600 hover:underline text-sm flex items-center"
                          >
                            View on RCSB PDB
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <p className="text-center py-6 text-muted-foreground">No results found in RCSB PDB for "{searchTerm}"</p>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">Enter a search term to find protein structures</p>
                  )}
                </div>
                
                {/* UniProt Results */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <Database className="h-5 w-5 mr-2" />
                      UniProt Results
                    </h2>
                    {uniprotState.results.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('uniprot')}
                      >
                        View All
                      </Button>
                    )}
                  </div>
                  
                  {uniprotState.isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-bioez-500" />
                    </div>
                  ) : uniprotState.error ? (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{uniprotState.error}</AlertDescription>
                    </Alert>
                  ) : uniprotState.results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {uniprotState.results.slice(0, 4).map((result) => (
                        <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                          <h3 className="font-medium mb-1">{result.title}</h3>
                          {result.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{result.description}</p>
                          )}
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-bioez-600 hover:underline text-sm flex items-center"
                          >
                            View on UniProt
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <p className="text-center py-6 text-muted-foreground">No results found in UniProt for "{searchTerm}"</p>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">Enter a search term to find protein sequences</p>
                  )}
                </div>
                
                {/* NCBI Results */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      NCBI PubMed Results
                    </h2>
                    {ncbiState.results.length > 0 && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setActiveTab('ncbi')}
                      >
                        View All
                      </Button>
                    )}
                  </div>
                  
                  {ncbiState.isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-bioez-500" />
                    </div>
                  ) : ncbiState.error ? (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{ncbiState.error}</AlertDescription>
                    </Alert>
                  ) : ncbiState.results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {ncbiState.results.slice(0, 4).map((result) => (
                        <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                          <h3 className="font-medium mb-1 line-clamp-2">{result.title}</h3>
                          {result.description && (
                            <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                          )}
                          <a 
                            href={result.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-bioez-600 hover:underline text-sm flex items-center"
                          >
                            View on PubMed
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : searchTerm ? (
                    <p className="text-center py-6 text-muted-foreground">No results found in NCBI PubMed for "{searchTerm}"</p>
                  ) : (
                    <p className="text-center py-6 text-muted-foreground">Enter a search term to find scientific literature</p>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="rcsb">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Database className="h-6 w-6 mr-2" />
                  RCSB PDB Results
                </h2>
                
                {rcsbState.isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-bioez-500" />
                  </div>
                ) : rcsbState.error ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{rcsbState.error}</AlertDescription>
                  </Alert>
                ) : rcsbState.results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {rcsbState.results.map((result) => (
                      <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                        <h3 className="font-medium mb-1">{result.title}</h3>
                        {result.description && (
                          <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                        )}
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bioez-600 hover:underline text-sm flex items-center"
                        >
                          View on RCSB PDB
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <p className="text-center py-12 text-muted-foreground">No results found in RCSB PDB for "{searchTerm}"</p>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">Enter a search term to find protein structures</p>
                )}
              </TabsContent>
              
              <TabsContent value="uniprot">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Database className="h-6 w-6 mr-2" />
                  UniProt Results
                </h2>
                
                {uniprotState.isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-bioez-500" />
                  </div>
                ) : uniprotState.error ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{uniprotState.error}</AlertDescription>
                  </Alert>
                ) : uniprotState.results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {uniprotState.results.map((result) => (
                      <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                        <h3 className="font-medium mb-1">{result.title}</h3>
                        {result.description && (
                          <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                        )}
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bioez-600 hover:underline text-sm flex items-center"
                        >
                          View on UniProt
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <p className="text-center py-12 text-muted-foreground">No results found in UniProt for "{searchTerm}"</p>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">Enter a search term to find protein sequences</p>
                )}
              </TabsContent>
              
              <TabsContent value="ncbi">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  NCBI PubMed Results
                </h2>
                
                {ncbiState.isLoading ? (
                  <div className="flex justify-center py-12">
                    <Loader2 className="h-12 w-12 animate-spin text-bioez-500" />
                  </div>
                ) : ncbiState.error ? (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{ncbiState.error}</AlertDescription>
                  </Alert>
                ) : ncbiState.results.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {ncbiState.results.map((result) => (
                      <div key={result.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                        <h3 className="font-medium mb-1">{result.title}</h3>
                        {result.description && (
                          <p className="text-sm text-muted-foreground mb-2">{result.description}</p>
                        )}
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-bioez-600 hover:underline text-sm flex items-center"
                        >
                          View on PubMed
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : searchTerm ? (
                  <p className="text-center py-12 text-muted-foreground">No results found in NCBI PubMed for "{searchTerm}"</p>
                ) : (
                  <p className="text-center py-12 text-muted-foreground">Enter a search term to find scientific literature</p>
                )}
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <ChatAssistant />
    </div>
  );
};

export default BioDatabaseSearch;
