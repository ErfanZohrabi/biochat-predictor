
import { motion } from 'framer-motion';
import { Award, Code, BookOpen, Users, Globe, Microscope } from 'lucide-react';
import Header from '@/components/Header';
import ChatAssistant from '@/components/ChatAssistant';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative bg-gradient-to-b from-white to-bioez-50">
        <div className="absolute inset-0 bg-dot-pattern opacity-50"></div>
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BioEZ</h1>
            <p className="text-xl text-foreground/80 max-w-3xl mx-auto">
              Making protein function prediction accessible to researchers, students, and professionals, 
              enhanced by an AI chat assistant that simplifies complex biological insights.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-foreground/80 mb-6">
                BioEZ was created to democratize access to advanced protein analysis tools, 
                making complex bioinformatics accessible to everyone in the scientific community.
              </p>
              <p className="text-lg text-foreground/80">
                We believe that by combining cutting-edge AI models with intuitive design and interactive 
                assistance, we can accelerate scientific discovery and education in the field of protein biology.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="glass rounded-2xl p-8 shadow-md"
            >
              <div className="aspect-square rounded-xl bg-bioez-50 flex items-center justify-center mb-4">
                <div className="w-3/4 h-3/4 relative">
                  <div className="absolute inset-0 rounded-full border-8 border-dashed border-bioez-300 opacity-20 animate-spin-slow"></div>
                  <div className="absolute inset-8 rounded-full border-8 border-dashed border-bioez-400 opacity-30 rotate-45 animate-spin-slow animation-delay-2000"></div>
                  <div className="absolute inset-16 rounded-full border-8 border-dashed border-bioez-500 opacity-40 rotate-90 animate-spin-slow animation-delay-4000"></div>
                  <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                    <div className="w-1/2 h-1/2 bg-bioez-600/30 rounded-full blur-md animate-pulse"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 px-6 bg-bioez-50/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Developed by a team of bioinformatics experts and AI developers dedicated to advancing scientific discovery.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamMember 
              name="Dr. Jane Chen"
              role="Lead Bioinformatician"
              description="Expert in protein structure analysis with 10+ years of research experience."
              delay={0.1}
            />
            <TeamMember 
              name="Michael Rodriguez"
              role="AI Research Lead"
              description="Specialist in deep learning models for biological sequence analysis."
              delay={0.2}
            />
            <TeamMember 
              name="Sarah Kim"
              role="UX/UI Designer"
              description="Focused on creating intuitive interfaces for complex scientific tools."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* Technology Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Technology</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              BioEZ harnesses cutting-edge AI models for protein prediction and natural language processing for interactive assistance.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TechCard 
              icon={<Microscope className="h-8 w-8" />}
              title="Advanced AI Models"
              description="Trained on extensive protein databases with state-of-the-art deep learning architectures."
              delay={0.1}
            />
            <TechCard 
              icon={<BookOpen className="h-8 w-8" />}
              title="Natural Language Processing"
              description="Conversational AI that understands protein biology terminology and concepts."
              delay={0.2}
            />
            <TechCard 
              icon={<Code className="h-8 w-8" />}
              title="Modern Web Technologies"
              description="Built with React, Tailwind CSS, and other cutting-edge web technologies for optimal performance."
              delay={0.3}
            />
            <TechCard 
              icon={<Globe className="h-8 w-8" />}
              title="Cloud Infrastructure"
              description="Scalable architecture to handle varying loads and processing requirements."
              delay={0.4}
            />
            <TechCard 
              icon={<Users className="h-8 w-8" />}
              title="User-Centered Design"
              description="Intuitive interfaces designed with researchers and students in mind."
              delay={0.5}
            />
            <TechCard 
              icon={<Award className="h-8 w-8" />}
              title="Research-Grade Accuracy"
              description="Validated against benchmark datasets to ensure reliable predictions."
              delay={0.6}
            />
          </div>
        </div>
      </section>
      
      {/* Partners Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-bioez-50/50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Our Partners</h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              We collaborate with leading academic institutions and research organizations to continuously improve our platform.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Partner logos would go here */}
            <PartnerLogo delay={0.1} />
            <PartnerLogo delay={0.2} />
            <PartnerLogo delay={0.3} />
            <PartnerLogo delay={0.4} />
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

// Team Member Component
const TeamMember = ({ name, role, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-6 text-center"
    >
      <div className="w-24 h-24 bg-bioez-100 rounded-full mx-auto mb-4 flex items-center justify-center">
        <div className="text-2xl font-bold text-bioez-600">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <div className="text-bioez-600 font-medium mb-3">{role}</div>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

// Technology Card Component
const TechCard = ({ icon, title, description, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass rounded-xl p-6 h-full"
    >
      <div className="bg-bioez-50 rounded-full w-16 h-16 flex items-center justify-center text-bioez-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

// Partner Logo Component (placeholder)
const PartnerLogo = ({ delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-24 glass rounded-lg flex items-center justify-center p-4"
    >
      <div className="bg-bioez-100/50 rounded-md w-full h-full flex items-center justify-center">
        <div className="text-bioez-500 font-medium">Partner Logo</div>
      </div>
    </motion.div>
  );
};

export default About;
