
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  delay?: number;
}

const FeatureCard = ({ icon, title, description, className, delay = 0 }: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass group rounded-2xl p-6 transition-all duration-300 hover:shadow-lg border border-white/20",
        className
      )}
    >
      <div className="mb-4 bg-bioez-50 rounded-xl w-14 h-14 flex items-center justify-center text-bioez-600 transition-colors group-hover:bg-bioez-100">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-bioez-700 transition-colors">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
