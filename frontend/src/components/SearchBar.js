import { useState, useRef } from 'react';
import { X, Search } from 'lucide-react';

export const SearchBar = ({ onSearch, loading, recentSearches }) => {
  const [inputValue, setInputValue] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearch = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
      setInputValue('');
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleRecentClick = (city) => {
    onSearch(city);
    setInputValue('');
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 150);
  };

  return (
    <div className="w-full relative animate-fadeIn">
      <div className="flex gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-3 items-center hover:bg-white/20 focus-within:bg-white/20 transition-all duration-300">
        <Search size={20} className="text-white/60" />
        <input
          type="text"
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(recentSearches.length > 0)}
          onBlur={handleBlur}
          disabled={loading}
          className="flex-1 bg-transparent text-white placeholder-white/40 outline-none disabled:opacity-50"
        />
        {inputValue && (
          <button
            onClick={() => setInputValue('')}
            className="text-white/60 hover:text-white"
          >
            <X size={18} />
          </button>
        )}
        <button
          onClick={handleSearch}
          disabled={loading}
          className="bg-white/20 hover:bg-white/30 text-white rounded-full p-2 disabled:opacity-50 min-h-[44px] min-w-[44px] flex items-center justify-center active:scale-95 transition"
        >
          <Search size={18} />
        </button>
      </div>

      {showDropdown && recentSearches.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white/10 backdrop-blur-md rounded-2xl p-2 z-10">
          <p className="text-white/60 text-xs px-3 py-1">Recent Searches</p>
          {recentSearches.map((city) => (
            <button
              key={city}
              onClick={() => handleRecentClick(city)}
              className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-lg transition"
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
