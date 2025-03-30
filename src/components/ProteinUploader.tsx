import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle2, Dna, X } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';
import { useProteinStore } from '@/lib/stores/proteinStore';
import { useToast } from '@/hooks/use-toast';

// Supported file formats
const SUPPORTED_FORMATS = {
  'text/plain': ['.txt', '.fasta', '.fa', '.seq'],
  'application/octet-stream': ['.pdb'],
  'chemical/x-pdb': ['.pdb'],
  'text/x-fasta': ['.fasta', '.fa'],
};

// Extract file format
const getFileFormat = (file: File): 'fasta' | 'pdb' | 'raw' | null => {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdb')) return 'pdb';
  if (name.endsWith('.fasta') || name.endsWith('.fa')) return 'fasta';
  if (name.endsWith('.txt') || name.endsWith('.seq')) return 'raw';
  return null;
};

const ProteinUploader = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { 
    currentProtein, 
    setCurrentProtein,
    isPredicting,
    predictProtein,
    predictionError,
  } = useProteinStore();

  // Handle file drop with react-dropzone
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      setError('No valid files were uploaded.');
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File is too large. Maximum size is 10MB.');
      return;
    }
    
    // Determine format from file extension
    const format = getFileFormat(file);
    if (!format) {
      setError('Unsupported file format. Please upload a FASTA, PDB, or text file.');
      return;
    }
    
    // Read file content
    setIsProcessing(true);
    try {
      const sequence = await readFileAsText(file);
      
      if (!sequence.trim()) {
        throw new Error('File appears to be empty or contains no valid sequence data.');
      }
      
      // Store in state
      setCurrentProtein(file, sequence, format);
      
      toast({
        title: 'File uploaded successfully',
        description: `${file.name} is ready for analysis.`,
      });
    } catch (err) {
      console.error('Error reading file:', err);
      setError(err instanceof Error ? err.message : 'Failed to read file content.');
    } finally {
      setIsProcessing(false);
    }
  }, [setCurrentProtein, toast]);
  
  // Configure dropzone
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: SUPPORTED_FORMATS,
    multiple: false,
    disabled: isProcessing || isPredicting,
  });

  // Helper to read file content
  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  // Handle analysis start
  const handleStartAnalysis = async () => {
    if (!currentProtein.file || !currentProtein.sequence) {
      setError('Please upload a valid protein file first.');
      return;
    }
    
    try {
      await predictProtein({
        includeDomains: true,
        includeStructure: true,
      });
    } catch (err) {
      console.error('Prediction error:', err);
      // Error is already handled in the store
    }
  };

  // Reset current protein
  const handleReset = () => {
    setCurrentProtein(null, '', null);
    setError(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative rounded-2xl p-8 transition-all duration-300 text-center",
          error 
            ? "border-2 border-dashed border-destructive bg-destructive/5" 
            : currentProtein.file
              ? "border-2 border-dashed border-success-500 bg-success-50" 
              : isDragActive
                ? isDragAccept 
                  ? "border-2 border-dashed border-bioez-500 bg-bioez-50" 
                  : isDragReject
                    ? "border-2 border-dashed border-destructive bg-destructive/5"
                    : "border-2 border-dashed border-bioez-500 bg-bioez-50"
                : "border-2 border-dashed border-muted-foreground/20 hover:border-bioez-300 hover:bg-bioez-50/30"
        )}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center justify-center py-6">
          {isProcessing ? (
            <>
              <div className="w-16 h-16 rounded-full bg-bioez-50 flex items-center justify-center mb-4">
                <Dna className="h-8 w-8 text-bioez-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-medium mb-2">Processing file</h3>
              <p className="text-muted-foreground">Please wait while we read your protein data...</p>
            </>
          ) : error ? (
            <>
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-medium mb-2">Upload Error</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  setError(null);
                }}
              >
                Try Again
              </Button>
            </>
          ) : currentProtein.file ? (
            <>
              <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-success-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">File uploaded successfully</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{currentProtein.file.name}</span>
                <span className="text-xs">({(currentProtein.file.size / 1024).toFixed(2)} KB)</span>
              </div>
              
              <div className="flex items-center gap-3 mt-6">
                <Button 
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleReset();
                  }}
                >
                  <X className="mr-2 h-4 w-4" />
                  Cancel
                </Button>
                <Button 
                  className="bg-bioez-gradient"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartAnalysis();
                  }}
                  disabled={isPredicting}
                >
                  {isPredicting ? (
                    <>
                      <Dna className="mr-2 h-4 w-4 animate-pulse" />
                      Analyzing...
                    </>
                  ) : (
                    <>Start Analysis</>
                  )}
                </Button>
              </div>
              
              {predictionError && (
                <div className="mt-4 text-sm text-destructive">
                  <AlertCircle className="inline-block mr-1 h-4 w-4" />
                  {predictionError}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-bioez-100 flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-bioez-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Upload your protein file</h3>
              <p className="text-muted-foreground mb-4">
                Drag and drop your file here, or click to browse
              </p>
              <div className="text-xs text-muted-foreground/80">
                Supported formats: FASTA, PDB, TXT (Max 10MB)
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProteinUploader;
