import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
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
    // In a real app, this would navigate to search results
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <div className="header">
      <Link to="/">
        <img 
          className="header__logo" 
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" 
          alt="Amazon Logo" 
        />
      </Link>

      <div className="header__location">
        <LocationOnOutlinedIcon className="header__locationIcon" />
        <div className="header__option">
          <span className="header__optionLineOne">Deliver to</span>
          <span className="header__optionLineTwo">United States</span>
        </div>
      </div>

      <form className="header__search" onSubmit={handleSearch}>
        <div className="header__searchCategory">
          All
          <ArrowDropDownIcon />
        </div>
        <input 
          className="header__searchInput" 
          type="text" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Amazon"
        />
        <div className="header__searchIconContainer">
          <SearchIcon className="header__searchIcon" />
        </div>
      </form>

      <div className="header__nav">
        <div onClick={handleLogin} className="header__option">
          <span className="header__optionLineOne">
            Hello, {state.user?.displayName || 'Sign in'}
          </span>
          <span className="header__optionLineTwo">
            Account & Lists
            <ArrowDropDownIcon />
          </span>
        </div>

        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">& Orders</span>
        </div>

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