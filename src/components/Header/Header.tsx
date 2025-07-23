import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import './Header.css';

const Header: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

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
      // Filter products based on search query
      const filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: filteredProducts });
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="header">
      <Link to="/" aria-label="ShopZone Home">
        <div className="header__logo">
          <svg viewBox="0 0 140 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ShopZone Logo">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="30%" stopColor="#f7931e" />
                <stop offset="70%" stopColor="#fbb03b" />
                <stop offset="100%" stopColor="#ffcd3c" />
              </linearGradient>
              <linearGradient id="zoneGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00d4ff" />
                <stop offset="100%" stopColor="#5b8def" />
              </linearGradient>
              <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff9500" />
                <stop offset="100%" stopColor="#ff6b35" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="textShadow">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.2"/>
              </filter>
            </defs>
            
            {/* Modern Shopping Icon */}
            <g className="logo-icon">
              {/* Shopping bag body */}
              <path d="M8 12 L22 12 L24 32 Q24 35 21 35 L9 35 Q6 35 6 32 L8 12 Z" 
                    fill="url(#iconGradient)" 
                    filter="url(#glow)" />
              
              {/* Shopping bag handles */}
              <path d="M10 12 Q10 7 15 7 Q20 7 20 12" 
                    stroke="#ffffff" 
                    strokeWidth="2.5" 
                    fill="none" 
                    strokeLinecap="round" />
              
              {/* Sparkle effects */}
              <circle cx="12" cy="20" r="1" fill="#ffffff" opacity="0.8">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="18" cy="25" r="0.8" fill="#ffffff" opacity="0.6">
                <animate attributeName="opacity" values="0.2;0.8;0.2" dur="1.5s" repeatCount="indefinite" />
              </circle>
              
              {/* Shopping symbol */}
              <path d="M11 22 L13 24 L19 18" 
                    stroke="#ffffff" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    fill="none" 
                    opacity="0.9" />
            </g>
            
            {/* Brand Text */}
            <g className="logo-text">
              <text x="32" y="28" 
                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif" 
                    fontSize="24" 
                    fontWeight="900" 
                    fill="url(#logoGradient)"
                    filter="url(#textShadow)">
                Shop
              </text>
              <text x="85" y="28" 
                    fontFamily="'Inter', 'Segoe UI', Arial, sans-serif" 
                    fontSize="24" 
                    fontWeight="300" 
                    fill="url(#zoneGradient)"
                    filter="url(#textShadow)">
                Zone
              </text>
            </g>
            
            {/* Decorative elements */}
            <circle cx="130" cy="15" r="2" fill="url(#logoGradient)" opacity="0.6" className="logo-accent">
              <animate attributeName="r" values="2;3;2" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="135" cy="25" r="1.5" fill="url(#zoneGradient)" opacity="0.5" className="logo-accent">
              <animate attributeName="r" values="1.5;2.5;1.5" dur="2.5s" repeatCount="indefinite" />
            </circle>
          </svg>
        </div>
      </Link>

      <div className="header__location">
        <LocationOnOutlinedIcon className="header__locationIcon" />
        <div className="header__option">
          <span className="header__optionLineOne">Deliver to</span>
          <span className="header__optionLineTwo">United States</span>
        </div>
      </div>

      <form className="header__search" onSubmit={handleSearch} role="search">
        <div className="header__searchCategory" title="Search category">
          All
          <ArrowDropDownIcon />
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

      <div className="header__nav">
        {state.user ? (
          <Link to="/profile">
            <div className="header__option">
              <span className="header__optionLineOne">
                Hello, {state.user?.displayName || 'User'}
              </span>
              <span className="header__optionLineTwo">
                Account & Lists
                <ArrowDropDownIcon />
              </span>
            </div>
          </Link>
        ) : (
          <div onClick={handleLogin} className="header__option">
            <span className="header__optionLineOne">
              Hello, Sign in
            </span>
            <span className="header__optionLineTwo">
              Account & Lists
              <ArrowDropDownIcon />
            </span>
          </div>
        )}

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

        <Link to="/wishlist">
          <div className="header__optionWishlist">
            <FavoriteIcon />
            <span className="header__optionLineTwo">Wishlist</span>
          </div>
        </Link>

        <Link to="/compare">
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
  );
};

export default Header;