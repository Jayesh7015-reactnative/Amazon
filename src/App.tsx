import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ToastProvider } from './components/ui';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Checkout from './components/Checkout/Checkout';
import ProductDetail from './components/Product/ProductDetail';
import Profile from './components/Profile/Profile';
import Wishlist from './components/Wishlist/Wishlist';
import SearchResults from './components/Search/SearchResults';
import CompareProducts from './components/Compare/CompareProducts';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="App">
          <ToastProvider position="top-right" />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/compare" element={<CompareProducts />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
