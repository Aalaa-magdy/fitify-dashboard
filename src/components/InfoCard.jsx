import React from 'react';

const colors = {
  mainBlue: '#0E7C86',
  mainYellow: '#D8E84E',
  mainGreen: '#6B732A',
  secondYellow: '#E0F06D',
  blueLight: '#f0fdf4',
  yellowLight: '#F5F9D5',
  greenLight: '#E8ECD8',    
  blueDark: '#0A535A'
};

const InfoCard = ({ title, icon, items, color }) => {
  const colorConfig = {
    blue: {
      bg: colors.blueLight,
      text: colors.blueDark,
      iconBg: colors.mainBlue,
      iconColor: colors.secondYellow,
      accent: colors.blueDark
    },
    green: {
      bg: colors.greenLight,
      text: colors.mainGreen,
      iconBg: colors.mainGreen,
      iconColor: colors.secondYellow,
      accent: colors.mainGreen
    }
  };

  const currentColor = colorConfig[color] || colorConfig.blue;

  return (
    <div 
      className="rounded-xl border p-4 transition-all hover:shadow-md h-72"
      style={{ 
        backgroundColor: currentColor.bg,
        borderColor: `${currentColor.iconBg}30`,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
      }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div 
          className="p-2 rounded-lg flex items-center justify-center shadow-sm"
          style={{ 
            backgroundColor: currentColor.iconBg,
            color: currentColor.iconColor
          }}
        >
          {icon}
        </div>
        <h3 
          className="font-semibold text-base"
          style={{ color: currentColor.accent }}
        >
          {title}
        </h3>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div 
              className="p-1.5 rounded-md flex items-center justify-center mt-0.5"
              style={{ 
                backgroundColor: 'white',
                color: currentColor.iconBg,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              {item.icon}
            </div>
            <div className="flex-1">
              <p 
                className="text-xs font-medium mb-1"
                style={{ color: currentColor.text }}
              >
                {item.label}
              </p>
              <p className="text-sm font-semibold text-gray-800">
                {item.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;