
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { File, Clock, ChevronDown, Search, Filter, Download } from 'lucide-react';
import Header from '@/components/Header';
import ProteinUploader from '@/components/ProteinUploader';
import ChatAssistant from '@/components/ChatAssistant';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

interface HistoryItem {
  id: string;
  date: Date;
  name: string;
  format: string;
  confidence: number;
  function: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: '1',
    date: new Date(2023, 6, 15),
    name: 'Human Insulin',
    format: 'FASTA',
    confidence: 98,
    function: 'Hormone regulating glucose metabolism'
  },
  {
    id: '2',
    date: new Date(2023, 6, 12),
    name: 'BRCA1',
    format: 'PDB',
    confidence: 92,
    function: 'DNA repair and tumor suppression'
  },
  {
    id: '3',
    date: new Date(2023, 6, 10),
    name: 'Hemoglobin Alpha',
    format: 'FASTA',
    confidence: 97,
    function: 'Oxygen transport protein'
  },
  {
    id: '4',
    date: new Date(2023, 6, 8),
    name: 'Catalase',
    format: 'TXT',
    confidence: 94,
    function: 'Enzyme that catalyzes hydrogen peroxide decomposition'
  },
  {
    id: '5',
    date: new Date(2023, 6, 5),
    name: 'Lysozyme',
    format: 'FASTA',
    confidence: 95,
    function: 'Antibacterial enzyme that damages bacterial cell walls'
  }
];

const Dashboard = () => {
  const [history, setHistory] = useState<HistoryItem[]>(mockHistory);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.function.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFormat = !selectedFormat || item.format === selectedFormat;
    
    return matchesSearch && matchesFormat;
  });

  const formatOptions = ['FASTA', 'PDB', 'TXT'];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success-600';
    if (confidence >= 70) return 'text-amber-500';
    return 'text-orange-500';
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
            <h1 className="text-2xl font-bold mb-6">Start New Analysis</h1>
            <ProteinUploader />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <h2 className="text-2xl font-bold">Analysis History</h2>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search proteins..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-white"
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="gap-2"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="h-4 w-4" />
                    Filter
                    <ChevronDown className={cn(
                      "h-4 w-4 transition-transform",
                      showFilters && "rotate-180"
                    )} />
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mb-6 p-4 bg-muted/30 rounded-lg overflow-hidden"
              >
                <div className="flex flex-wrap gap-3">
                  <span className="text-sm font-medium">Format:</span>
                  {formatOptions.map(format => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(selectedFormat === format ? null : format)}
                      className={cn(
                        "text-sm px-3 py-1 rounded-full transition-colors",
                        selectedFormat === format 
                          ? "bg-bioez-500 text-white" 
                          : "bg-white hover:bg-bioez-50"
                      )}
                    >
                      {format}
                    </button>
                  ))}
                  
                  {selectedFormat && (
                    <button
                      onClick={() => setSelectedFormat(null)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              </motion.div>
            )}
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Name</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Format</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Confidence</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Function</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredHistory.length > 0 ? (
                    filteredHistory.map((item) => (
                      <motion.tr 
                        key={item.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-muted/10 transition-colors group"
                      >
                        <td className="py-3 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(item.date)}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{item.name}</td>
                        <td className="py-3 px-4">
                          <div className="inline-flex items-center px-2 py-1 rounded-md bg-bioez-50 text-bioez-700 text-xs">
                            <File className="h-3 w-3 mr-1" />
                            {item.format}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={cn(
                            "font-medium",
                            getConfidenceColor(item.confidence)
                          )}>
                            {item.confidence}%
                          </span>
                        </td>
                        <td className="py-3 px-4 max-w-xs truncate">{item.function}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-muted-foreground hover:text-foreground"
                            >
                              View
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2 text-muted-foreground hover:text-foreground"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-16 text-center text-muted-foreground">
                        No results found. Try adjusting your search or filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {filteredHistory.length > 0 && (
              <div className="mt-6 text-sm text-muted-foreground text-center">
                Showing {filteredHistory.length} of {history.length} results
              </div>
            )}
          </motion.div>
        </div>
      </main>
      
      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Dashboard;
