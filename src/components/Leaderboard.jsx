import React from 'react';

const Leaderboard = ({ 
  title, 
  items, 
  type = 'top', // 'top' or 'last'
  onViewAll,
  colors 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-xs border border-gray-200 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        {onViewAll && (
          <button 
            className="text-xs px-3 py-1 rounded-full"
            style={{ backgroundColor: colors.lightBlue, color: colors.mainBlue }}
            onClick={onViewAll}
          >
            View All
          </button>
        )}
      </div>

      {type === 'top' ? (
        <TopLeaderboardTable items={items} colors={colors} />
      ) : (
        <LastLeaderboardList items={items} colors={colors} />
      )}

      {type === 'last' && (
        <div className="mt-6 pt-4 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Leaderboard Updates</h3>
          <p className="text-xs text-gray-500 mb-2">
            Next update in: <span className="font-medium">2 hours</span>
          </p>
          <button 
            className="w-full text-center text-sm px-4 py-2 rounded-lg"
            style={{ backgroundColor: colors.lightBlue, color: colors.mainBlue }}
          >
            View Full Leaderboard
          </button>
        </div>
      )}
    </div>
  );
};

// Sub-component for Top Users table view
const TopLeaderboardTable = ({ items, colors }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-left text-xs text-gray-500 border-b border-gray-200">
          <th className="pb-2">Rank</th>
          <th className="pb-2">User</th>
          <th className="pb-2">Points</th>
          <th className="pb-2">Progress</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
            <td className="py-3 text-sm font-medium text-gray-700">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs mr-2
                ${index < 3 ? 'text-white' : 'text-gray-700'}
                ${index === 0 ? 'bg-yellow-400' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-amber-600' : 'bg-gray-100'}`}>
                {index + 1}
              </span>
            </td>
            <td className="py-3">
              <div className="flex items-center">
                <div 
                  className="h-8 w-8 rounded-full flex items-center justify-center mr-2" 
                  style={{ backgroundColor: colors.lightBlue }}
                >
                  <span style={{ color: colors.mainBlue }}>{item.name.charAt(0)}</span>
                </div>
                <span className="text-sm font-medium text-gray-800">{item.name}</span>
              </div>
            </td>
            <td className="py-3 text-sm font-medium" style={{ color: colors.mainBlue }}>
              {item.points}
            </td>
            <td className="py-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full" 
                  style={{ 
                    width: `${item.progress}%`,
                    backgroundColor: item.progress > 75 ? colors.emerald : 
                                   item.progress > 50 ? colors.mainBlue : colors.secondYellow
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 mt-1 block">{item.progress}%</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Sub-component for Last Leaderboard list view
const LastLeaderboardList = ({ items, colors }) => (
  <div className="space-y-4">
    {items.map((item) => (
      <div key={item.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors">
        <div className="flex items-center">
          <span className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 text-xs font-medium
            ${item.position === 1 ? 'bg-yellow-100 text-yellow-800' : 
              item.position === 2 ? 'bg-gray-100 text-gray-800' : 
              item.position === 3 ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
            {item.position}
          </span>
          <span className="text-sm font-medium">{item.name}</span>
        </div>
        <div className="flex items-center">
          {item.change === 'up' && (
            <span className="text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 7a1 1 0 01-1.707-.707L12 4.586V7z" clipRule="evenodd" />
              </svg>
              Up
            </span>
          )}
          {item.change === 'down' && (
            <span className="text-xs text-red-500 bg-red-50 px-2 py-1 rounded-full flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12 13a1 1 0 01-.707.293L12 15.414V13z" clipRule="evenodd" />
              </svg>
              Down
            </span>
          )}
          {item.change === 'new' && (
            <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">New</span>
          )}
          {item.change === 'same' && (
            <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">Same</span>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default Leaderboard;