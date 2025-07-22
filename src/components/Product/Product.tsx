import React from 'react';
import { useApp, Product as ProductType } from '../../context/AppContext';
import './Product.css';

interface ProductProps {
  product: ProductType;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { dispatch } = useApp();

  const addToBasket = () => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">☆</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ color: '#ddd' }}>★</span>);
    }
    
    return stars;
  };

  const getRandomReviewCount = () => {
    return Math.floor(Math.random() * 5000) + 100;
  };

  const isOnSale = Math.random() > 0.7;
  const originalPrice = isOnSale ? product.price * 1.2 : null;

  return (
    <div className="product">
      {isOnSale && <div className="product__badge">Deal</div>}
      
      <img src={product.image} alt={product.title} />

      <div className="product__info">
        <p>{product.title}</p>
        
        <div className="product__rating">
          <div className="product__stars">
            {renderStars(product.rating)}
          </div>
          <a href="#" className="product__ratingCount">
            ({getRandomReviewCount().toLocaleString()})
          </a>
        </div>

        <div className="product__price">
          <small>$</small>
          <strong>{product.price.toFixed(2)}</strong>
          {originalPrice && (
            <span style={{ 
              textDecoration: 'line-through', 
              color: '#565959', 
              fontSize: '14px',
              marginLeft: '8px'
            }}>
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="product__shipping">FREE delivery</div>
        <div className="product__prime">Prime</div>
      </div>

      <button onClick={addToBasket}>Add to Cart</button>
    </div>
  );
};

export default Product;