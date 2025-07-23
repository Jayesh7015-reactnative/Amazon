import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import StarIcon from '@mui/icons-material/Star';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CameraIcon from '@mui/icons-material/Camera';
import BatteryFullIcon from '@mui/icons-material/BatteryFull';
import StorageIcon from '@mui/icons-material/Storage';
import MemoryIcon from '@mui/icons-material/Memory';
import DisplaySettingsIcon from '@mui/icons-material/DisplaySettings';
import './CompareProducts.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  description: string;
  category: string;
  brand: string;
  inStock: number;
  tags: string[];
  discount?: number;
  specifications?: {
    general?: {
      brand?: string;
      model?: string;
      releaseDate?: string;
      weight?: string;
      dimensions?: string;
      color?: string;
    };
    display?: {
      size?: string;
      resolution?: string;
      type?: string;
      ppi?: string;
      aspectRatio?: string;
    };
    performance?: {
      processor?: string;
      ram?: string;
      storage?: string;
      os?: string;
      gpu?: string;
    };
    camera?: {
      rear?: string;
      front?: string;
      video?: string;
      features?: string[];
    };
    battery?: {
      capacity?: string;
      type?: string;
      charging?: string;
      wireless?: boolean;
    };
    connectivity?: {
      network?: string;
      wifi?: string;
      bluetooth?: string;
      nfc?: boolean;
      usb?: string;
    };
  };
}

const CompareProducts: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Enhanced product data with specifications
  const enhancedProducts = state.compareList.map((product: any) => ({
    ...product,
    specifications: {
      general: {
        brand: product.brand || 'Unknown',
        model: product.title.substring(0, 20),
        releaseDate: '2023',
        weight: '180g',
        dimensions: '160 x 75 x 8.5 mm',
        color: 'Various'
      },
      display: {
        size: product.category === 'Electronics' ? '6.5"' : '13.3"',
        resolution: product.category === 'Electronics' ? '1080 x 2400' : '1920 x 1080',
        type: 'OLED',
        ppi: '411',
        aspectRatio: '20:9'
      },
      performance: {
        processor: 'Snapdragon 888',
        ram: '8GB',
        storage: '128GB',
        os: 'Android 12',
        gpu: 'Adreno 660'
      },
      camera: {
        rear: '50MP + 12MP + 8MP',
        front: '32MP',
        video: '4K@60fps',
        features: ['Night Mode', 'Portrait', 'Ultra Wide']
      },
      battery: {
        capacity: '4500mAh',
        type: 'Li-Polymer',
        charging: '67W Fast Charging',
        wireless: true
      },
      connectivity: {
        network: '5G, 4G LTE',
        wifi: 'Wi-Fi 6',
        bluetooth: '5.2',
        nfc: true,
        usb: 'USB-C'
      }
    }
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <PhoneAndroidIcon /> },
    { id: 'display', label: 'Display', icon: <DisplaySettingsIcon /> },
    { id: 'performance', label: 'Performance', icon: <MemoryIcon /> },
    { id: 'camera', label: 'Camera', icon: <CameraIcon /> },
    { id: 'battery', label: 'Battery', icon: <BatteryFullIcon /> },
    { id: 'storage', label: 'Storage', icon: <StorageIcon /> }
  ];

  const handleRemoveFromCompare = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: productId });
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  const handleClearCompare = () => {
    dispatch({ type: 'CLEAR_COMPARE' });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <StarIcon
        key={i}
        className={i < Math.floor(rating) ? 'star-filled' : 'star-empty'}
      />
    ));
  };

  const getBetterValue = (products: any[], key: string, subKey?: string) => {
    if (products.length < 2) return null;
    
    const values = products.map(p => {
      if (subKey) {
        return p.specifications?.[key]?.[subKey];
      }
      return p[key];
    });

    if (key === 'price') {
      return Math.min(...values.filter(v => v !== undefined));
    }
    if (key === 'rating') {
      return Math.max(...values.filter(v => v !== undefined));
    }
    
    return null;
  };

  const isHighlighted = (product: any, key: string, subKey?: string) => {
    const betterValue = getBetterValue(enhancedProducts, key, subKey);
    if (betterValue === null) return false;
    
    const currentValue = subKey ? product.specifications?.[key]?.[subKey] : product[key];
    return currentValue === betterValue;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Price</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className={`spec-value ${isHighlighted(product, 'price') ? 'highlighted' : ''}`}>
                  <div className="price-info">
                    <span className="current-price">${product.price}</span>
                    {product.originalPrice && (
                      <span className="original-price">${product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span className="discount-badge">{product.discount}% OFF</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="comparison-row">
              <div className="spec-name">Rating</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className={`spec-value ${isHighlighted(product, 'rating') ? 'highlighted' : ''}`}>
                  <div className="rating-info">
                    <div className="stars">
                      {renderStars(product.rating)}
                    </div>
                    <span className="rating-text">{product.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="spec-name">Brand</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.general.brand}
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="spec-name">Availability</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  <div className="availability-info">
                    {product.inStock > 0 ? (
                      <>
                        <CheckCircleIcon className="in-stock-icon" />
                        <span>In Stock ({product.inStock})</span>
                      </>
                    ) : (
                      <>
                        <CancelIcon className="out-stock-icon" />
                        <span>Out of Stock</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="comparison-row">
              <div className="spec-name">Free Delivery</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  <div className="delivery-info">
                    <LocalShippingIcon className="delivery-icon" />
                    <span>Free Delivery Available</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'display':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Screen Size</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.display.size}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Resolution</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.display.resolution}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Display Type</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.display.type}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">PPI</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.display.ppi}
                </div>
              ))}
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Processor</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.processor}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">RAM</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.ram}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Operating System</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.os}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">GPU</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.gpu}
                </div>
              ))}
            </div>
          </div>
        );

      case 'camera':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Rear Camera</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.camera.rear}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Front Camera</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.camera.front}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Video Recording</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.camera.video}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Camera Features</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.camera.features.join(', ')}
                </div>
              ))}
            </div>
          </div>
        );

      case 'battery':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Battery Capacity</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.battery.capacity}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Battery Type</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.battery.type}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Fast Charging</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.battery.charging}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Wireless Charging</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.battery.wireless ? (
                    <CheckCircleIcon className="feature-available" />
                  ) : (
                    <CancelIcon className="feature-unavailable" />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'storage':
        return (
          <div className="comparison-table">
            <div className="comparison-row">
              <div className="spec-name">Internal Storage</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.storage}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">RAM</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  {product.specifications.performance.ram}
                </div>
              ))}
            </div>
            <div className="comparison-row">
              <div className="spec-name">Expandable Storage</div>
              {enhancedProducts.map(product => (
                <div key={product.id} className="spec-value">
                  <CheckCircleIcon className="feature-available" />
                  <span>Up to 1TB</span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="compare-container page-enter">
      <div className="compare-header animate-fade-in">
        <div className="header-content">
          <div className="header-left">
            <CompareArrowsIcon className="compare-main-icon" />
            <div>
              <h1 className="compare-title">Compare Products</h1>
              <p className="compare-subtitle">
                Compare {enhancedProducts.length} products side by side
              </p>
            </div>
          </div>
          
          {enhancedProducts.length > 0 && (
            <button className="btn btn-secondary" onClick={handleClearCompare}>
              <DeleteIcon /> Clear All
            </button>
          )}
        </div>
      </div>

      {enhancedProducts.length === 0 ? (
        <div className="empty-compare animate-scale-in">
          <CompareArrowsIcon className="empty-icon" />
          <h2>No products to compare</h2>
          <p>Add products to compare their features side by side.</p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Browse Products
          </button>
        </div>
      ) : (
        <>
          {/* Product Cards */}
          <div className="compare-products-section animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="product-cards-grid">
              {enhancedProducts.map((product, index) => (
                <div key={product.id} className={`product-compare-card animate-slide-up`} style={{ animationDelay: `${0.1 * index}s` }}>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemoveFromCompare(product.id)}
                  >
                    <DeleteIcon />
                  </button>
                  
                  <div className="product-image-section" onClick={() => handleProductClick(product.id)}>
                    <img src={product.image} alt={product.title} className="product-image" />
                  </div>
                  
                  <div className="product-info-section">
                    <h3 className="product-name" onClick={() => handleProductClick(product.id)}>
                      {product.title}
                    </h3>
                    
                    <div className="product-rating">
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="rating-text">({product.rating})</span>
                    </div>
                    
                    <div className="product-price-section">
                      <div className="price-info">
                        <span className="current-price">${product.price}</span>
                        {product.originalPrice && (
                          <span className="original-price">${product.originalPrice}</span>
                        )}
                      </div>
                      {product.discount && (
                        <span className="discount-badge">{product.discount}% OFF</span>
                      )}
                    </div>
                    
                    <button 
                      className="btn btn-primary add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCartIcon />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison Tabs */}
          <div className="comparison-section animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="comparison-tabs">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="comparison-content">
              <div className="comparison-table-header">
                <div className="spec-header"></div>
                {enhancedProducts.map(product => (
                  <div key={product.id} className="product-header">
                    <img src={product.image} alt={product.title} className="header-product-image" />
                    <span className="header-product-name">
                      {product.title.length > 25 ? `${product.title.substring(0, 25)}...` : product.title}
                    </span>
                  </div>
                ))}
              </div>
              
              {renderTabContent()}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompareProducts;