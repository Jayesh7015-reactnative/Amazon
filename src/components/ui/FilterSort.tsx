import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import './FilterSort.css';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface SortOption {
  id: string;
  label: string;
  value: string;
}

interface FilterSortProps {
  filters: {
    category?: FilterOption[];
    priceRange?: FilterOption[];
    rating?: FilterOption[];
    brand?: FilterOption[];
  };
  sortOptions: SortOption[];
  onFilterChange: (filterType: string, value: string) => void;
  onSortChange: (value: string) => void;
  activeFilters?: { [key: string]: string };
  activeSort?: string;
}

const FilterSort: React.FC<FilterSortProps> = ({
  filters,
  sortOptions,
  onFilterChange,
  onSortChange,
  activeFilters = {},
  activeSort = ''
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const hasActiveFilters = Object.keys(activeFilters).length > 0;

  return (
    <div className="filter-sort-container">
      <div className="filter-sort-buttons">
        <motion.button
          className={`filter-btn ${hasActiveFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FilterListIcon />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="filter-count">{Object.keys(activeFilters).length}</span>
          )}
        </motion.button>

        <motion.button
          className={`sort-btn ${activeSort ? 'active' : ''}`}
          onClick={() => setShowSort(!showSort)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SortIcon />
          <span>Sort</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="filter-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-header">
              <h3>Filters</h3>
              <button 
                className="close-btn"
                onClick={() => setShowFilters(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="filter-content">
              {filters.category && (
                <div className="filter-group">
                  <h4>Category</h4>
                  <div className="filter-options">
                    {filters.category.map(option => (
                      <label key={option.id} className="filter-option">
                        <input
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={activeFilters.category === option.value}
                          onChange={() => onFilterChange('category', option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {filters.priceRange && (
                <div className="filter-group">
                  <h4>Price Range</h4>
                  <div className="filter-options">
                    {filters.priceRange.map(option => (
                      <label key={option.id} className="filter-option">
                        <input
                          type="radio"
                          name="priceRange"
                          value={option.value}
                          checked={activeFilters.priceRange === option.value}
                          onChange={() => onFilterChange('priceRange', option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {filters.rating && (
                <div className="filter-group">
                  <h4>Rating</h4>
                  <div className="filter-options">
                    {filters.rating.map(option => (
                      <label key={option.id} className="filter-option">
                        <input
                          type="radio"
                          name="rating"
                          value={option.value}
                          checked={activeFilters.rating === option.value}
                          onChange={() => onFilterChange('rating', option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {filters.brand && (
                <div className="filter-group">
                  <h4>Brand</h4>
                  <div className="filter-options">
                    {filters.brand.map(option => (
                      <label key={option.id} className="filter-option">
                        <input
                          type="checkbox"
                          value={option.value}
                          checked={activeFilters.brand === option.value}
                          onChange={() => onFilterChange('brand', option.value)}
                        />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {hasActiveFilters && (
              <div className="filter-footer">
                <button 
                  className="clear-filters-btn"
                  onClick={() => {
                    Object.keys(activeFilters).forEach(key => {
                      onFilterChange(key, '');
                    });
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </motion.div>
        )}

        {showSort && (
          <motion.div
            className="sort-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="sort-header">
              <h3>Sort By</h3>
              <button 
                className="close-btn"
                onClick={() => setShowSort(false)}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="sort-options">
              {sortOptions.map(option => (
                <label key={option.id} className="sort-option">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={activeSort === option.value}
                    onChange={() => {
                      onSortChange(option.value);
                      setShowSort(false);
                    }}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterSort;