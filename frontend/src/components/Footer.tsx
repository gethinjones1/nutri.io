
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn('w-full border-t py-6 md:py-8', className)}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="font-display font-bold text-lg"
            >
              FlexNutri
            </motion.div>
            <p className="text-sm text-foreground/60 mt-1">
              Personalized fitness & nutrition plans
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-8">
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Terms of Service
            </motion.a>
            <motion.a 
              href="#" 
              whileHover={{ scale: 1.05 }}
              className="text-sm text-foreground/60 hover:text-foreground transition-colors"
            >
              Contact
            </motion.a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-border/40 text-center">
          <p className="text-xs text-foreground/50">
            © {new Date().getFullYear()} FlexNutri. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
