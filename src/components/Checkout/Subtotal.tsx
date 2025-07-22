import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import './Subtotal.css';

const Subtotal: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);

  const getCartTotal = () => {
    return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  };

  const proceedToPayment = () => {
    if (!state.user) {
      navigate('/login');
    } else {
      // In a real app, this would integrate with a payment processor
      alert('Payment functionality would be implemented here!');
    }
  };

  const cartTotal = getCartTotal();
  const itemCount = getCartCount();
  const isEligibleForFreeDelivery = cartTotal > 25;

  return (
    <div className="subtotal">
      {state.cart.length > 0 ? (
        <>
          <div className="subtotal__title">
            Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </div>
          <div className="subtotal__price">
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
          <div className="subtotal__gift">
            <input 
              type="checkbox" 
              id="gift-option"
              checked={isGift}
              onChange={() => setIsGift(!isGift)}
            />
            <label htmlFor="gift-option">This order contains a gift</label>
          </div>
          
          {isEligibleForFreeDelivery && (
            <div className="subtotal__eligibility">
              Your order qualifies for FREE Shipping.
            </div>
          )}
          
          <button onClick={proceedToPayment} disabled={state.cart.length === 0}>
            Proceed to checkout
          </button>
          
          <div className="subtotal__notice">
            By placing your order, you agree to Amazon's privacy notice and conditions of use.
          </div>
        </>
      ) : (
        <div className="subtotal__empty">
          <div className="subtotal__title">Your cart is empty</div>
          <button onClick={() => navigate('/')}>
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Subtotal;