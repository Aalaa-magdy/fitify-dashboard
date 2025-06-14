import { motion } from 'framer-motion';
import { MessageCircle, Repeat, Heart, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../../api/axiosInstance';
import LoadingSpinner from '../../../components/LoadingSpinner';
import React from 'react';
const SocialEngagementCards = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('/stats/community');
        setStats(response.data);
      } catch (err) {
        setError(err.message || 'Failed to load engagement stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Total Posts',
      value: stats?.totalPosts || 0,
      icon: <FileText className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-teal-400 to-teal-600',
      pulseColor: 'bg-teal-200',
      barColor: 'bg-gradient-to-r from-teal-400 to-teal-600',
      textColor: 'text-teal-600'
    },
    {
      title: 'Total Comments',
      value: stats?.totalComments || 0,
      icon: <MessageCircle className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-300 to-blue-500',
      pulseColor: 'bg-blue-100',
      barColor: 'bg-gradient-to-r from-blue-300 to-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Shares',
      value: stats?.totalShares || 0,
      icon: <Repeat className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-blue-500 to-blue-700',
      pulseColor: 'bg-blue-200',
      barColor: 'bg-gradient-to-r from-blue-500 to-blue-700',
      textColor: 'text-blue-600'
    },
    {
      title: 'Total Likes',
      value: stats?.totalLikes || 0,
      icon: <Heart className="w-6 h-6 text-white" />,
      color: 'bg-gradient-to-br from-red-300 to-red-500',
      pulseColor: 'bg-red-100',
      barColor: 'bg-gradient-to-r from-red-300 to-red-500',
      textColor: 'text-red-600'
    }
  ];

  // === Animation Variants ===
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const cardItem = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 10 }
    },
    hover: {
      y: -8,
      transition: { type: 'spring', stiffness: 300 }
    }
  };

  const iconContainer = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      rotate: [0, -10, 10, 0],
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  const numberBounce = {
    rest: { scale: 1 },
    hover: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.6, ease: 'easeInOut' }
    }
  };

  if (loading) return <LoadingSpinner size="small" />;
  if (error) return <div className="text-red-500 text-sm">{error}</div>;

  return (
     <motion.div
      className="grid grid-cols-2 gap-4 p-1" // Changed to 2 columns
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card, index) => {
        const percentage = Math.min(100, (card.value / (stats?.totalPosts || 1)) * 100);
        const formattedValue = card.value.toLocaleString();

        return (
          <motion.div
            key={index}
            variants={cardItem}
            whileHover="hover"
            className="relative bg-white rounded-lg p-4 shadow-md cursor-pointer h-full flex flex-col justify-between border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            style={{ minHeight: '153px' }} // Smaller card size
          >
            {/* Background pulse */}
            <motion.div
              className={`absolute inset-0 rounded-lg opacity-0 ${card.pulseColor}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Header */}
            <div className="flex justify-between items-start z-10">
              <div>
                <p className="text-xs font-medium text-gray-600 mb-4 mr-4">{card.title}</p> {/* Smaller text */}
                <motion.p className={`text-3xl font-bold ${card.textColor}`} variants={numberBounce}> {/* Smaller text size */}
                  {formattedValue.split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ y: [0, -5, 0] }} // Smaller bounce
                      transition={{
                        delay: 0.2 + (i * 0.05),
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              <motion.div
                className={`p-2 rounded-full ${card.color} shadow-sm flex items-center justify-center`} // Smaller icon container
                variants={iconContainer}
                initial="rest"
                whileHover="hover"
              >
                {React.cloneElement(card.icon, { className: "w-4 h-4 text-white" })} {/* Smaller icons */}
              </motion.div>
            </div>

            {/* Progress bar */}
            <div className="relative  z-10"> {/* Smaller margin */}
              <div className="h-1.5 bg-gray-100 rounded-full w-full overflow-hidden"> {/* Thinner bar */}
                <motion.div
                  className="h-full rounded-full"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 1,
                    type: 'spring',
                    stiffness: 60
                  }}
                  style={{ width: `${percentage}%`, background: card.barColor }}
                />
              </div>

              {/* Animated dots - fewer dots for smaller size */}
              {[0, 50, 100].map((pos) => (
                <motion.div
                  key={pos}
                  className={`absolute -top-0.5 h-2 w-2 rounded-full ${card.pulseColor}`} // Smaller dots
                  style={{ left: `${pos}%` }}
                  initial={{ y: 0, opacity: 0 }}
                  animate={{
                    y: [0, -3, 0], // Smaller bounce
                    opacity: [0, 0.8, 0]
                  }}
                  transition={{
                    delay: 0.5 + (index * 0.15) + (pos * 0.002),
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Corner accent - smaller */}
            <motion.div
              className={`absolute top-0 right-0 w-12 h-12 ${card.color} opacity-10 rounded-bl-full`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default SocialEngagementCards;
