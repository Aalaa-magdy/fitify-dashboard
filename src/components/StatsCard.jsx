// components/StatsCard.js
import { motion } from 'framer-motion';

export const StatsCard = ({ value, label, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
    >
      <motion.span 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-3xl font-bold text-mainBlue"
      >
        {value}
      </motion.span>
      <span className="text-gray-500 mt-2">{label}</span>
    </motion.div>
  );
};