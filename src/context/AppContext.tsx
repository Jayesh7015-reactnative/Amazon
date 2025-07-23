import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  description?: string;
  category?: string;
  brand?: string;
  inStock?: number;
  tags?: string[];
  reviews?: Review[];
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minAmount?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface SearchFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  brand?: string;
  inStock?: boolean;
}

interface AppState {
  cart: CartItem[];
  user: User | null;
  products: Product[];
  wishlist: Product[];
  searchResults: Product[];
  recentlyViewed: Product[];
  orders: Order[];
  categories: string[];
  appliedCoupon: Coupon | null;
  searchFilters: SearchFilters;
  compareList: Product[];
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'SET_SEARCH_RESULTS'; payload: Product[] }
  | { type: 'UPDATE_PRODUCT_QUANTITY'; payload: { id: string, quantity: number } }
  | { type: 'ADD_TO_RECENTLY_VIEWED'; payload: Product }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'SET_CATEGORIES'; payload: string[] }
  | { type: 'APPLY_COUPON'; payload: Coupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_SEARCH_FILTERS'; payload: SearchFilters }
  | { type: 'ADD_TO_COMPARE'; payload: Product }
  | { type: 'REMOVE_FROM_COMPARE'; payload: string }
  | { type: 'CLEAR_COMPARE' }
  | { type: 'ADD_REVIEW'; payload: { productId: string, review: Review } };

const initialState: AppState = {
  cart: [],
  user: null,
  products: [],
  wishlist: [],
  searchResults: [],
  recentlyViewed: [],
  orders: [],
  categories: [],
  appliedCoupon: null,
  searchFilters: {},
  compareList: []
};

// Reducer
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    
    case 'ADD_TO_WISHLIST':
      // Check if product already exists in wishlist
      if (state.wishlist.some(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };
    
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: action.payload
      };
    
    case 'UPDATE_PRODUCT_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };
    
    case 'ADD_TO_RECENTLY_VIEWED':
      // Add to recently viewed, keep only last 10 items
      const updatedRecentlyViewed = [
        action.payload,
        ...state.recentlyViewed.filter(item => item.id !== action.payload.id)
      ].slice(0, 10);
      return {
        ...state,
        recentlyViewed: updatedRecentlyViewed
      };
    
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders]
      };
    
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };
    
    case 'SET_CATEGORIES':
      return {
        ...state,
        categories: action.payload
      };
    
    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload
      };
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null
      };
    
    case 'SET_SEARCH_FILTERS':
      return {
        ...state,
        searchFilters: action.payload
      };
    
    case 'ADD_TO_COMPARE':
      // Limit compare list to 4 items
      if (state.compareList.length >= 4) {
        throw new Error('Maximum 4 products can be compared');
      }
      if (state.compareList.some(item => item.id === action.payload.id)) {
        throw new Error('Product is already in compare list');
      }
      return {
        ...state,
        compareList: [...state.compareList, action.payload]
      };
    
    case 'REMOVE_FROM_COMPARE':
      return {
        ...state,
        compareList: state.compareList.filter(item => item.id !== action.payload)
      };
    
    case 'CLEAR_COMPARE':
      return {
        ...state,
        compareList: []
      };
    
    case 'ADD_REVIEW':
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.productId
            ? {
                ...product,
                reviews: [...(product.reviews || []), action.payload.review]
              }
            : product
        )
      };
    
    default:
      return state;
  }
};

// Context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Load state from localStorage
const loadState = (): AppState => {
  try {
    const serializedState = localStorage.getItem('shopHubState');
    if (serializedState === null) {
      return initialState;
    }
    const parsedState = JSON.parse(serializedState);
    return {
      ...initialState,
      cart: parsedState.cart || [],
      wishlist: parsedState.wishlist || [],
      compareList: parsedState.compareList || [],
      user: parsedState.user || null
    };
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return initialState;
  }
};

// Provider
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, loadState());

  // Save state to localStorage whenever it changes
  React.useEffect(() => {
    try {
      const serializedState = JSON.stringify({
        cart: state.cart,
        wishlist: state.wishlist,
        compareList: state.compareList,
        user: state.user
      });
      localStorage.setItem('shopHubState', serializedState);
    } catch (err) {
      console.error('Error saving state to localStorage:', err);
    }
  }, [state.cart, state.wishlist, state.compareList, state.user]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};