
import { motion } from 'framer-motion';
import { CheckCircle2, CopyIcon, Download, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface PredictionResult {
  id: string;
  proteinName: string;
  function: string;
  confidence: number;
  domains: { name: string; start: number; end: number; confidence: number }[];
  literature: { title: string; url: string }[];
}

interface PredictionResultsProps {
  result?: PredictionResult;
  isLoading?: boolean;
}

const PredictionResults = ({ result, isLoading = false }: PredictionResultsProps) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-8 animate-pulse">
          <div className="h-8 bg-muted rounded-md mb-6 w-3/4"></div>
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

  if (!result) {
    return null;
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 70) return 'text-amber-500';
    return 'text-orange-500';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
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
              title="Copy Results"
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 px-2 text-white hover:bg-white/20"
              title="Download Results"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold">{result.proteinName}</h3>
              <div className={cn(
                "inline-flex items-center text-sm font-medium",
                getConfidenceColor(result.confidence)
              )}>
                Confidence: {result.confidence}%
              </div>
            </div>
            <p className="text-foreground/80 mb-4">{result.function}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {result.domains.map((domain) => (
                <div 
                  key={domain.name}
                  className="text-xs bg-bioez-50 text-bioez-700 px-2 py-1 rounded-md border border-bioez-100"
                >
                  {domain.name} ({domain.start}-{domain.end})
                </div>
              ))}
            </div>
          </div>
          
          <div className="border-t border-border pt-4">
            <h4 className="font-medium mb-3">Related Literature</h4>
            <ul className="space-y-2">
              {result.literature.map((paper) => (
                <li key={paper.title} className="text-sm">
                  <a 
                    href={paper.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-start hover:text-bioez-600 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{paper.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={() => {
                // Handle New Analysis
                console.log('Starting new analysis');
              }}
            >
              New Analysis
            </Button>
            <Button 
              className="bg-bioez-gradient"
              onClick={() => {
                // Handle Ask AI
                console.log('Opening AI Chat Assistant');
              }}
            >
              Ask AI Assistant
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PredictionResults;
