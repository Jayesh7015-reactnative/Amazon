import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  suggestions?: string[];
  recentSearches?: string[];
  trendingSearches?: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search products...',
  suggestions = [],
  recentSearches = [],
  trendingSearches = []
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  const filteredSuggestions = suggestions.filter(s => 
    s.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="search-bar-wrapper" ref={inputRef}>
      <form onSubmit={handleSubmit} className="search-bar-form">
        <motion.div 
          className={`search-bar ${isFocused ? 'focused' : ''}`}
          animate={{ width: isFocused ? '110%' : '100%' }}
          transition={{ duration: 0.3 }}
        >
          <SearchIcon className="search-icon" />
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="search-input"
          />
          {query && (
            <motion.button
              type="button"
              className="clear-btn"
              onClick={clearSearch}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              <CloseIcon />
            </motion.button>
          )}
          <button type="submit" className="search-submit-btn">
            <SearchIcon />
          </button>
        </motion.div>
      </form>

      <AnimatePresence>
        {showSuggestions && (query || recentSearches.length > 0 || trendingSearches.length > 0) && (
          <motion.div
            className="search-suggestions"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {query && filteredSuggestions.length > 0 && (
              <div className="suggestions-section">
                <h4>Suggestions</h4>
                {filteredSuggestions.slice(0, 5).map((suggestion, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <SearchIcon className="suggestion-icon" />
                    <span dangerouslySetInnerHTML={{
                      __html: suggestion.replace(
                        new RegExp(query, 'gi'),
                        match => `<strong>${match}</strong>`
                      )
                    }} />
                  </div>
                ))}
              </div>
            )}

            {!query && recentSearches.length > 0 && (
              <div className="suggestions-section">
                <h4>Recent Searches</h4>
                {recentSearches.slice(0, 3).map((search, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <HistoryIcon className="suggestion-icon" />
                    <span>{search}</span>
                  </div>
                ))}
              </div>
            )}

            {!query && trendingSearches.length > 0 && (
              <div className="suggestions-section">
                <h4>Trending</h4>
                {trendingSearches.slice(0, 3).map((search, index) => (
                  <div
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(search)}
                  >
                    <TrendingUpIcon className="suggestion-icon" />
                    <span>{search}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;