
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Database, Activity, Brain, FileText } from 'lucide-react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import ProteinUploader from '@/components/ProteinUploader';
import PredictionResults from '@/components/PredictionResults';
import ChatAssistant from '@/components/ChatAssistant';

const sampleResult = {
  id: 'sample-1',
  proteinName: 'Hemoglobin Beta Chain',
  function: 'Oxygen transport protein that carries oxygen from the lungs to tissues and carbon dioxide from tissues back to lungs',
  confidence: 97,
  domains: [
    { name: 'Globin domain', start: 1, end: 146, confidence: 99 },
    { name: 'Heme binding site', start: 63, end: 99, confidence: 98 }
  ],
  literature: [
    { title: 'Structure and function of hemoglobin', url: '#' },
    { title: 'Evolutionary conservation of globin proteins', url: '#' }
  ]
};

const mockPredict = (file: File) => {
  // Simulating prediction process
  console.log(`Processing file: ${file.name}`);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sampleResult);
    }, 3000);
  });
};

const Index = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<typeof sampleResult | null>(null);

  const handleUpload = (file: File) => {
    setUploadedFile(file);
    setIsPredicting(true);
    setPredictionResult(null);
    
    // Simulate prediction process
    mockPredict(file).then((result) => {
      setPredictionResult(result as typeof sampleResult);
      setIsPredicting(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 px-6 relative">
        <div className="bg-dot-pattern absolute inset-0 opacity-50"></div>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Advanced Protein Analysis Made <span className="text-gradient">Simple</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              BioEZ combines state-of-the-art AI models with an intuitive interface to deliver accurate protein function predictions.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Brain className="h-6 w-6" />}
              title="AI-Powered Predictions"
              description="Advanced deep learning models trained on comprehensive protein databases for accurate function prediction."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Activity className="h-6 w-6" />}
              title="Detailed Analysis"
              description="Get comprehensive insights including functional domains, binding sites, and confidence scores."
              delay={0.2}
            />
            <FeatureCard 
              icon={<Database className="h-6 w-6" />}
              title="Multiple Input Formats"
              description="Upload protein data in various formats including FASTA, PDB, or raw amino acid sequences."
              delay={0.3}
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Scientific References"
              description="Access relevant literature and database entries related to your protein's predicted functions."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Prediction Tool Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-bioez-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Try Our Prediction Tool
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground max-w-3xl mx-auto"
            >
              Upload your protein sequence or structure and get instant predictions about its function.
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ProteinUploader onUpload={handleUpload} />
            
            {(isPredicting || predictionResult) && (
              <div className="mt-10">
                <PredictionResults 
                  result={predictionResult as typeof sampleResult} 
                  isLoading={isPredicting} 
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-bioez-gradient flex items-center justify-center">
                  <span className="text-white font-bold text-sm">B</span>
                </div>
                <span className="font-bold text-xl">BioEZ</span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Advanced protein function prediction powered by AI
              </p>
            </div>
            
            <div className="flex flex-col md:flex-row gap-8">
              <div>
                <h4 className="font-medium mb-3">Platform</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Features</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Documentation</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Tutorials</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Research</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Blog</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Company</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">About</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Contact</a></li>
                  <li><a href="#" className="text-sm text-muted-foreground hover:text-bioez-600 transition-colors">Privacy</a></li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="mt-10 pt-6 border-t border-border text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BioEZ. All rights reserved.
          </div>
        </div>
      </footer>
      
      {/* Chat Assistant */}
      <ChatAssistant />
    </div>
  );
};

export default Index;
