
import { motion } from 'framer-motion';
import { File, Database, Info, MessageSquare, ExternalLink, Search } from 'lucide-react';
import Header from '@/components/Header';
import ChatAssistant from '@/components/ChatAssistant';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Documentation = () => {
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Learn how to use BioEZ effectively for protein analysis and prediction.
            </p>
            
            <Tabs defaultValue="guide" className="w-full">
              <TabsList className="grid grid-cols-1 md:grid-cols-4 mb-8">
                <TabsTrigger value="guide" className="text-center py-3">
                  <File className="h-4 w-4 mr-2" />
                  User Guide
                </TabsTrigger>
                <TabsTrigger value="technical" className="text-center py-3">
                  <Database className="h-4 w-4 mr-2" />
                  Technical Details
                </TabsTrigger>
                <TabsTrigger value="faq" className="text-center py-3">
                  <Info className="h-4 w-4 mr-2" />
                  FAQ
                </TabsTrigger>
                <TabsTrigger value="assistance" className="text-center py-3">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Chat Assistant
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="guide" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-medium">Input Options</h3>
                      <p className="text-muted-foreground">
                        BioEZ accepts protein data in several formats:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>FASTA sequences</li>
                        <li>PDB structure files</li>
                        <li>Raw amino acid sequences</li>
                      </ul>
                      
                      <div className="bg-muted/30 p-4 rounded-md">
                        <h4 className="font-medium mb-2">Example FASTA format:</h4>
                        <pre className="text-sm overflow-x-auto p-2 bg-black/5 rounded">
                          <code>{`{'>'} Protein1
MVLSPADKTNVKAAWGKVGAHAGEYGAEALERMFLSFPTTKTYFPHFDLSHGSAQVKGHGKKVAD
ALTNAVAHVDDMPNALSALSDLHAHKLRVDPVNFKLLSHCLLVTLAAHLPAEFTPAVHASLDKFL
ASVSTVLTSKYR`}</code>
                        </pre>
                      </div>
                    </div>
                    
                    <div className="bg-bioez-50 rounded-md p-6 space-y-4">
                      <h3 className="text-xl font-medium">Quick Start</h3>
                      <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                        <li>Navigate to the <span className="font-medium text-foreground">Home</span> page</li>
                        <li>Scroll down to the <span className="font-medium text-foreground">Prediction Tool</span> section</li>
                        <li>Upload your protein file or paste your sequence</li>
                        <li>Click <span className="font-medium text-foreground">Analyze Protein</span></li>
                        <li>View your results in the panel below</li>
                      </ol>
                      
                      <Button className="w-full mt-4 bg-bioez-gradient">
                        Try it now
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Interpreting Results</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      After analysis, BioEZ provides detailed insights about your protein:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-bioez-100 flex items-center justify-center">
                            <span className="font-bold text-bioez-600">1</span>
                          </div>
                          <h3 className="font-medium">Function Prediction</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Primary predicted function with confidence score (0-100%).
                          Higher scores indicate greater reliability.
                        </p>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-bioez-100 flex items-center justify-center">
                            <span className="font-bold text-bioez-600">2</span>
                          </div>
                          <h3 className="font-medium">Domain Analysis</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Identified functional domains with position information and
                          confidence levels for each domain.
                        </p>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4 space-y-3">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 rounded-full bg-bioez-100 flex items-center justify-center">
                            <span className="font-bold text-bioez-600">3</span>
                          </div>
                          <h3 className="font-medium">Literature References</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Relevant scientific literature related to your protein's
                          function and properties with direct links.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-5 bg-muted/30 rounded-lg">
                      <h3 className="text-lg font-medium mb-3">Understanding Confidence Scores</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="font-medium">50-69%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Low confidence, consider as tentative prediction</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="h-3 w-3 rounded-full bg-orange-500"></div>
                            <span className="font-medium">70-79%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Moderate confidence, likely correct</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                            <span className="font-medium">80-89%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">High confidence, generally reliable</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="font-medium">90-100%</span>
                          </div>
                          <p className="text-sm text-muted-foreground">Very high confidence, strongly reliable</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Using the Chat Assistant</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        BioEZ features an AI-powered chat assistant to help you understand your protein analysis results and answer biological questions.
                      </p>
                      
                      <h3 className="text-xl font-medium mt-6">Effective Questions</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start space-x-3">
                          <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5">
                            <span className="text-bioez-600 text-sm">?</span>
                          </div>
                          <div>
                            <p className="font-medium">"What does this enzyme do?"</p>
                            <p className="text-sm text-muted-foreground">Gets a detailed explanation of function</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5">
                            <span className="text-bioez-600 text-sm">?</span>
                          </div>
                          <div>
                            <p className="font-medium">"Why is the confidence score low?"</p>
                            <p className="text-sm text-muted-foreground">Explains factors affecting prediction confidence</p>
                          </div>
                        </li>
                        <li className="flex items-start space-x-3">
                          <div className="h-6 w-6 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5">
                            <span className="text-bioez-600 text-sm">?</span>
                          </div>
                          <div>
                            <p className="font-medium">"What other proteins are similar to this one?"</p>
                            <p className="text-sm text-muted-foreground">Provides information on homologous proteins</p>
                          </div>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                      <h3 className="text-lg font-medium mb-4">Chat Example</h3>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                            <span className="text-foreground font-medium">U</span>
                          </div>
                          <div className="bg-muted/30 rounded-lg p-3 text-sm">
                            Can you explain what the Globin domain in my protein does?
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="h-8 w-8 rounded-full bg-bioez-100 flex items-center justify-center shrink-0">
                            <span className="text-bioez-600 font-medium">AI</span>
                          </div>
                          <div className="bg-bioez-50 rounded-lg p-3 text-sm">
                            <p>The Globin domain is a protein structural motif that contains a heme group, which can bind oxygen molecules. This domain is most famously found in hemoglobin and myoglobin.</p>
                            <p className="mt-2">In your protein, the Globin domain (residues 1-146) is responsible for oxygen binding and transport. The high confidence score (99%) indicates this is a very reliable prediction.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="technical" className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">AI Model Details</h2>
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      BioEZ utilizes state-of-the-art deep learning models to analyze protein sequences and structures.
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-muted/30">
                            <th className="border border-border p-3 text-left">Feature</th>
                            <th className="border border-border p-3 text-left">Model Type</th>
                            <th className="border border-border p-3 text-left">Training Data</th>
                            <th className="border border-border p-3 text-left">Accuracy</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-3">Function Prediction</td>
                            <td className="border border-border p-3">Transformer-based</td>
                            <td className="border border-border p-3">UniProt + Gene Ontology</td>
                            <td className="border border-border p-3">92% (benchmark)</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-3">Domain Recognition</td>
                            <td className="border border-border p-3">Convolutional Neural Network</td>
                            <td className="border border-border p-3">Pfam + InterPro</td>
                            <td className="border border-border p-3">88% (benchmark)</td>
                          </tr>
                          <tr>
                            <td className="border border-border p-3">Literature Matching</td>
                            <td className="border border-border p-3">NLP + Knowledge Graph</td>
                            <td className="border border-border p-3">PubMed + PDB</td>
                            <td className="border border-border p-3">85% (relevance)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Data Sources</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-5 space-y-3">
                      <h3 className="text-xl font-medium">Training Databases</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">UniProtKB/Swiss-Prot</span>
                          <a href="https://www.uniprot.org/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center text-bioez-600 hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Link
                          </a>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Protein Data Bank (PDB)</span>
                          <a href="https://www.rcsb.org/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center text-bioez-600 hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Link
                          </a>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Gene Ontology (GO)</span>
                          <a href="http://geneontology.org/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center text-bioez-600 hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Link
                          </a>
                        </li>
                        <li className="flex items-center justify-between">
                          <span className="text-muted-foreground">Pfam Database</span>
                          <a href="https://pfam.xfam.org/" target="_blank" rel="noopener noreferrer" className="text-sm flex items-center text-bioez-600 hover:underline">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            Link
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-border rounded-lg p-5 space-y-3">
                      <h3 className="text-xl font-medium">Model Validation</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Our models are validated using standard benchmarks to ensure high-quality predictions:
                      </p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-bioez-600 text-xs">✓</span>
                          </div>
                          <span className="text-muted-foreground">Cross-validation on held-out test data</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-bioez-600 text-xs">✓</span>
                          </div>
                          <span className="text-muted-foreground">CAFA (Critical Assessment of Function Annotation) metrics</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="h-5 w-5 rounded-full bg-bioez-100 flex items-center justify-center mt-0.5 shrink-0">
                            <span className="text-bioez-600 text-xs">✓</span>
                          </div>
                          <span className="text-muted-foreground">Independent validation on newly characterized proteins</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-4">Technical Limitations</h2>
                  <div className="bg-muted/30 rounded-lg p-6 space-y-4">
                    <p className="text-muted-foreground">
                      While BioEZ delivers powerful predictions, users should be aware of the following limitations:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white p-4 rounded-md border border-border">
                        <h3 className="font-medium mb-2">Novel Proteins</h3>
                        <p className="text-sm text-muted-foreground">
                          Highly novel proteins with no close homologs in training databases may receive lower confidence predictions.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border border-border">
                        <h3 className="font-medium mb-2">Sequence Length</h3>
                        <p className="text-sm text-muted-foreground">
                          Extremely short (&lt;30 amino acids) or very long (&gt;2000 amino acids) sequences may have reduced prediction accuracy.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border border-border">
                        <h3 className="font-medium mb-2">Multi-functional Proteins</h3>
                        <p className="text-sm text-muted-foreground">
                          Proteins with multiple distinct functions may have some functions predicted with lower confidence than their primary function.
                        </p>
                      </div>
                      
                      <div className="bg-white p-4 rounded-md border border-border">
                        <h3 className="font-medium mb-2">Post-translational Modifications</h3>
                        <p className="text-sm text-muted-foreground">
                          Function predictions do not account for all possible post-translational modifications that may affect function.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="faq" className="space-y-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-medium">
                      What file formats are supported?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>BioEZ currently supports the following file formats:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>FASTA (.fasta, .fa) for amino acid sequences</li>
                        <li>PDB (.pdb) for 3D protein structures</li>
                        <li>Text files (.txt) containing raw amino acid sequences</li>
                      </ul>
                      <p className="mt-2">You can also directly paste your sequence into the input field without uploading a file.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-lg font-medium">
                      How accurate are the predictions?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Prediction accuracy varies based on several factors, including protein type, available similar proteins in our training dataset, and sequence quality.
                      </p>
                      <p className="mt-2">
                        Overall, our models achieve benchmark accuracy rates of 85-92% for function prediction and 88% for domain recognition. Each prediction includes a confidence score to help you assess reliability.
                      </p>
                      <p className="mt-2">
                        For well-studied protein families, accuracy tends to be higher (90%+), while novel or unusual proteins may have lower prediction confidence.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-lg font-medium">
                      How long does analysis take?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        For most proteins, analysis completes within 10-30 seconds. Processing time depends on:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Sequence length (longer sequences take more time)</li>
                        <li>Input format (3D structures may take longer than sequences)</li>
                        <li>Current server load</li>
                      </ul>
                      <p className="mt-2">
                        Very large proteins (&gt;1000 amino acids) or complex structures may take up to 1-2 minutes to process.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-lg font-medium">
                      Is my protein data kept private?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Yes. We take data privacy seriously:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>Your protein sequences and structures are processed securely</li>
                        <li>Data is not stored beyond your session unless you explicitly save your results</li>
                        <li>We do not share your protein data with third parties</li>
                        <li>All transmissions are encrypted using HTTPS</li>
                      </ul>
                      <p className="mt-2">
                        For research purposes, we may collect anonymized statistics about prediction accuracy and usage patterns to improve our services.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-lg font-medium">
                      Can I use BioEZ for commercial research?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Yes, BioEZ can be used for both academic and commercial research:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>The basic version is free for all users</li>
                        <li>For high-volume commercial use, we offer premium plans with additional features</li>
                        <li>Results can be used in publications with proper citation</li>
                      </ul>
                      <p className="mt-2">
                        Please refer to our Terms of Service for complete details on usage rights and limitations.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-lg font-medium">
                      How do I cite BioEZ in my publication?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        If you use BioEZ in your research, please cite us as follows:
                      </p>
                      <div className="bg-muted/30 p-3 rounded-md mt-2 text-sm">
                        <p>
                          BioEZ Team (2023). BioEZ: An AI-powered platform for protein function prediction. 
                          Available at: https://bioez.com
                        </p>
                      </div>
                      <p className="mt-2">
                        For specific models or features, please refer to our publication page for the most appropriate citations.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-lg font-medium">
                      Can I download or export my results?
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <p>
                        Yes, you can export your results in several formats:
                      </p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>JSON format (for programmatic use)</li>
                        <li>CSV spreadsheet (for data analysis)</li>
                        <li>PDF report (for documentation and sharing)</li>
                      </ul>
                      <p className="mt-2">
                        Look for the export options in the results panel after your prediction is complete.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="assistance" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Chat Assistant Features</h2>
                    <p className="text-muted-foreground">
                      Our AI chat assistant is designed to make complex biological information accessible and help you get the most from your protein analysis.
                    </p>
                    
                    <div className="space-y-4 mt-6">
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-bioez-100 rounded-full flex items-center justify-center shrink-0">
                          <MessageSquare className="h-5 w-5 text-bioez-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Natural Language Understanding</h3>
                          <p className="text-sm text-muted-foreground">
                            Ask questions in everyday language about your protein or biology concepts.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-bioez-100 rounded-full flex items-center justify-center shrink-0">
                          <Database className="h-5 w-5 text-bioez-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Scientific Knowledge Base</h3>
                          <p className="text-sm text-muted-foreground">
                            Access information from scientific literature, protein databases, and biological pathways.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-bioez-100 rounded-full flex items-center justify-center shrink-0">
                          <Search className="h-5 w-5 text-bioez-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Context-Aware Responses</h3>
                          <p className="text-sm text-muted-foreground">
                            Get answers specific to your protein instead of generic information.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-sm p-6 border border-border">
                    <h3 className="text-lg font-medium mb-4">Sample Conversations</h3>
                    
                    <div className="divide-y divide-border">
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Understanding Function</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex gap-2">
                            <span className="font-medium">User:</span>
                            <span className="text-muted-foreground">What does this protein do in cells?</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-medium">Assistant:</span>
                            <span className="text-muted-foreground">Based on the prediction, this protein appears to be involved in DNA repair, specifically in the homologous recombination pathway. It likely helps fix double-strand breaks in DNA by facilitating the exchange of genetic information between damaged DNA and its undamaged copy.</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-4">
                        <h4 className="font-medium mb-2">Technical Questions</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex gap-2">
                            <span className="font-medium">User:</span>
                            <span className="text-muted-foreground">Why does it have multiple domains?</span>
                          </div>
                          <div className="flex gap-2">
                            <span className="font-medium">Assistant:</span>
                            <span className="text-muted-foreground">This protein contains three domains: a DNA-binding domain (N-terminal), an ATPase domain (central), and a regulatory domain (C-terminal). Multi-domain proteins like this one can perform complex functions because each domain contributes a specific capability. The DNA-binding domain recognizes damaged DNA, the ATPase provides energy through ATP hydrolysis, and the regulatory domain controls when and how the protein functions.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-6 bg-bioez-gradient">
                      Open Chat Assistant
                    </Button>
                  </div>
                </div>
                
                <div className="bg-muted/30 rounded-lg p-6 mt-6">
                  <h2 className="text-xl font-bold mb-4">Chat Assistant Limitations</h2>
                  <p className="text-muted-foreground mb-4">
                    While our chat assistant is powerful, it's important to be aware of its limitations:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md border border-border">
                      <h3 className="font-medium mb-2">Not a Substitute for Expert Advice</h3>
                      <p className="text-sm text-muted-foreground">
                        The assistant provides information based on available data but should not replace consultation with scientific experts for critical research.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-border">
                      <h3 className="font-medium mb-2">Knowledge Cutoff</h3>
                      <p className="text-sm text-muted-foreground">
                        The assistant's knowledge includes scientific literature up to its last update and may not include very recent discoveries.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-border">
                      <h3 className="font-medium mb-2">Confidence Variations</h3>
                      <p className="text-sm text-muted-foreground">
                        Responses about well-studied proteins will be more detailed and confident than those about less-characterized proteins.
                      </p>
                    </div>
                    
                    <div className="bg-white p-4 rounded-md border border-border">
                      <h3 className="font-medium mb-2">Complex Questions</h3>
                      <p className="text-sm text-muted-foreground">
                        Very complex or highly specialized questions might receive simplified answers or suggestions to consult specific literature.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
      
      <ChatAssistant />
    </div>
  );
};

export default Documentation;
