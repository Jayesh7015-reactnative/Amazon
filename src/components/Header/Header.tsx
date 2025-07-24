import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import './Header.css';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('United States');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const countries = [
    'United States',
    'Canada',
    'United Kingdom', 
    'Germany',
    'France',
    'Italy',
    'Spain',
    'Australia',
    'Japan',
    'South Korea',
    'India',
    'Brazil',
    'Mexico',
    'Netherlands',
    'Singapore'
  ];

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Beauty',
    'Automotive',
    'Toys & Games',
    'Health',
    'Grocery',
    'Office Products'
  ];

  const handleLogin = () => {
    if (state.user) {
      dispatch({ type: 'SET_USER', payload: null });
    } else {
      navigate('/login');
    }
  };

  const getCartCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Filter products based on search query and category
      let filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Apply category filter if not "All"
      if (selectedCategory !== 'All') {
        filteredProducts = filteredProducts.filter(product =>
          product.category?.toLowerCase() === selectedCategory.toLowerCase()
        );
      }

      dispatch({ type: 'SET_SEARCH_RESULTS', payload: filteredProducts });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}&category=${encodeURIComponent(selectedCategory)}`);
    }
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="header__topRow">
        <Link to="/" aria-label="ShopZone Home">
          <div className="header__logo">
            <div className="header__logoText">
              <span className="header__logoShop">Shop</span>
              <span className="header__logoZone">Zone</span>
            </div>
          </div>
        </Link>

        <div 
          className="header__location" 
          ref={locationRef}
          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
        >
          <LocationOnOutlinedIcon className="header__locationIcon" />
          <div className="header__option">
            <span className="header__optionLineOne">Deliver to</span>
            <span className="header__optionLineTwo">
              {selectedCountry}
              <ArrowDropDownIcon />
            </span>
          </div>
          {showCountryDropdown && (
            <div className="header__countryDropdown">
              {countries.map((country) => (
                <div
                  key={country}
                  className={`header__countryOption ${selectedCountry === country ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCountrySelect(country);
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="header__nav">
          {state.user ? (
            <Link to="/profile">
              <div className="header__option">
                <span className="header__optionLineOne">
                  Hello, {state.user?.displayName?.split(' ')[0] || 'User'}
                </span>
                <span className="header__optionLineTwo">
                  Account
                  <ArrowDropDownIcon className="d-none d-md-inline" />
                </span>
              </div>
            </Link>
          ) : (
            <div onClick={handleLogin} className="header__option">
              <span className="header__optionLineOne">
                Hello, Sign in
              </span>
              <span className="header__optionLineTwo">
                Sign In
                <ArrowDropDownIcon className="d-none d-md-inline" />
              </span>
            </div>
          )}

          <div className="header__option d-none d-lg-flex">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>

          <Link to="/wishlist" className="d-none d-sm-block">
            <div className="header__optionWishlist">
              <FavoriteIcon />
              <span className="header__optionLineTwo">Wishlist</span>
            </div>
          </Link>

          <Link to="/compare" className="d-none d-lg-block">
            <div className="header__optionWishlist">
              <CompareArrowsIcon />
              <span className="header__optionLineTwo">Compare</span>
            </div>
          </Link>

          <Link to="/checkout">
            <div className="header__optionBasket">
              <div className="header__basketIconContainer">
                <ShoppingCartIcon />
                <span className="header__basketCount">{getCartCount()}</span>
              </div>
              <span className="header__optionLineTwo">Cart</span>
            </div>
          </Link>
        </div>
      </div>

      <form className="header__search" onSubmit={handleSearch} role="search">
        <div 
          className="header__searchCategory" 
          ref={categoryRef}
          title="Search category"
          onClick={(e) => {
            e.preventDefault();
            setShowCategoryDropdown(!showCategoryDropdown);
          }}
        >
          {selectedCategory}
          <ArrowDropDownIcon />
          {showCategoryDropdown && (
            <div className="header__categoryDropdown">
              {categories.map((category) => (
                <div
                  key={category}
                  className={`header__categoryOption ${selectedCategory === category ? 'selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCategorySelect(category);
                  }}
                >
                  {category}
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          className="header__searchInput"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          autoComplete="off"
        />
        <button type="submit" className="header__searchIconContainer" aria-label="Search">
          <SearchIcon className="header__searchIcon" />
        </button>
      </form>
    </div>
  );
};

export default Header;