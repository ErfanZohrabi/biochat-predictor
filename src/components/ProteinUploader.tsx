
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from '@/lib/utils';

interface ProteinUploaderProps {
  onUpload?: (file: File) => void;
}

const ProteinUploader = ({ onUpload }: ProteinUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const validateFile = (file: File): boolean => {
    // Validate file type (FASTA, PDB, etc.)
    const validTypes = ['.fasta', '.fa', '.pdb', '.txt'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    
    if (!validTypes.includes(fileExt)) {
      setError(`Invalid file type. Please upload a FASTA, PDB, or text file.`);
      return false;
    }
    
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError(`File is too large. Maximum size is 10MB.`);
      return false;
    }
    
    setError(null);
    return true;
  };

  const processFile = (file: File) => {
    if (validateFile(file)) {
      setFile(file);
      if (onUpload) {
        onUpload(file);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-8 transition-all duration-300 text-center",
          isDragging 
            ? "border-bioez-500 bg-bioez-50" 
            : file 
              ? "border-success-500 bg-success-50" 
              : error 
                ? "border-destructive bg-destructive/5" 
                : "border-muted-foreground/20 hover:border-bioez-300 hover:bg-bioez-50/30"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          accept=".fasta,.fa,.pdb,.txt"
        />
        
        <div className="flex flex-col items-center justify-center py-6">
          {file ? (
            <>
              <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mb-4">
                <CheckCircle2 className="h-8 w-8 text-success-500" />
              </div>
              <h3 className="text-xl font-medium mb-2">File uploaded successfully</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs">({(file.size / 1024).toFixed(2)} KB)</span>
              </div>
              <Button 
                className="mt-6 bg-bioez-gradient"
                onClick={() => {
                  // Handle analysis start
                  console.log('Starting analysis of:', file.name);
                }}
              >
                Start Analysis
              </Button>
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
                onClick={() => setError(null)}
              >
                Try Again
              </Button>
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
