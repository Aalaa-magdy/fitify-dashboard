import { motion } from 'framer-motion';
import { AlertCircle } from "lucide-react";
import LoadingSpinner from '../../../components/LoadingSpinner';

const StateCard = ({ title, value, icon, index, loading }) => {
  const hasError = value === undefined || value === null;
  
  return (
    <motion.div 
      className={`rounded-xl bg-white text-black h-[110px] shadow-lg py-3 flex items-center ${hasError ? 'opacity-70' : ''}`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.4, delay: index * 0.1 }
        },
        hover: {
          y: -5,
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          transition: { duration: 0.2 }
        }
      }}
      initial="hidden"
      animate="visible"
      whileHover={hasError ? {} : "hover"}
    >
      <div className="flex items-center justify-center ml-8">
        <div className="h-12 w-8 flex items-center">
          {icon}
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium mb-4">{title}</h3>
          {hasError ? (
            <div className="flex items-center gap-1">
              <AlertCircle className="text-red-500" size={14} />
              <span className="text-xs text-red-500">N/A</span>
            </div>
          ) : (
            <p className="text-4xl font-bold mt-1">
              {loading ? (
                <LoadingSpinner size="small" />
              ) : (
                typeof value === 'number' ? value.toLocaleString() : value || 0
              )}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default StateCard;