import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import Product from '../Product/Product';
import { Carousel, Skeleton } from '../ui';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RecommendIcon from '@mui/icons-material/Recommend';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import './Home.css';

const Home: React.FC = () => {
  const { state, dispatch } = useApp();
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVisible, setIsVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState<{ [key: string]: boolean }>({});
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [dealTimer, setDealTimer] = useState({ hours: 12, minutes: 34, seconds: 56 });

  const carouselImages = [
    {
      url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Tech Innovation Sale',
      subtitle: 'Up to 50% off electronics',
      cta: 'Shop Now'
    },
    {
      url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Home & Garden',
      subtitle: 'Transform your space',
      cta: 'Explore'
    },
    {
      url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Fashion Forward',
      subtitle: 'Latest trends & styles',
      cta: 'Browse'
    },
    {
      url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      title: 'Kitchen Essentials',
      subtitle: 'Culinary excellence',
      cta: 'Discover'
    }
  ];

  const categories = [
    { name: 'Electronics', icon: '📱', color: '#4F46E5', count: '2.5k+ items' },
    { name: 'Fashion', icon: '👗', color: '#EC4899', count: '5k+ items' },
    { name: 'Home & Garden', icon: '🏠', color: '#10B981', count: '3.2k+ items' },
    { name: 'Sports', icon: '⚽', color: '#F59E0B', count: '1.8k+ items' },
    { name: 'Books', icon: '📚', color: '#8B5CF6', count: '900+ items' },
    { name: 'Beauty', icon: '💄', color: '#EF4444', count: '1.5k+ items' }
  ];

  // Intersection Observer for scroll animations
  const observerCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setVisibleSections(prev => ({ ...prev, [entry.target.id]: true }));
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px 0px -50px 0px'
    });

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [observerCallback]);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Deal timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setDealTimer(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else {
          // Reset timer when it reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Mock products data
    const mockProducts = [
      {
        id: '1',
        title: 'The Lean Startup: How Constant Innovation Creates Radically Successful Businesses Paperback',
        price: 11.96,
        rating: 4.5,
        image: 'https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg',
        description: 'A great book for entrepreneurs',
        category: 'Books',
        brand: 'Penguin',
        inStock: 25,
        tags: ['business', 'entrepreneurship', 'startup']
      },
      {
        id: '2',
        title: 'Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl',
        price: 239.0,
        rating: 4.2,
        image: 'https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg',
        description: 'Perfect for baking enthusiasts',
        category: 'Kitchen',
        brand: 'Kenwood',
        inStock: 12,
        tags: ['appliance', 'baking', 'mixer']
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
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
      setIsVisible(true);
    }, 1000);
  }, [dispatch]);

  return (
    <div className="home page-enter">
      {/* Floating Action Button */}
      <div className="home__floatingActions">
        <button 
          className="home__fab home__fab--primary animate-bounce" 
          title="Start Shopping"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        >
          <ShoppingBagIcon />
        </button>
        <button 
          className="home__fab home__fab--secondary animate-pulse" 
          title="Today's Deals"
          onClick={() => document.getElementById('deals')?.scrollIntoView({ behavior: 'smooth' })}
        >
          <LocalOfferIcon />
        </button>
      </div>

      <div className="home__container">
        {/* Enhanced Hero Section */}
        <div 
          className="home__hero animate-fade-in" 
          ref={heroRef}
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        >
          <div className="home__heroOverlay">
            <h1 className="home__heroTitle animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Welcome to <span className="home__brandText">ShopZone</span>
            </h1>
            <p className="home__heroSubtitle animate-fade-in" style={{ animationDelay: '0.7s' }}>
              Discover amazing products at unbeatable prices
            </p>
            <div className="home__heroStats animate-scale-in" style={{ animationDelay: '0.9s' }}>
              <div className="home__stat">
                <StarIcon className="home__statIcon" />
                <span>4.8⭐ Rating</span>
              </div>
              <div className="home__stat">
                <ShoppingBagIcon className="home__statIcon" />
                <span>1M+ Products</span>
              </div>
              <div className="home__stat">
                <FlashOnIcon className="home__statIcon" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
          <Carousel images={carouselImages.map(img => img.url)} height="600px" />
        </div>

        {/* Categories Section */}
        <div 
          className={`home__categories ${visibleSections.categories ? 'animate-fade-in' : ''}`}
          id="categories"
          ref={el => { sectionRefs.current.categories = el; }}
        >
          <h2 className="home__sectionTitle">
            <LocalOfferIcon className="home__sectionIcon" />
            Shop by Category
          </h2>
          <div className="home__categoryGrid">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className="home__categoryCard animate-scale-in"
                style={{ animationDelay: `${0.1 * index}s` }}
                onClick={() => {
                  // Navigate to category or filter products
                  console.log(`Navigate to ${category.name} category`);
                  // You can implement navigation or filtering here
                }}
              >
                <div className="home__categoryIcon" style={{ backgroundColor: category.color }}>
                  {category.icon}
                </div>
                <h3 className="home__categoryName">{category.name}</h3>
                <p className="home__categoryCount">{category.count}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Deals Section */}
        <div 
          className={`home__featured home__featured--flash ${visibleSections.deals ? 'animate-slide-up' : ''}`}
          id="deals"
          ref={el => { sectionRefs.current.deals = el; }}
        >
          <div className="home__featuredHeader">
            <h2 className="home__featuredTitle">
              <FlashOnIcon className="home__titleIcon" />
              ⚡ Flash Deals
              <span className="home__dealTimer">
                Ends in {String(dealTimer.hours).padStart(2, '0')}:
                {String(dealTimer.minutes).padStart(2, '0')}:
                {String(dealTimer.seconds).padStart(2, '0')}
              </span>
            </h2>
            <button className="home__viewAll btn-outline">View All Deals</button>
          </div>
          <div className="home__row stagger-children">
            {loading ? (
              Array(4).fill(0).map((_, index) => (
                <div key={index} className="product-skeleton animate-pulse">
                  <Skeleton variant="rectangular" height={200} className="skeleton-rounded" />
                  <Skeleton variant="text" className="mt-2" />
                  <Skeleton variant="text" width="60%" />
                </div>
              ))
            ) : (
              state.products.slice(0, 4).map((product, index) => (
                <Product key={product.id} product={product} index={index} />
              ))
            )}
          </div>
        </div>

        {/* Best Sellers Section */}
        <div 
          className={`home__featured home__featured--bestsellers ${visibleSections.bestsellers ? 'animate-fade-in' : ''}`}
          id="bestsellers"
          ref={el => { sectionRefs.current.bestsellers = el; }}
        >
          <div className="home__featuredHeader">
            <h2 className="home__featuredTitle">
              <TrendingUpIcon className="home__titleIcon" />
              🔥 Best Sellers
            </h2>
            <div className="home__bestsellersFilters">
              <button className="home__filter home__filter--active">All</button>
              <button className="home__filter">Electronics</button>
              <button className="home__filter">Fashion</button>
              <button className="home__filter">Home</button>
            </div>
          </div>
          <div className="home__row stagger-children">
            {state.products.slice(4, 8).map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* Recommended Section */}
        <div 
          className={`home__featured home__featured--recommended ${visibleSections.recommended ? 'animate-slide-up' : ''}`}
          id="recommended"
          ref={el => { sectionRefs.current.recommended = el; }}
        >
          <div className="home__featuredHeader">
            <h2 className="home__featuredTitle">
              <RecommendIcon className="home__titleIcon" />
              💡 Recommended for You
            </h2>
            <p className="home__featuredSubtitle">Based on your browsing history</p>
          </div>
          <div className="home__row stagger-children">
            {state.products.slice(2, 6).map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          className={`home__newsletter ${visibleSections.newsletter ? 'animate-scale-in' : ''}`}
          id="newsletter"
          ref={el => { sectionRefs.current.newsletter = el; }}
        >
          <div className="home__newsletterContent">
            <h3 className="home__newsletterTitle">Stay in the Loop!</h3>
            <p className="home__newsletterText">
              Get exclusive deals, new arrivals & special offers delivered to your inbox
            </p>
            <div className="home__newsletterForm">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="home__newsletterInput"
              />
              <button className="home__newsletterButton btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;