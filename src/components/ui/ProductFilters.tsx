import React, { useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckIcon from '@mui/icons-material/Check';
import './ProductFilters.css';

interface FilterOptions {
  categories: string[];
  brands: string[];
  priceRange: { min: number; max: number };
  rating: number;
  sizes: string[];
  colors: string[];
  availability: 'all' | 'inStock' | 'outOfStock';
  discount: number;
  sortBy: 'newest' | 'priceLow' | 'priceHigh' | 'rating' | 'popular';
}

interface ProductFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  onFiltersChange: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  isOpen,
  onClose,
  onFiltersChange,
  initialFilters
}) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'category', 'price', 'rating'
  ]);

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Books',
    'Beauty & Personal Care',
    'Automotive',
    'Toys & Games',
    'Health & Wellness',
    'Office Products'
  ];

  const brands = [
    'Apple',
    'Samsung',
    'Nike',
    'Adidas',
    'Sony',
    'LG',
    'Canon',
    'Dell',
    'HP',
    'Lenovo',
    'Asus',
    'Microsoft'
  ];

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const colors = [
    { name: 'Black', value: '#000000' },
    { name: 'White', value: '#FFFFFF' },
    { name: 'Red', value: '#FF0000' },
    { name: 'Blue', value: '#0000FF' },
    { name: 'Green', value: '#00FF00' },
    { name: 'Yellow', value: '#FFFF00' },
    { name: 'Gray', value: '#808080' },
    { name: 'Brown', value: '#A52A2A' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const updateFilters = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const toggleCategory = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    updateFilters('categories', newCategories);
  };

  const toggleBrand = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    updateFilters('brands', newBrands);
  };

  const toggleSize = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
    updateFilters('sizes', newSizes);
  };

  const toggleColor = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
    updateFilters('colors', newColors);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      categories: [],
      brands: [],
      priceRange: { min: 0, max: 10000 },
      rating: 0,
      sizes: [],
      colors: [],
      availability: 'all',
      discount: 0,
      sortBy: 'newest'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const renderStars = (rating: number, onRatingChange: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <button
        key={index}
        className="filters__starBtn"
        onClick={() => onRatingChange(index + 1)}
      >
        {index < rating ? (
          <StarIcon className="filters__starFilled" />
        ) : (
          <StarBorderIcon className="filters__starEmpty" />
        )}
      </button>
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="filters__overlay" onClick={onClose}>
      <div className="filters__sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="filters__header">
          <div className="filters__title">
            <FilterListIcon />
            <span>Filters</span>
          </div>
          <div className="filters__actions">
            <button className="filters__clearAll" onClick={clearAllFilters}>
              Clear All
            </button>
            <button className="filters__close" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="filters__content">
          {/* Sort By */}
          <div className="filters__section">
            <h3 className="filters__sectionTitle">Sort By</h3>
            <div className="filters__sortOptions">
              {[
                { value: 'newest', label: 'Newest First' },
                { value: 'popular', label: 'Most Popular' },
                { value: 'priceLow', label: 'Price: Low to High' },
                { value: 'priceHigh', label: 'Price: High to Low' },
                { value: 'rating', label: 'Highest Rated' }
              ].map(option => (
                <label key={option.value} className="filters__radioLabel">
                  <input
                    type="radio"
                    name="sortBy"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) => updateFilters('sortBy', e.target.value)}
                  />
                  <span className="filters__radioCustom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('category')}
            >
              <h3 className="filters__sectionTitle">Categories</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('category') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('category') && (
              <div className="filters__options">
                {categories.map(category => (
                  <label key={category} className="filters__checkboxLabel">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleCategory(category)}
                    />
                    <span className="filters__checkboxCustom">
                      {filters.categories.includes(category) && <CheckIcon />}
                    </span>
                    {category}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('price')}
            >
              <h3 className="filters__sectionTitle">Price Range</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('price') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('price') && (
              <div className="filters__priceRange">
                <div className="filters__priceInputs">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.priceRange.min}
                    onChange={(e) => updateFilters('priceRange', {
                      ...filters.priceRange,
                      min: Number(e.target.value)
                    })}
                    className="filters__priceInput"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.priceRange.max}
                    onChange={(e) => updateFilters('priceRange', {
                      ...filters.priceRange,
                      max: Number(e.target.value)
                    })}
                    className="filters__priceInput"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  value={filters.priceRange.max}
                  onChange={(e) => updateFilters('priceRange', {
                    ...filters.priceRange,
                    max: Number(e.target.value)
                  })}
                  className="filters__priceSlider"
                />
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('rating')}
            >
              <h3 className="filters__sectionTitle">Customer Rating</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('rating') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('rating') && (
              <div className="filters__rating">
                <div className="filters__stars">
                  {renderStars(filters.rating, (rating) => updateFilters('rating', rating))}
                </div>
                <span className="filters__ratingText">
                  {filters.rating > 0 ? `${filters.rating} stars & up` : 'Any rating'}
                </span>
              </div>
            )}
          </div>

          {/* Brands */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('brands')}
            >
              <h3 className="filters__sectionTitle">Brands</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('brands') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('brands') && (
              <div className="filters__options">
                {brands.map(brand => (
                  <label key={brand} className="filters__checkboxLabel">
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                    />
                    <span className="filters__checkboxCustom">
                      {filters.brands.includes(brand) && <CheckIcon />}
                    </span>
                    {brand}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('sizes')}
            >
              <h3 className="filters__sectionTitle">Sizes</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('sizes') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('sizes') && (
              <div className="filters__sizeGrid">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`filters__sizeBtn ${filters.sizes.includes(size) ? 'selected' : ''}`}
                    onClick={() => toggleSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="filters__section">
            <button
              className="filters__sectionHeader"
              onClick={() => toggleSection('colors')}
            >
              <h3 className="filters__sectionTitle">Colors</h3>
              <span className={`filters__expandIcon ${expandedSections.includes('colors') ? 'expanded' : ''}`}>
                ▸
              </span>
            </button>
            {expandedSections.includes('colors') && (
              <div className="filters__colorGrid">
                {colors.map(color => (
                  <button
                    key={color.name}
                    className={`filters__colorBtn ${filters.colors.includes(color.name) ? 'selected' : ''}`}
                    onClick={() => toggleColor(color.name)}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  >
                    {filters.colors.includes(color.name) && <CheckIcon />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="filters__section">
            <h3 className="filters__sectionTitle">Availability</h3>
            <div className="filters__availabilityOptions">
              {[
                { value: 'all', label: 'All Products' },
                { value: 'inStock', label: 'In Stock Only' },
                { value: 'outOfStock', label: 'Out of Stock' }
              ].map(option => (
                <label key={option.value} className="filters__radioLabel">
                  <input
                    type="radio"
                    name="availability"
                    value={option.value}
                    checked={filters.availability === option.value}
                    onChange={(e) => updateFilters('availability', e.target.value)}
                  />
                  <span className="filters__radioCustom"></span>
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div className="filters__section">
            <h3 className="filters__sectionTitle">Minimum Discount</h3>
            <div className="filters__discountOptions">
              {[0, 10, 25, 50, 70].map(discount => (
                <label key={discount} className="filters__radioLabel">
                  <input
                    type="radio"
                    name="discount"
                    value={discount}
                    checked={filters.discount === discount}
                    onChange={(e) => updateFilters('discount', Number(e.target.value))}
                  />
                  <span className="filters__radioCustom"></span>
                  {discount === 0 ? 'Any Discount' : `${discount}% or more`}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;