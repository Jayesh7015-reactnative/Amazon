import React from 'react';
import { useApp } from '../../context/AppContext';
import './CheckoutProduct.css';

interface CheckoutProductProps {
  id: string;
  image: string;
  title: string;
  price: number;
  rating: number;
  quantity: number;
}

const CheckoutProduct: React.FC<CheckoutProductProps> = ({
  id,
  image,
  title,
  price,
  rating,
  quantity
}) => {
  const { dispatch } = useApp();

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
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

  // Random boolean for Prime eligibility
  const isPrime = Math.random() > 0.3;

  return (
    <div className="checkoutProduct">
      <img className="checkoutProduct__image" src={image} alt={title} />

      <div className="checkoutProduct__info">
        <p className="checkoutProduct__title">{title}</p>
        <p className="checkoutProduct__stock">In Stock</p>
        
        <p className="checkoutProduct__price">
          <small>$</small>
          <strong>{price.toFixed(2)}</strong>
        </p>
        
        {isPrime && (
          <div className="checkoutProduct__prime">
            Prime FREE Delivery
          </div>
        )}
        
        <div className="checkoutProduct__rating">
          <div className="checkoutProduct__stars">
            {renderStars(rating)}
          </div>
        </div>
        
        <div className="checkoutProduct__quantity">
          <span className="checkoutProduct__quantityLabel">Quantity:</span>
          <select className="checkoutProduct__quantitySelect" defaultValue={quantity}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        
        <div className="checkoutProduct__actions">
          <button onClick={removeFromBasket}>Delete</button>
          <button>Save for later</button>
          <button>Compare with similar items</button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;