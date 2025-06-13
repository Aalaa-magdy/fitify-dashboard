import { motion } from 'framer-motion';

export const StatsCard = ({ title, value, icon: Icon, bg, index }) => {
  return (
    <motion.div
      key={index}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`${bg} h-[108px] w-[97%] flex mt-3 flex-col justify-between p-4 rounded-xl shadow-lg cursor-pointer  `}
    >
      <div className="flex justify-between items-start w-full">
        <h3 className="text-md font-bold">{title}</h3>
        {Icon && <Icon className="h-8 w-8" />}
      </div>
      
      <div className="flex flex-col ">
        <motion.span 
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-3xl font-bold"
        >
          {value}
        </motion.span>
        
          <div className="text-sm flex items-center">
            <span className="text-gray-400 ml-1">from last month</span>
          </div>
        
      
      </div>
    </motion.div>
  );
};

export default StatsCard;