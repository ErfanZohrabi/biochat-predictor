
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-dot-pattern"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className={`absolute -top-40 -right-40 w-96 h-96 rounded-full bg-bioez-200/20 blur-3xl transition-all duration-1000 ease-in-out ${isLoaded ? 'opacity-70' : 'opacity-0'}`}
        ></div>
        <div 
          className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-bioez-300/20 blur-3xl transition-all duration-1000 delay-300 ease-in-out ${isLoaded ? 'opacity-70' : 'opacity-0'}`}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto text-center z-10 px-4 md:px-8">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 backdrop-blur border border-bioez-100 shadow-sm mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-bioez-500 mr-2"></span>
          <span className="text-sm font-medium text-bioez-700">Revolutionary Protein Function Prediction</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold leading-tight md:leading-tight tracking-tight mb-6"
        >
          Unlock Protein <span className="text-gradient">Function</span> with Advanced AI
        </motion.h1>

        {/* Subheading */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-foreground/80 max-w-3xl mx-auto mb-10"
        >
          BioEZ leverages cutting-edge AI models to predict protein function with exceptional accuracy. Upload your protein sequences and chat with our assistant for detailed insights.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Button 
            size="lg" 
            className="bg-bioez-gradient hover:opacity-90 transition-opacity text-white font-medium px-8 py-6 shadow-md group"
          >
            <span>Start Predicting</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 font-medium px-8 py-6 backdrop-blur-sm hover:bg-white/50"
          >
            Watch Demo
          </Button>
        </motion.div>

        {/* 3D Protein Visualization Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mx-auto max-w-4xl perspective-1000"
        >
          <div className="w-full h-64 md:h-96 glass rounded-2xl p-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-bioez-100/40 to-bioez-200/40 mix-blend-overlay"></div>
            
            <div className="h-full w-full flex items-center justify-center">
              <div className="relative w-32 h-32 md:w-64 md:h-64 animate-spin protein-3d animate-float">
                <div className="absolute inset-0 rounded-full border-8 border-dashed border-bioez-300 opacity-20"></div>
                <div className="absolute inset-2 rounded-full border-8 border-dashed border-bioez-400 opacity-30 rotate-45"></div>
                <div className="absolute inset-4 rounded-full border-8 border-dashed border-bioez-500 opacity-40 rotate-90"></div>
                <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                  <div className="w-16 h-16 md:w-32 md:h-32 bg-bioez-600/30 rounded-full blur-md animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-6 left-6 right-6 flex justify-between">
              <div className="text-xs font-mono bg-white/80 backdrop-blur rounded px-2 py-1 text-bioez-800">
                protein_id: EZ1247
              </div>
              <div className="text-xs font-mono bg-bioez-500/10 backdrop-blur rounded px-2 py-1 text-bioez-800">
                confidence: 97.8%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="absolute bottom-10 left-0 right-0 flex justify-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm text-foreground/60 mb-2">Scroll to discover</span>
            <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex justify-center p-1">
              <div className="w-1.5 h-1.5 bg-bioez-600 rounded-full animate-bounce"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
