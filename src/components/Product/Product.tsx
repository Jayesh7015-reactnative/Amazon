import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp, Product as ProductType } from '../../context/AppContext';
import { Card, Image, Button, showToast } from '../ui';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import './Product.css';

interface ProductProps {
  product: ProductType;
  index?: number;
}

const Product: React.FC<ProductProps> = ({ product, index = 0 }) => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const addToBasket = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
    showToast.success(`${product.title} added to cart!`);
  };
  
  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  
  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWishlist) {
      dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: product.id
      });
      showToast.info('Removed from wishlist');
    } else {
      dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: product
      });
      showToast.success('Added to wishlist!');
    }
  };
  
  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const addToCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      dispatch({ type: 'ADD_TO_COMPARE', payload: product });
      showToast.success('Added to compare!');
    } catch (error) {
      showToast.warning('Maximum 4 products can be compared');
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon key={i} className="star-icon filled" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalfIcon key="half" className="star-icon filled" />);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<StarBorderIcon key={`empty-${i}`} className="star-icon" />);
    }
    
    return stars;
  };

  // Use a deterministic approach based on product ID
  const getReviewCount = () => {
    const idNum = parseInt(product.id) || 0;
    return 100 + (idNum * 237) % 4900;
  };

  // Determine if product is on sale based on product ID
  const isOnSale = parseInt(product.id) % 3 === 0;
  const originalPrice = isOnSale ? product.price * 1.2 : null;
  const discount = isOnSale ? Math.round(((originalPrice! - product.price) / originalPrice!) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="product-wrapper"
    >
      <Card 
        hoverable 
        onClick={handleProductClick}
        className="product-card"
        padding="none"
      >
        {isOnSale && (
          <div className="product-badge-wrapper">
            <span className="product-badge-deal">Deal</span>
            <span className="product-badge-discount">-{discount}%</span>
          </div>
        )}
        
        <motion.button
          className="product-wishlist-btn"
          onClick={toggleWishlist}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isInWishlist ? 
            <FavoriteIcon className="wishlist-icon active" /> : 
            <FavoriteBorderIcon className="wishlist-icon" />
          }
        </motion.button>
        
        <div className="product-image-container">
          <Image
            src={product.image}
            alt={product.title}
            className="product-image"
            effect="blur"
          />
        </div>

        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          
          <div className="product-rating">
            <div className="product-stars">
              {renderStars(product.rating)}
            </div>
            <span className="product-rating-count">
              {getReviewCount().toLocaleString()}
            </span>
          </div>

          <div className="product-price">
            <span className="price-currency">$</span>
            <span className="price-whole">{Math.floor(product.price)}</span>
            <span className="price-fraction">{((product.price % 1) * 100).toFixed(0).padStart(2, '0')}</span>
            {originalPrice && (
              <span className="price-original">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          <div className="product-delivery">
            <LocalShippingIcon className="delivery-icon" />
            <span>FREE delivery</span>
            <span className="delivery-prime">Prime</span>
          </div>
        </div>

        <div className="product-actions">
          <Button
            variant="primary"
            size="medium"
            fullWidth
            onClick={addToBasket}
          >
            Add to Cart
          </Button>
          <Button
            variant="ghost"
            size="small"
            onClick={addToCompare}
            className="compare-btn"
          >
            Compare
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Product;