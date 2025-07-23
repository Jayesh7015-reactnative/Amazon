import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';
import './Checkout.css';

const Checkout: React.FC = () => {
  const { state } = useApp();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt="Advertisement"
        />

        <p className="checkout__greeting">Hello, {state.user?.displayName || 'Guest'}</p>
        <h2 className="checkout__title">Your Shopping Cart</h2>

        {state.cart.length === 0 ? (
          <div className="checkout__empty">
            <h3 className="checkout__emptyTitle">Your ShopZone Cart is empty</h3>
            <p className="checkout__emptyInfo">
              Your shopping cart is waiting. Give it purpose – fill it with amazing products, electronics, books, and more.
            </p>
            <Link to="/">
              <button className="checkout__emptyButton">Continue shopping</button>
            </Link>
          </div>
        ) : (
          state.cart.map(item => (
            <CheckoutProduct
              key={item.id}
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))
        )}
      </div>

      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;