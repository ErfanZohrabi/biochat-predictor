
import { motion } from 'framer-motion';
import { BookOpen, Info, HelpCircle, Search, FileText, Upload, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import ChatAssistant from '@/components/ChatAssistant';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from 'react-router-dom';

const Documentation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-6 relative bg-gradient-to-b from-white to-bioez-50">
        <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Documentation</h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Learn how to use BioEZ to analyze protein functions and get the most out of our AI assistant.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Main Documentation Content */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation for larger screens */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:block"
            >
              <div className="sticky top-24 glass rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-bioez-600" />
                  <span>Documentation</span>
                </h3>
                <nav className="space-y-1">
                  <a href="#getting-started" className="block py-2 px-3 rounded-md hover:bg-bioez-50 text-sm font-medium">Getting Started</a>
                  <a href="#interpreting-results" className="block py-2 px-3 rounded-md hover:bg-bioez-50 text-sm font-medium">Interpreting Results</a>
                  <a href="#using-chat" className="block py-2 px-3 rounded-md hover:bg-bioez-50 text-sm font-medium">Using the AI Assistant</a>
                  <a href="#technical-details" className="block py-2 px-3 rounded-md hover:bg-bioez-50 text-sm font-medium">Technical Details</a>
                  <a href="#faq" className="block py-2 px-3 rounded-md hover:bg-bioez-50 text-sm font-medium">FAQ</a>
                </nav>
                
                <div className="mt-8 p-4 bg-bioez-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">Need help?</h4>
                  <p className="text-xs text-foreground/70 mb-3">
                    If you can't find what you're looking for, try asking our AI assistant or contact support.
                  </p>
                  <Link to="/contact">
                    <Button size="sm" variant="outline" className="w-full text-xs">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
            
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-3 space-y-10"
            >
              {/* Mobile Tabs */}
              <div className="lg:hidden mb-6">
                <Tabs defaultValue="getting-started">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="getting-started">Basics</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="getting-started" className="space-y-6">
                    <div id="getting-started">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <FileText className="mr-2 h-6 w-6 text-bioez-600" />
                        Getting Started
                      </h2>
                      <div className="space-y-6">
                        <div className="glass rounded-xl p-6">
                          <h3 className="text-xl font-semibold mb-3">Input Options</h3>
                          <p className="mb-4 text-foreground/80">
                            BioEZ accepts protein data in multiple formats to accommodate different research needs:
                          </p>
                          <ul className="space-y-4">
                            <li className="flex">
                              <div className="mt-1 mr-3 flex-shrink-0">
                                <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                                  <span className="text-bioez-600 text-sm font-medium">1</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">FASTA Sequences</h4>
                                <p className="text-sm text-foreground/70">
                                  Enter a protein sequence in FASTA format:
                                </p>
                                <pre className="bg-gray-100 p-3 rounded-md text-xs mt-2 overflow-x-auto">
                                  {">Protein1\nMVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNAL"}
                                </pre>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="mt-1 mr-3 flex-shrink-0">
                                <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                                  <span className="text-bioez-600 text-sm font-medium">2</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">PDB Files</h4>
                                <p className="text-sm text-foreground/70">
                                  Upload protein structure files in PDB format for more comprehensive analysis.
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Upload className="h-4 w-4 text-bioez-600" />
                                  <span className="text-xs">example.pdb (Max size: 10MB)</span>
                                </div>
                              </div>
                            </li>
                            <li className="flex">
                              <div className="mt-1 mr-3 flex-shrink-0">
                                <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                                  <span className="text-bioez-600 text-sm font-medium">3</span>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-medium mb-1">Plain Text Sequences</h4>
                                <p className="text-sm text-foreground/70">
                                  You can also enter raw amino acid sequences without FASTA headers.
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div id="interpreting-results">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <Search className="mr-2 h-6 w-6 text-bioez-600" />
                        Interpreting Results
                      </h2>
                      <div className="glass rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3">Understanding Your Predictions</h3>
                        <p className="mb-4 text-foreground/80">
                          After submitting your protein data, BioEZ will analyze it and provide predictions about its function:
                        </p>
                        <ul className="space-y-4">
                          <li className="flex">
                            <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium mb-1">Confidence Scores</h4>
                              <p className="text-sm text-foreground/70">
                                Results show predicted functions with confidence scores (0-100%). Higher scores indicate greater reliability of the prediction.
                              </p>
                            </div>
                          </li>
                          <li className="flex">
                            <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium mb-1">Functional Domains</h4>
                              <p className="text-sm text-foreground/70">
                                The system identifies specific regions (domains) within your protein that are associated with particular functions.
                              </p>
                            </div>
                          </li>
                          <li className="flex">
                            <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="font-medium mb-1">Literature References</h4>
                              <p className="text-sm text-foreground/70">
                                Links to scientific literature and database entries related to the predicted functions are provided for further research.
                              </p>
                            </div>
                          </li>
                        </ul>
                        
                        <div className="mt-6 bg-bioez-50 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2 flex items-center">
                            <Info className="h-4 w-4 mr-2 text-bioez-600" />
                            Pro Tip
                          </h4>
                          <p className="text-xs text-foreground/70">
                            Use our AI assistant to ask specific questions about your results, such as "What does this enzyme do?" or "How reliable is this prediction?"
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div id="using-chat">
                      <h2 className="text-2xl font-bold mb-4 flex items-center">
                        <HelpCircle className="mr-2 h-6 w-6 text-bioez-600" />
                        Using the AI Assistant
                      </h2>
                      <div className="glass rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3">Get the Most Out of BioEZ's AI</h3>
                        <p className="mb-4 text-foreground/80">
                          Our AI assistant is designed to help you understand your protein predictions and answer any questions you might have:
                        </p>
                        
                        <div className="space-y-3 mb-4">
                          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 max-w-[85%]">
                            <p className="text-sm font-medium mb-1">AI Assistant</p>
                            <p className="text-sm">I've analyzed your protein sequence. It appears to be a kinase with high confidence (95%). Can I help you understand what this means?</p>
                          </div>
                          
                          <div className="bg-bioez-500 text-white rounded-xl p-3 max-w-[85%] ml-auto">
                            <p className="text-sm font-medium mb-1">You</p>
                            <p className="text-sm">What does a kinase do in the cell?</p>
                          </div>
                          
                          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 max-w-[85%]">
                            <p className="text-sm font-medium mb-1">AI Assistant</p>
                            <p className="text-sm">Kinases are enzymes that transfer phosphate groups from ATP to specific substrates. This process, called phosphorylation, is a crucial mechanism for regulating protein activity and cellular signaling. Your protein likely plays a role in cell signaling pathways.</p>
                          </div>
                        </div>
                        
                        <h4 className="font-medium mt-6 mb-2">Effective Questions to Ask</h4>
                        <ul className="space-y-2">
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "What is the biological significance of this protein?"
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Explain the role of the [specific] domain."
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Why is the confidence score low for this prediction?"
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Can you recommend related proteins to investigate?"
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-6">
                    <div id="technical-details">
                      <h2 className="text-2xl font-bold mb-4">Technical Details</h2>
                      <div className="glass rounded-xl p-6">
                        <h3 className="text-xl font-semibold mb-3">About Our AI Models</h3>
                        <p className="mb-4 text-foreground/80">
                          BioEZ uses state-of-the-art machine learning approaches for protein function prediction:
                        </p>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-1">Training Data</h4>
                            <p className="text-sm text-foreground/70">
                              Our models are trained on extensive biological datasets including:
                            </p>
                            <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                              <li>UniProt database entries</li>
                              <li>Protein Data Bank (PDB) structures</li>
                              <li>Gene Ontology annotations</li>
                              <li>Published literature and experimental data</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Model Architecture</h4>
                            <p className="text-sm text-foreground/70">
                              We use a combination of deep learning approaches, including:
                            </p>
                            <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                              <li>Transformer-based sequence models</li>
                              <li>Graph neural networks for structural analysis</li>
                              <li>Ensemble methods to improve prediction accuracy</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium mb-1">Accuracy & Limitations</h4>
                            <p className="text-sm text-foreground/70">
                              Overall accuracy varies by protein family and available data:
                            </p>
                            <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                              <li>Well-studied protein families: >90% accuracy</li>
                              <li>Novel or understudied proteins: 60-80% accuracy</li>
                              <li>Limited by quality of input data and database coverage</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                          <h4 className="font-medium text-sm mb-2">Performance Metrics</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-white rounded-md p-3">
                              <div className="text-xs text-foreground/70">Precision</div>
                              <div className="text-lg font-bold text-bioez-600">92%</div>
                            </div>
                            <div className="bg-white rounded-md p-3">
                              <div className="text-xs text-foreground/70">Recall</div>
                              <div className="text-lg font-bold text-bioez-600">89%</div>
                            </div>
                            <div className="bg-white rounded-md p-3">
                              <div className="text-xs text-foreground/70">F1 Score</div>
                              <div className="text-lg font-bold text-bioez-600">90.5%</div>
                            </div>
                            <div className="bg-white rounded-md p-3">
                              <div className="text-xs text-foreground/70">MCC</div>
                              <div className="text-lg font-bold text-bioez-600">0.87</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="faq" className="space-y-6">
                    <div id="faq">
                      <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
                      <div className="glass rounded-xl p-6">
                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="item-1">
                            <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                            <AccordionContent>
                              BioEZ supports FASTA files (.fasta, .fa) for protein sequences, PDB files (.pdb) for protein structures, and plain text amino acid sequences.
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-2">
                            <AccordionTrigger>How accurate are the predictions?</AccordionTrigger>
                            <AccordionContent>
                              Accuracy varies by protein type and available reference data. Well-characterized protein families typically have prediction accuracies above 90%, while novel proteins may have lower confidence scores. Each prediction includes a confidence score to indicate reliability.
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-3">
                            <AccordionTrigger>Can I analyze multiple proteins at once?</AccordionTrigger>
                            <AccordionContent>
                              Yes, you can upload a multi-FASTA file containing several protein sequences. Each protein will be analyzed separately, and the results will be presented sequentially.
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-4">
                            <AccordionTrigger>Is my data kept private?</AccordionTrigger>
                            <AccordionContent>
                              Yes, your uploaded protein data is processed securely and not stored beyond your session unless you explicitly permit storage. We do not share your data with third parties. See our Privacy Policy for more details.
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-5">
                            <AccordionTrigger>How do I cite BioEZ in my research?</AccordionTrigger>
                            <AccordionContent>
                              If you use BioEZ in your research, please cite it as: "BioEZ. (2023). AI-powered protein function prediction platform. [Software]. Available at https://bioez.com"
                            </AccordionContent>
                          </AccordionItem>
                          
                          <AccordionItem value="item-6">
                            <AccordionTrigger>Can I download my prediction results?</AccordionTrigger>
                            <AccordionContent>
                              Yes, all prediction results can be downloaded in various formats including PDF reports, CSV files for data analysis, and JSON for programmatic use.
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              {/* Desktop Content */}
              <div className="hidden lg:block space-y-12">
                <div id="getting-started">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <FileText className="mr-2 h-6 w-6 text-bioez-600" />
                    Getting Started
                  </h2>
                  <div className="space-y-6">
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-3">Input Options</h3>
                      <p className="mb-4 text-foreground/80">
                        BioEZ accepts protein data in multiple formats to accommodate different research needs:
                      </p>
                      <ul className="space-y-4">
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">1</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">FASTA Sequences</h4>
                            <p className="text-sm text-foreground/70">
                              Enter a protein sequence in FASTA format:
                            </p>
                            <pre className="bg-gray-100 p-3 rounded-md text-xs mt-2 overflow-x-auto">
                              {">Protein1\nMVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVADALTNAVAHVDDMPNAL"}
                            </pre>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">2</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">PDB Files</h4>
                            <p className="text-sm text-foreground/70">
                              Upload protein structure files in PDB format for more comprehensive analysis.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Upload className="h-4 w-4 text-bioez-600" />
                              <span className="text-xs">example.pdb (Max size: 10MB)</span>
                            </div>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">3</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Plain Text Sequences</h4>
                            <p className="text-sm text-foreground/70">
                              You can also enter raw amino acid sequences without FASTA headers.
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="glass rounded-xl p-6">
                      <h3 className="text-xl font-semibold mb-3">Step-by-Step Process</h3>
                      <ol className="space-y-4">
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">1</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Input Your Protein Data</h4>
                            <p className="text-sm text-foreground/70">
                              Upload a file or paste your sequence in the provided input area.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">2</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Start the Analysis</h4>
                            <p className="text-sm text-foreground/70">
                              Click "Start Analysis" and our AI models will begin processing your data.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">3</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Review Results</h4>
                            <p className="text-sm text-foreground/70">
                              Examine the prediction results, including function, confidence scores, and domain information.
                            </p>
                          </div>
                        </li>
                        <li className="flex">
                          <div className="mt-1 mr-3 flex-shrink-0">
                            <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center">
                              <span className="text-bioez-600 text-sm font-medium">4</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-1">Chat for Deeper Insights</h4>
                            <p className="text-sm text-foreground/70">
                              Use the AI assistant to ask questions about your results and gain better understanding.
                            </p>
                          </div>
                        </li>
                      </ol>
                      
                      <div className="mt-6 flex justify-center">
                        <Link to="/">
                          <Button className="bg-bioez-gradient">
                            Try It Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div id="interpreting-results">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Search className="mr-2 h-6 w-6 text-bioez-600" />
                    Interpreting Results
                  </h2>
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">Understanding Your Predictions</h3>
                    <p className="mb-4 text-foreground/80">
                      After submitting your protein data, BioEZ will analyze it and provide predictions about its function:
                    </p>
                    <ul className="space-y-4">
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Confidence Scores</h4>
                          <p className="text-sm text-foreground/70">
                            Results show predicted functions with confidence scores (0-100%). Higher scores indicate greater reliability of the prediction.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Functional Domains</h4>
                          <p className="text-sm text-foreground/70">
                            The system identifies specific regions (domains) within your protein that are associated with particular functions.
                          </p>
                        </div>
                      </li>
                      <li className="flex">
                        <CheckCircle2 className="h-5 w-5 text-bioez-600 mr-3 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Literature References</h4>
                          <p className="text-sm text-foreground/70">
                            Links to scientific literature and database entries related to the predicted functions are provided for further research.
                          </p>
                        </div>
                      </li>
                    </ul>
                    
                    <div className="mt-6 bg-bioez-50 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2 flex items-center">
                        <Info className="h-4 w-4 mr-2 text-bioez-600" />
                        Pro Tip
                      </h4>
                      <p className="text-xs text-foreground/70">
                        Use our AI assistant to ask specific questions about your results, such as "What does this enzyme do?" or "How reliable is this prediction?"
                      </p>
                    </div>
                    
                    {/* Sample Result Card */}
                    <div className="mt-8 border border-bioez-100 rounded-xl overflow-hidden">
                      <div className="bg-bioez-50 p-3">
                        <h4 className="font-medium">Sample Prediction Result</h4>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="text-lg font-bold">Hemoglobin Beta Chain</h5>
                          <div className="text-sm font-medium text-success-600">
                            Confidence: 97%
                          </div>
                        </div>
                        <p className="text-sm text-foreground/80 mb-4">
                          Oxygen transport protein that carries oxygen from the lungs to tissues and carbon dioxide from tissues back to lungs.
                        </p>
                        <div className="mb-4">
                          <h6 className="text-sm font-medium mb-2">Functional Domains:</h6>
                          <div className="flex flex-wrap gap-2">
                            <div className="text-xs bg-bioez-50 text-bioez-700 px-2 py-1 rounded-md border border-bioez-100">
                              Globin domain (1-146)
                            </div>
                            <div className="text-xs bg-bioez-50 text-bioez-700 px-2 py-1 rounded-md border border-bioez-100">
                              Heme binding site (63-99)
                            </div>
                          </div>
                        </div>
                        <div>
                          <h6 className="text-sm font-medium mb-2">Related Literature:</h6>
                          <ul className="text-sm space-y-1">
                            <li className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-bioez-100 mr-2"></div>
                              <a href="#" className="text-bioez-600 hover:underline">Structure and function of hemoglobin</a>
                            </li>
                            <li className="flex items-center">
                              <div className="h-3 w-3 rounded-full bg-bioez-100 mr-2"></div>
                              <a href="#" className="text-bioez-600 hover:underline">Evolutionary conservation of globin proteins</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div id="using-chat">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <HelpCircle className="mr-2 h-6 w-6 text-bioez-600" />
                    Using the AI Assistant
                  </h2>
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">Get the Most Out of BioEZ's AI</h3>
                    <p className="mb-4 text-foreground/80">
                      Our AI assistant is designed to help you understand your protein predictions and answer any questions you might have:
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 max-w-[85%]">
                        <p className="text-sm font-medium mb-1">AI Assistant</p>
                        <p className="text-sm">I've analyzed your protein sequence. It appears to be a kinase with high confidence (95%). Can I help you understand what this means?</p>
                      </div>
                      
                      <div className="bg-bioez-500 text-white rounded-xl p-3 max-w-[85%] ml-auto">
                        <p className="text-sm font-medium mb-1">You</p>
                        <p className="text-sm">What does a kinase do in the cell?</p>
                      </div>
                      
                      <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-3 max-w-[85%]">
                        <p className="text-sm font-medium mb-1">AI Assistant</p>
                        <p className="text-sm">Kinases are enzymes that transfer phosphate groups from ATP to specific substrates. This process, called phosphorylation, is a crucial mechanism for regulating protein activity and cellular signaling. Your protein likely plays a role in cell signaling pathways.</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h4 className="font-medium mb-2">Effective Questions to Ask</h4>
                        <ul className="space-y-2">
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "What is the biological significance of this protein?"
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Explain the role of the [specific] domain."
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Why is the confidence score low for this prediction?"
                          </li>
                          <li className="text-sm flex items-start">
                            <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                              <span className="text-bioez-600 text-xs">•</span>
                            </div>
                            "Can you recommend related proteins to investigate?"
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">AI Assistant Capabilities</h4>
                        <ul className="space-y-2">
                          <li className="text-sm flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-bioez-600 mr-2 flex-shrink-0 mt-0.5" />
                            Explains protein functions in clear, simple language
                          </li>
                          <li className="text-sm flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-bioez-600 mr-2 flex-shrink-0 mt-0.5" />
                            Provides context from scientific literature
                          </li>
                          <li className="text-sm flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-bioez-600 mr-2 flex-shrink-0 mt-0.5" />
                            Helps interpret complex prediction results
                          </li>
                          <li className="text-sm flex items-start">
                            <CheckCircle2 className="h-4 w-4 text-bioez-600 mr-2 flex-shrink-0 mt-0.5" />
                            Guides you through using the platform effectively
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <Button className="bg-bioez-gradient flex items-center gap-2">
                        <HelpCircle className="h-4 w-4" />
                        Open AI Assistant
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div id="technical-details">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Info className="mr-2 h-6 w-6 text-bioez-600" />
                    Technical Details
                  </h2>
                  <div className="glass rounded-xl p-6">
                    <h3 className="text-xl font-semibold mb-3">About Our AI Models</h3>
                    <p className="mb-4 text-foreground/80">
                      BioEZ uses state-of-the-art machine learning approaches for protein function prediction:
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Training Data</h4>
                        <p className="text-sm text-foreground/70">
                          Our models are trained on extensive biological datasets including:
                        </p>
                        <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                          <li>UniProt database entries</li>
                          <li>Protein Data Bank (PDB) structures</li>
                          <li>Gene Ontology annotations</li>
                          <li>Published literature and experimental data</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Model Architecture</h4>
                        <p className="text-sm text-foreground/70">
                          We use a combination of deep learning approaches, including:
                        </p>
                        <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                          <li>Transformer-based sequence models</li>
                          <li>Graph neural networks for structural analysis</li>
                          <li>Ensemble methods to improve prediction accuracy</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-1">Accuracy & Limitations</h4>
                        <p className="text-sm text-foreground/70">
                          Overall accuracy varies by protein family and available data:
                        </p>
                        <ul className="list-disc ml-5 mt-1 text-sm text-foreground/70">
                          <li>Well-studied protein families: >90% accuracy</li>
                          <li>Novel or understudied proteins: 60-80% accuracy</li>
                          <li>Limited by quality of input data and database coverage</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-gray-100 p-4 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">Performance Metrics</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white rounded-md p-3">
                          <div className="text-xs text-foreground/70">Precision</div>
                          <div className="text-lg font-bold text-bioez-600">92%</div>
                        </div>
                        <div className="bg-white rounded-md p-3">
                          <div className="text-xs text-foreground/70">Recall</div>
                          <div className="text-lg font-bold text-bioez-600">89%</div>
                        </div>
                        <div className="bg-white rounded-md p-3">
                          <div className="text-xs text-foreground/70">F1 Score</div>
                          <div className="text-lg font-bold text-bioez-600">90.5%</div>
                        </div>
                        <div className="bg-white rounded-md p-3">
                          <div className="text-xs text-foreground/70">MCC</div>
                          <div className="text-lg font-bold text-bioez-600">0.87</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div id="faq">
                  <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <HelpCircle className="mr-2 h-6 w-6 text-bioez-600" />
                    Frequently Asked Questions
                  </h2>
                  <div className="glass rounded-xl p-6">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>What file formats are supported?</AccordionTrigger>
                        <AccordionContent>
                          BioEZ supports FASTA files (.fasta, .fa) for protein sequences, PDB files (.pdb) for protein structures, and plain text amino acid sequences.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How accurate are the predictions?</AccordionTrigger>
                        <AccordionContent>
                          Accuracy varies by protein type and available reference data. Well-characterized protein families typically have prediction accuracies above 90%, while novel proteins may have lower confidence scores. Each prediction includes a confidence score to indicate reliability.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-3">
                        <AccordionTrigger>Can I analyze multiple proteins at once?</AccordionTrigger>
                        <AccordionContent>
                          Yes, you can upload a multi-FASTA file containing several protein sequences. Each protein will be analyzed separately, and the results will be presented sequentially.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-4">
                        <AccordionTrigger>Is my data kept private?</AccordionTrigger>
                        <AccordionContent>
                          Yes, your uploaded protein data is processed securely and not stored beyond your session unless you explicitly permit storage. We do not share your data with third parties. See our Privacy Policy for more details.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-5">
                        <AccordionTrigger>How do I cite BioEZ in my research?</AccordionTrigger>
                        <AccordionContent>
                          If you use BioEZ in your research, please cite it as: "BioEZ. (2023). AI-powered protein function prediction platform. [Software]. Available at https://bioez.com"
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-6">
                        <AccordionTrigger>Can I download my prediction results?</AccordionTrigger>
                        <AccordionContent>
                          Yes, all prediction results can be downloaded in various formats including PDF reports, CSV files for data analysis, and JSON for programmatic use.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-7">
                        <AccordionTrigger>Are there usage limits?</AccordionTrigger>
                        <AccordionContent>
                          The basic version allows up to 10 predictions per day. For more extensive usage, please consider our professional or enterprise plans, or contact us for custom solutions.
                        </AccordionContent>
                      </AccordionItem>
                      
                      <AccordionItem value="item-8">
                        <AccordionTrigger>Can I programmatically access BioEZ?</AccordionTrigger>
                        <AccordionContent>
                          Yes, we offer an API for programmatic access. This allows integration with your existing workflow, lab information systems, or custom applications. Please see our API documentation for details.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 px-6 bg-bioez-50/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="text-foreground/70 mb-6">
            Subscribe to our newsletter for updates on new features, improvements, and protein prediction research.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="px-4 py-2 rounded-md border border-gray-300 flex-grow"
            />
            <Button className="bg-bioez-gradient whitespace-nowrap">
              Subscribe
            </Button>
          </div>
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

export default Documentation;
