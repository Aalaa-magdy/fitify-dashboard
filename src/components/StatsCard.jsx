import { motion } from 'framer-motion';

export const StatsCard = ({ value, label, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="flex flex-col items-center justify-center p-6 rounded-xl shadow-lg cursor-pointer"
      style={{
        background: `linear-gradient(135deg, #14919B 0%, #0F172A 100%)`
      }}
    >
      <motion.span 
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-4xl font-bold text-[#ECF87E]"
      >
        {value}
      </motion.span>
      <span className="text-white/80 mt-2 text-sm font-medium">{label}</span>
    </motion.div>
  );
};