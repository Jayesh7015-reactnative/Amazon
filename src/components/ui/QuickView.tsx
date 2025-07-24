import React, { useState, useEffect } from 'react';
import { Product } from '../../context/AppContext';
import { useApp } from '../../context/AppContext';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import SecurityIcon from '@mui/icons-material/Security';
import './QuickView.css';

interface QuickViewProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const { state, dispatch } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);

  const isInWishlist = product ? state.wishlist.some(item => item.id === product.id) : false;
  const isInCompare = product ? state.compareList.some(item => item.id === product.id) : false;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const productImages = [product.image, product.image, product.image]; // Mock multiple images
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Navy', 'Gray'];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
    // Show success animation or toast
  };

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleCompareToggle = () => {
    if (isInCompare) {
      dispatch({ type: 'REMOVE_FROM_COMPARE', payload: product.id });
    } else {
      dispatch({ type: 'ADD_TO_COMPARE', payload: product });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className="quickview__star">
        {index < Math.floor(rating) ? (
          <StarIcon className="quickview__starFilled" />
        ) : (
          <StarBorderIcon className="quickview__starEmpty" />
        )}
      </span>
    ));
  };

  return (
    <div className="quickview__overlay" onClick={onClose}>
      <div className="quickview__modal" onClick={(e) => e.stopPropagation()}>
        <button className="quickview__close" onClick={onClose}>
          <CloseIcon />
        </button>

        <div className="quickview__content">
          {/* Image Gallery */}
          <div className="quickview__imageSection">
            <div className="quickview__mainImage">
              <img
                src={productImages[selectedImage]}
                alt={product.title}
                className="quickview__image"
              />
              <div className="quickview__badges">
                {product.inStock && product.inStock < 10 && (
                  <span className="quickview__badge quickview__badge--lowStock">
                    Only {product.inStock} left
                  </span>
                )}
                <span className="quickview__badge quickview__badge--discount">
                  25% OFF
                </span>
              </div>
            </div>
            <div className="quickview__thumbnails">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`quickview__thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img src={image} alt={`${product.title} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="quickview__details">
            <div className="quickview__header">
              <h2 className="quickview__title">{product.title}</h2>
              <div className="quickview__actions">
                <button
                  className={`quickview__actionBtn ${isInWishlist ? 'active' : ''}`}
                  onClick={handleWishlistToggle}
                  title="Add to Wishlist"
                >
                  {isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
                <button
                  className={`quickview__actionBtn ${isInCompare ? 'active' : ''}`}
                  onClick={handleCompareToggle}
                  title="Add to Compare"
                >
                  <CompareArrowsIcon />
                </button>
                <button
                  className="quickview__actionBtn"
                  onClick={handleShare}
                  title="Share"
                >
                  <ShareIcon />
                </button>
              </div>
            </div>

            <div className="quickview__rating">
              <div className="quickview__stars">
                {renderStars(product.rating || 4.5)}
              </div>
              <span className="quickview__ratingText">
                {product.rating || 4.5} (124 reviews)
              </span>
            </div>

            <div className="quickview__price">
              <span className="quickview__currentPrice">{`$${product.price}`}</span>
              <span className="quickview__originalPrice">{`$${(product.price * 1.25).toFixed(2)}`}</span>
              <span className="quickview__savings">Save 25%</span>
            </div>

            <div className="quickview__description">
              <p>
                {showFullDescription 
                  ? product.description 
                  : `${product.description?.substring(0, 150)}...`}
              </p>
              <button
                className="quickview__readMore"
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? 'Read Less' : 'Read More'}
              </button>
            </div>

            {/* Size Selection */}
            {product.category === 'Fashion' && (
              <div className="quickview__option">
                <label className="quickview__optionLabel">Size:</label>
                <div className="quickview__optionGrid">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`quickview__optionBtn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.category === 'Fashion' && (
              <div className="quickview__option">
                <label className="quickview__optionLabel">Color:</label>
                <div className="quickview__optionGrid">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`quickview__optionBtn ${selectedColor === color ? 'selected' : ''}`}
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selection */}
            <div className="quickview__option">
              <label className="quickview__optionLabel">Quantity:</label>
              <div className="quickview__quantitySelector">
                <button
                  className="quickview__quantityBtn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  −
                </button>
                <span className="quickview__quantity">{quantity}</span>
                <button
                  className="quickview__quantityBtn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="quickview__trustSignals">
              <div className="quickview__trustItem">
                <CheckCircleIcon className="quickview__trustIcon" />
                <span>Authentic Product</span>
              </div>
              <div className="quickview__trustItem">
                <LocalShippingIcon className="quickview__trustIcon" />
                <span>Free Shipping</span>
              </div>
              <div className="quickview__trustItem">
                <SecurityIcon className="quickview__trustIcon" />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="quickview__buttonGroup">
              <button
                className="quickview__addToCart"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button className="quickview__buyNow">
                Buy Now
              </button>
            </div>

            {/* Delivery Info */}
            <div className="quickview__deliveryInfo">
              <h4>Delivery Information</h4>
              <div className="quickview__deliveryItem">
                <strong>Standard Delivery:</strong> 3-5 business days
              </div>
              <div className="quickview__deliveryItem">
                <strong>Express Delivery:</strong> 1-2 business days
              </div>
              <div className="quickview__deliveryItem">
                <strong>Same Day Delivery:</strong> Available in select areas
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;