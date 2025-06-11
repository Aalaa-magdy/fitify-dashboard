// components/StatsSection.js
import { motion } from 'framer-motion';
import { 
  Users,
  Dumbbell,
  CheckCircle2 as CheckCircle,
  Shield
} from 'lucide-react';

export const StatsSection = ({data}) => {
  const stats = [
     {
      value: data.admins,
      label: "Admins",
      icon: Shield,
      color: 'vibrantYellow'
    },
    {
      value: data.users,
      label: "Active Users",
      icon: Users,
      color: 'blueGreen'
    },
    {
      value: data.exercises,
      label: "Exercises",
      icon: Dumbbell,
      color: 'vibrantYellow'
    },
    {
      value: data.completedSessions,
      label: "Completed Sessions",
      icon: CheckCircle,
      color: 'blueGreen'
    },
   
  ];

  // Updated color definitions with your specified colors
  const colors = {
    vibrantYellow: {
      bg: 'bg-[#e3f542]/20',       // Primary yellow with 20% opacity
      icon: 'text-gray-900',      // Solid yellow for icons
      text: 'text-gray-800',      // Yellow text for values
      accent: 'bg-[#e3f542]'       // Accent color
    },
    blueGreen: {
      bg: 'bg-[#61d0d8]/20',       // Blue-green with 20% opacity
      icon: 'text-gray-900',      // Solid blue-green for icons
      text: 'text-gray-800',      // Blue-green text for values
      accent: 'bg-[#61d0d8]'       // Accent color
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Platform Overview
        </h2>
        <p className="mt-2 max-w-2xl mx-auto text-sm text-gray-600/80 sm:mt-3">
          Key metrics at a glance
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat, index) => {
          const color = colors[stat.color]; // Get the color object
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ 
                y: -3,
                scale: 1.02
              }}
              className={`relative rounded-lg overflow-hidden p-4 ${color.bg} border border-[${color.text}]/20 shadow-xs hover:shadow-sm`}
            >
              <div className="flex items-center">
                <stat.icon 
                  className={`h-6 w-6 ${color.icon} mr-2`} 
                  aria-hidden="true"
                />
                <span className={`text-xs font-medium ${color.text}`}>
                  {stat.label}
                </span>
              </div>
              
              <motion.p 
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className={`mt-1 text-xl font-bold ${color.text}`}
              >
                {stat.value}
              </motion.p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};