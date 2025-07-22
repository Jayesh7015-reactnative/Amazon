import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import Product from '../Product/Product';
import './Home.css';

const Home: React.FC = () => {
  const { state, dispatch } = useApp();

  useEffect(() => {
    // Mock products data
    const mockProducts = [
      {
        id: '1',
        title: 'The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback',
        price: 11.96,
        rating: 4.5,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
        description: 'A great book for entrepreneurs'
      },
      {
        id: '2',
        title: 'Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl',
        price: 239.0,
        rating: 4.2,
        image: 'https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg',
        description: 'Perfect for baking enthusiasts'
      },
      {
        id: '3',
        title: 'Samsung LC49RG90SSUXEN 49" Curved LED Gaming Monitor',
        price: 199.99,
        rating: 3.8,
        image: 'https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg',
        description: 'Ultra-wide gaming monitor'
      },
      {
        id: '4',
        title: 'Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric',
        price: 98.99,
        rating: 4.7,
        image: 'https://m.media-amazon.com/images/I/61EXU8BuGZL._AC_SL1000_.jpg',
        description: 'Smart speaker with Alexa'
      },
      {
        id: '5',
        title: 'New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)',
        price: 598.99,
        rating: 4.9,
        image: 'https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SX385_.jpg',
        description: 'Latest iPad Pro with M1 chip'
      },
      {
        id: '6',
        title: 'Samsung LC49RG90SSUXEN 49" Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440',
        price: 1094.98,
        rating: 4.3,
        image: 'https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SX355_.jpg',
        description: 'Professional gaming monitor'
      },
      {
        id: '7',
        title: 'Bose QuietComfort 45 Bluetooth Wireless Noise Cancelling Headphones',
        price: 329.00,
        rating: 4.6,
        image: 'https://m.media-amazon.com/images/I/51JbsHSktkL._AC_SL1500_.jpg',
        description: 'Premium noise cancelling headphones'
      },
      {
        id: '8',
        title: 'Nintendo Switch with Neon Blue and Neon Red Joy‑Con',
        price: 299.99,
        rating: 4.8,
        image: 'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg',
        description: 'Popular gaming console'
      }
    ];

    dispatch({ type: 'SET_PRODUCTS', payload: mockProducts });
  }, [dispatch]);

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__carousel">
          <img
            className="home__image"
            src="https://m.media-amazon.com/images/I/61zAjw4bqPL._SX3000_.jpg"
            alt="Amazon Banner"
          />
        </div>

        <div className="home__featured">
          <h2 className="home__featuredTitle">Today's Deals</h2>
          <div className="home__row">
            {state.products.slice(0, 4).map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="home__featured">
          <h2 className="home__featuredTitle">Best Sellers</h2>
          <div className="home__row">
            {state.products.slice(4, 8).map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="home__featured">
          <h2 className="home__featuredTitle">Recommended for You</h2>
          <div className="home__row">
            {state.products.slice(2, 6).map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;