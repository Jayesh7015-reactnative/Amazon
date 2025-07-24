import React, { useState } from 'react';
import { Product } from '../../context/AppContext';
import { useApp } from '../../context/AppContext';
import CloseIcon from '@mui/icons-material/Close';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import './ProductComparison.css';

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
}

const ProductComparison: React.FC<ProductComparisonProps> = ({
  isOpen,
  onClose,
  products
}) => {
  const { dispatch } = useApp();
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'price',
    'rating',
    'brand',
    'category',
    'inStock'
  ]);

  const allFeatures = [
    { key: 'price', label: 'Price', type: 'currency' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'brand', label: 'Brand', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'inStock', label: 'Availability', type: 'boolean' },
    { key: 'description', label: 'Description', type: 'text' },
    { key: 'tags', label: 'Features', type: 'array' }
  ];

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const removeProduct = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_COMPARE', payload: productId });
  };

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const addToWishlist = (product: Product) => {
    dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="comparison__star">
        {index < Math.floor(rating) ? (
          <StarIcon className="comparison__starFilled" />
        ) : (
          <StarBorderIcon className="comparison__starEmpty" />
        )}
      </span>
    ));
  };

  const renderFeatureValue = (product: Product, feature: any) => {
    const value = product[feature.key as keyof Product];

    switch (feature.type) {
      case 'currency':
        return <span className="comparison__price">{`$${value}`}</span>;
      
      case 'rating':
        return (
          <div className="comparison__rating">
            <div className="comparison__stars">
              {renderStars(value as number || 0)}
            </div>
            <span className="comparison__ratingValue">{value ? String(value) : 'N/A'}</span>
          </div>
        );
      
      case 'boolean':
        return (
          <div className="comparison__boolean">
            {value ? (
              <CheckCircleIcon className="comparison__booleanTrue" />
            ) : (
              <CancelIcon className="comparison__booleanFalse" />
            )}
            <span>{value ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        );
      
      case 'array':
        return (
          <div className="comparison__tags">
            {Array.isArray(value) && value.length > 0 ? (
              value.slice(0, 3).map((tag, index) => (
                <span key={index} className="comparison__tag">
                  {typeof tag === 'string' ? tag : String(tag)}
                </span>
              ))
            ) : (
              <span className="comparison__noData">No features listed</span>
            )}
          </div>
        );
      
      default:
        return <span>{value ? String(value) : 'N/A'}</span>;
    }
  };

  const getBestValue = (feature: any) => {
    if (feature.key === 'price') {
      return Math.min(...products.map(p => p.price));
    }
    if (feature.key === 'rating') {
      return Math.max(...products.map(p => p.rating || 0));
    }
    return null;
  };

  const isBestValue = (product: Product, feature: any) => {
    const bestValue = getBestValue(feature);
    if (bestValue === null) return false;
    
    if (feature.key === 'price') {
      return product.price === bestValue;
    }
    if (feature.key === 'rating') {
      return (product.rating || 0) === bestValue;
    }
    return false;
  };

  if (!isOpen || products.length === 0) return null;

  return (
    <div className="comparison__overlay" onClick={onClose}>
      <div className="comparison__modal" onClick={(e) => e.stopPropagation()}>
        <div className="comparison__header">
          <div className="comparison__title">
            <SwapHorizIcon />
            <span>Product Comparison ({products.length})</span>
          </div>
          <button className="comparison__close" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>

        <div className="comparison__content">
          {/* Feature Toggle */}
          <div className="comparison__featureToggle">
            <h4>Show/Hide Features:</h4>
            <div className="comparison__featureOptions">
              {allFeatures.map(feature => (
                <label key={feature.key} className="comparison__featureLabel">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature.key)}
                    onChange={() => toggleFeature(feature.key)}
                  />
                  <span className="comparison__featureCheckbox"></span>
                  {feature.label}
                </label>
              ))}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="comparison__table">
            <div className="comparison__tableHeader">
              <div className="comparison__headerCell comparison__headerCell--feature">
                Features
              </div>
              {products.map(product => (
                <div key={product.id} className="comparison__headerCell">
                  <div className="comparison__productHeader">
                    <button
                      className="comparison__removeProduct"
                      onClick={() => removeProduct(product.id)}
                      title="Remove from comparison"
                    >
                      <CloseIcon />
                    </button>
                    <div className="comparison__productImage">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <div className="comparison__productInfo">
                      <h3 className="comparison__productTitle">{product.title}</h3>
                      <div className="comparison__productActions">
                        <button
                          className="comparison__actionBtn comparison__actionBtn--cart"
                          onClick={() => addToCart(product)}
                          title="Add to Cart"
                        >
                          <ShoppingCartIcon />
                        </button>
                        <button
                          className="comparison__actionBtn comparison__actionBtn--wishlist"
                          onClick={() => addToWishlist(product)}
                          title="Add to Wishlist"
                        >
                          <FavoriteIcon />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="comparison__tableBody">
              {allFeatures
                .filter(feature => selectedFeatures.includes(feature.key))
                .map(feature => (
                  <div key={feature.key} className="comparison__tableRow">
                    <div className="comparison__featureCell">
                      <span className="comparison__featureName">{feature.label}</span>
                    </div>
                    {products.map(product => (
                      <div
                        key={product.id}
                        className={`comparison__valueCell ${
                          isBestValue(product, feature) ? 'comparison__valueCell--best' : ''
                        }`}
                      >
                        {renderFeatureValue(product, feature)}
                        {isBestValue(product, feature) && (
                          <span className="comparison__bestBadge">Best</span>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>

          {/* Summary */}
          <div className="comparison__summary">
            <h4>Quick Summary</h4>
            <div className="comparison__summaryGrid">
              <div className="comparison__summaryItem">
                <span className="comparison__summaryLabel">Lowest Price:</span>
                <span className="comparison__summaryValue">
                  {`$${Math.min(...products.map(p => p.price))}`}
                </span>
              </div>
              <div className="comparison__summaryItem">
                <span className="comparison__summaryLabel">Highest Rated:</span>
                <span className="comparison__summaryValue">
                  {`${Math.max(...products.map(p => p.rating || 0))} ⭐`}
                </span>
              </div>
              <div className="comparison__summaryItem">
                <span className="comparison__summaryLabel">In Stock:</span>
                <span className="comparison__summaryValue">
                  {`${products.filter(p => p.inStock && p.inStock > 0).length} of ${products.length}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;