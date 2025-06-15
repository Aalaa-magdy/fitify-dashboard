import { motion } from 'framer-motion';
import React from 'react';

const InfoCard = ({ title, icon, items, color }) => {
  // Updated color palette
  const colors = {
    primary: '#14919B',
    primaryLight: '#19a4a8',
    accent: '#cddc44',
    dark: '#0F172A',
    lightBg: '#F8FAFC'
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3
      }
    },
    hover: {
      x: 3,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  const iconHover = {
    hover: {
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={container}
      className="rounded-xl border p-5 h-full flex flex-col"
      style={{
        backgroundColor: colors.lightBg,
        borderColor: `${colors.primary}20`,
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
      }}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3 mb-5"
        whileHover={{ x: 2 }}
      >
        <motion.div
          className="p-2 rounded-lg flex items-center justify-center"
          style={{
            backgroundColor: colors.primary,
            color: colors.accent
          }}
          variants={iconHover}
          whileHover="hover"
        >
          {icon}
        </motion.div>
        <h3 
          className="font-semibold text-lg"
          style={{ color: colors.dark }}
        >
          {title}
        </h3>
      </motion.div>

      {/* Items */}
      <div className="space-y-4 flex-1">
        {items.map((item, index) => (
          <motion.div 
            key={index} 
            className="flex items-start gap-3"
            variants={item}
            whileHover="hover"
          >
            <motion.div
              className="p-1.5 rounded-md flex items-center justify-center mt-0.5"
              style={{ 
                backgroundColor: 'white',
                color: colors.primary,
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
              }}
              whileHover={{ scale: 1.1 }}
            >
              {item.icon}
            </motion.div>
            <div className="flex-1">
              <p 
                className="text-xs font-medium mb-1 tracking-wide"
                style={{ color: colors.primaryLight }}
              >
                {item.label}
              </p>
              <motion.p 
                className="text-sm font-semibold"
                style={{ color: colors.dark }}
                whileHover={{ scale: 1.02 }}
              >
                {item.value}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative accent */}
    
    </motion.div>
  );
};

export default InfoCard;