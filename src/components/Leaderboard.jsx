import UserAvatar from './UserAvatar';

const Leaderboard = ({ 
  title, 
  items = [],
  type = 'top',
  colors = {
    lightBlue: '#EFF6FF',
    mainBlue: '#3B82F6',
    accent: '#10B981'
  },
  isLoading = false,
  maxItems = 10,
  onViewAll = null
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 animate-pulse">
        <div className="h-5 w-1/3 bg-gray-200 rounded mb-3"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                <div className="space-y-1">
                  <div className="h-2.5 w-20 bg-gray-200 rounded"></div>
                  <div className="h-2 w-12 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-3 w-8 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 text-center p-6">
        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-sm font-medium text-gray-900">No data available</h3>
        <p className="text-xs text-gray-500 mt-1">
          {type === 'top' ? 'No users found' : 'No recent activity'}
        </p>
      </div>
    );
  }

  const displayedItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="p-1.5 rounded-md bg-blue-100 text-blue-600 mr-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-sm font-semibold text-gray-800">{title}</h2>
          </div>
          <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {type === 'top' ? `Top ${displayedItems.length}` : 'Recent'}
          </span>
        </div>

        {type === 'top' ? (
          <TopLeaderboardTable items={displayedItems} colors={colors} />
        ) : (
          <LastLeaderboardList items={displayedItems} colors={colors} />
        )}

        {maxItems && items.length > maxItems && onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-xs text-blue-600 hover:text-blue-800 mt-2 w-full text-center pt-2 border-t border-gray-100"
          >
            View all
          </button>
        )}
      </div>
    </div>
  );
};

const TopLeaderboardTable = ({ items, colors }) => (
  <div className="overflow-x-auto">
    <table className="w-full text-xs">
      <thead>
        <tr className="text-left text-gray-500 border-b border-gray-100">
          <th className="pb-2 pl-1 w-20">#</th>
          <th className="pb-2">User</th>
          <th className="pb-2 pr-1 text-right">Points</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id || index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
            <td className="py-2 pl-1">
              <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                ${index < 3 ? 'text-white' : 'text-gray-700'}
                ${index === 0 ? 'bg-yellow-400' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-amber-500' : 'bg-gray-100'}`}>
                {index + 1}
              </span>
            </td>
            <td className="py-2">
              <div className="flex items-center gap-2">
                <UserAvatar user={item} size="sm" colors={colors} />
                <div>
                  <div className="font-medium text-gray-800 truncate max-w-[120px]">
                    {item?.name || 'Anonymous'}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 pr-1 text-right font-medium" style={{ color: colors?.mainBlue }}>
              {item?.points ? item.points.toLocaleString() : '0'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LastLeaderboardList = ({ items, colors }) => (
  <div className="space-y-2">
    {items.map((item, index) => (
      <div key={item._id || index} className="flex items-center p-2 hover:bg-gray-50 rounded-lg">
        <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium mr-2
          ${index === 0 ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' : 
            index === 1 ? 'bg-gray-100 text-gray-800 border border-gray-200' : 
            index === 2 ? 'bg-amber-100 text-amber-800 border border-amber-200' : 
            'bg-blue-50 text-blue-800 border border-blue-100'}`}>
          {index + 1}
        </span>
        
        <UserAvatar 
          user={item.userId} 
          size="xs" 
          colors={colors} 
          className="mr-2"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs font-medium text-gray-800 truncate max-w-[100px]">
              {item.userId?.name || 'Anonymous'}
            </span>
            <span className="text-xs font-semibold ml-2" style={{ color: colors.mainBlue }}>
              {item.totalScore || '0'} pts
            </span>
          </div>
          
          <div className="flex justify-between items-center mt-0.5">
            <span className="text-[10px] text-gray-500">
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
              })}
            </span>
            {item.challenges?.some(c => c.completed) && (
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                ✓
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Leaderboard;