
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { User, Settings } from 'lucide-react';

interface UserProfileProps {
  className?: string;
}

export const UserProfile: React.FC<UserProfileProps> = ({ className }) => {
  // Mock user data - in a real app this would come from your auth system
  const user = {
    name: 'Alex Johnson',
    plan: 'Premium',
    startDate: '3 months ago',
    progress: 67,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'bg-card rounded-2xl overflow-hidden border subtle-shadow p-6',
        className
      )}
    >
      <div className="flex items-center">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
            <User className="w-7 h-7 text-primary" />
          </div>
          <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card"></span>
        </div>
        
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-sm text-foreground/70">{user.plan} Plan • Started {user.startDate}</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.95 }}
          className="ml-auto p-2 text-foreground/50 hover:text-foreground transition-colors rounded-full"
        >
          <Settings className="w-5 h-5" />
        </motion.button>
      </div>
      
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-semibold">{user.progress}%</span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${user.progress}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-primary rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;
