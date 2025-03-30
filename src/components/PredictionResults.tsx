import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, CopyIcon, Download, ExternalLink, Share2, Dna, Clipboard, InfoIcon, Code } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';
import { useProteinStore } from '@/lib/stores/proteinStore';
import { useToast } from '@/hooks/use-toast';
import ProteinViewer from './ProteinViewer';

const PredictionResults = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const { currentResult, isPredicting } = useProteinStore();
  
  // Copy results to clipboard
  const handleCopyResults = () => {
    if (!currentResult) return;
    
    const resultText = `
Protein: ${currentResult.proteinName}
Function: ${currentResult.function}
Confidence: ${currentResult.confidence}%
Domains: ${currentResult.domains.map(d => `${d.name} (${d.start}-${d.end})`).join(', ')}
    `.trim();
    
    navigator.clipboard.writeText(resultText).then(() => {
      toast({
        title: 'Copied to clipboard',
        description: 'The prediction results have been copied to your clipboard.',
      });
    });
  };
  
  // Download results as JSON
  const handleDownloadResults = () => {
    if (!currentResult) return;
    
    const dataStr = JSON.stringify(currentResult, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', `protein-prediction-${currentResult.id}.json`);
    linkElement.click();
  };
  
  // Share results
  const handleShareResults = () => {
    if (!currentResult) return;
    
    // Check if Web Share API is available
    if (navigator.share) {
      navigator.share({
        title: `BioEZ Prediction: ${currentResult.proteinName}`,
        text: `Check out this protein function prediction for ${currentResult.proteinName}`,
        url: window.location.href,
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback to copying link
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast({
          title: 'Link copied',
          description: 'Share link has been copied to your clipboard.',
        });
      });
    }
  };
  
  if (isPredicting) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="glass rounded-2xl p-8 animate-pulse">
          <div className="flex items-center justify-center mb-10">
            <Dna className="h-12 w-12 text-bioez-500 animate-pulse" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Analyzing your protein</h2>
              <p className="text-muted-foreground">This may take a few moments...</p>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-4/6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-32 bg-muted rounded-xl"></div>
            <div className="h-32 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentResult) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 70) return 'text-amber-500';
    return 'text-orange-500';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-2xl overflow-hidden"
      >
        <div className="bg-bioez-gradient p-4 text-white flex justify-between items-center">
          <div className="flex items-center">
            <CheckCircle2 className="mr-2 h-5 w-5" />
            <h2 className="text-lg font-semibold">Prediction Results</h2>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2 text-white hover:bg-white/20"
              onClick={handleCopyResults}
              title="Copy Results"
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2 text-white hover:bg-white/20"
              onClick={handleDownloadResults}
              title="Download Results"
            >
              <Download className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2 text-white hover:bg-white/20"
              onClick={handleShareResults}
              title="Share Results"
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="structure">Structure</TabsTrigger>
              <TabsTrigger value="domains">Domains</TabsTrigger>
              <TabsTrigger value="literature">Literature</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="p-6">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold">{currentResult.proteinName}</h3>
                <div className={cn(
                  "inline-flex items-center text-sm font-medium",
                  getConfidenceColor(currentResult.confidence)
                )}>
                  Confidence: {currentResult.confidence}%
                </div>
              </div>
              <p className="text-foreground/80 mb-4">{currentResult.function}</p>
              
              <div className="mt-6 bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium flex items-center mb-2">
                  <InfoIcon className="h-4 w-4 mr-2" />
                  Key Information
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Domains:</span>
                    <span className="font-medium">{currentResult.domains.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">GO Terms:</span>
                    <span className="font-medium">{currentResult.goTerms?.length || 'N/A'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Related Literature:</span>
                    <span className="font-medium">{currentResult.literature.length}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-muted-foreground">Prediction Date:</span>
                    <span className="font-medium">
                      {new Date(currentResult.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="structure" className="p-6">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium mb-4">Protein Structure</h3>
              
              <div className="h-[400px] bg-black/5 rounded-lg mb-4 overflow-hidden">
                {currentResult.structure ? (
                  <ProteinViewer 
                    structure={currentResult.structure} 
                    format={currentResult.structure.startsWith('HEADER') ? 'pdb' : 'url'}
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Dna className="h-10 w-10 mx-auto mb-3 text-muted-foreground/50" />
                      <p className="text-muted-foreground">No structure data available</p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-2 text-sm text-muted-foreground text-center">
                <InfoIcon className="inline-block h-4 w-4 mr-1" />
                Rotate the structure by clicking and dragging. Zoom with scroll wheel.
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="domains" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Functional Domains</h3>
              
              <div className="space-y-4">
                {currentResult.domains.map((domain) => (
                  <div 
                    key={`${domain.name}-${domain.start}-${domain.end}`}
                    className="border border-border rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{domain.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          Position: {domain.start}-{domain.end} ({domain.end - domain.start + 1} aa)
                        </p>
                      </div>
                      <div className={cn(
                        "text-xs font-medium rounded-full px-2 py-1",
                        domain.confidence >= 90 
                          ? "bg-success-100 text-success-700" 
                          : domain.confidence >= 70
                            ? "bg-amber-100 text-amber-700"
                            : "bg-orange-100 text-orange-700"
                      )}>
                        {domain.confidence}% confidence
                      </div>
                    </div>
                    
                    {domain.function && (
                      <p className="text-sm mt-2">{domain.function}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="literature" className="p-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-4">Related Literature</h3>
              
              {currentResult.literature.length > 0 ? (
                <div className="space-y-4">
                  {currentResult.literature.map((paper) => (
                    <div 
                      key={paper.id}
                      className="border border-border rounded-lg p-4 hover:bg-muted/10 transition-colors"
                    >
                      <a 
                        href={paper.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <h4 className="font-medium flex items-start group">
                          <span className="flex-1">{paper.title}</span>
                          <ExternalLink className="h-4 w-4 ml-2 text-muted-foreground group-hover:text-foreground transition-colors" />
                        </h4>
                      </a>
                      
                      <div className="text-sm text-muted-foreground mt-2">
                        <p>
                          <span className="font-medium">Authors:</span> {paper.authors.join(', ')}
                        </p>
                        {paper.journal && (
                          <p>
                            <span className="font-medium">Journal:</span> {paper.journal}
                            {paper.year ? ` (${paper.year})` : ''}
                          </p>
                        )}
                        {paper.doi && (
                          <p>
                            <span className="font-medium">DOI:</span> {paper.doi}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <ExternalLink className="h-10 w-10 mx-auto mb-3 opacity-20" />
                  <p>No literature references available</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default PredictionResults;
