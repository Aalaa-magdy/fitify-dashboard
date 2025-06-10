const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <div className="relative flex-1 sm:w-64">
    <input
      type="text"
      placeholder="Search users..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <svg
      className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
);

export default SearchBar;
