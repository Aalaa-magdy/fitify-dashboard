import UserAvatar from './UserAvatar';
import { ChevronRight } from 'lucide-react';

const Leaderboard = ({ 
  title, 
  items = [],
  type = 'top',
  colors = {
    primary: "#14919B",
    secondary: "#ECF87E",
    dark: "#0F172A",
    light: "#F8FAFC"
  },
  isLoading = false,
  maxItems = 10,
  onViewAll = null
}) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 animate-pulse p-4">
        <div className="h-4 w-1/3 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                <div className="space-y-1">
                  <div className="h-2 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
              <div className="h-2.5 w-6 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 text-center p-4">
        <div className="mx-auto h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-400 mb-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xs font-medium text-gray-900">No data available</h3>
        <p className="text-[10px] text-gray-500 mt-0.5">
          {type === 'top' ? 'No users found' : 'No recent activity'}
        </p>
      </div>
    );
  }

  const displayedItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-3 py-2 bg-gradient-to-r from-[#0F172A] to-[#14919B] text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="rounded p-1 bg-white/10">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xs font-semibold">{title}</h2>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#ECF87E] text-[#0F172A] font-bold">
            {type === 'top' ? `Top ${displayedItems.length}` : 'Recent'}
          </span>
        </div>
      </div>

      <div className="p-2">
        {type === 'top' ? (
          <TopLeaderboardTable items={displayedItems} colors={colors} />
        ) : (
          <LastLeaderboardList items={displayedItems} colors={colors} />
        )}

        {maxItems && items.length > maxItems && onViewAll && (
          <button 
            onClick={onViewAll}
            className="text-xs text-[#14919B] hover:text-[#0E7490] mt-2 w-full text-center pt-2 border-t border-gray-100 font-medium flex items-center justify-center"
          >
            View all <ChevronRight className="h-3 w-3 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
};

const TopLeaderboardTable = ({ items, colors }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="text-left text-[10px] text-gray-500 border-b border-gray-100">
          <th className="pb-2 pl-1 w-8">#</th>
          <th className="pb-2">User</th>
          <th className="pb-2 pr-1 text-right">Points</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={item.id || index} className="border-b border-gray-100 last:border-0 hover:bg-[#F8FAFC]">
            <td className="py-2 pl-1">
              <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-bold
                ${index < 3 ? 'text-white' : 'text-[#0F172A]'}
                ${index === 0 ? 'bg-[#ECF87E]' : 
                  index === 1 ? 'bg-[#14919B]' : 
                  index === 2 ? 'bg-[#0E7490]' : 'bg-gray-100'}`}>
                {index + 1}
              </span>
            </td>
            <td className="py-2">
              <div className="flex items-center gap-2">
                <UserAvatar user={item} size="xs" />
                <div className="truncate max-w-[120px]">
                  <div className="text-xs font-medium text-[#0F172A] truncate">
                    {item?.name || 'Anonymous'}
                  </div>
                  <div className="text-[10px] text-gray-500 truncate">
                    {item?.email || ''}
                  </div>
                </div>
              </div>
            </td>
            <td className="py-2 pr-1 text-right text-xs font-bold" style={{ color: colors.primary }}>
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
      <div key={item._id || index} className="flex items-center p-1 hover:bg-[#F8FAFC] rounded transition-colors">
        <span className={`w-4 h-4 flex items-center justify-center rounded-full text-[10px] font-bold mr-2
          ${index === 0 ? 'bg-[#ECF87E]/20 text-[#0F172A] border border-[#ECF87E]' : 
            index === 1 ? 'bg-[#14919B]/20 text-[#0F172A] border border-[#14919B]' : 
            index === 2 ? 'bg-[#0E7490]/20 text-[#0F172A] border border-[#0E7490]' : 
            'bg-gray-100 text-gray-800 border border-gray-200'}`}>
          {index + 1}
        </span>
        
        <UserAvatar 
          user={item.userId} 
          size="xs" 
          className="mr-2"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            <span className="text-xs text-[#0F172A] truncate">
              {item.userId?.name || 'Anonymous'}
            </span>
            <span className="text-xs ml-2 font-medium" style={{ color: colors.primary }}>
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
              <span className="text-[10px] text-[#14919B] bg-[#ECFDF3] px-1.5 py-0.5 rounded-full">
                Completed
              </span>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default Leaderboard;