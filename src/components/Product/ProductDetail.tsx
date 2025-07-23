import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Button, Rating, Typography, Box, Paper, Divider, Skeleton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import './ProductDetail.css';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // In a real app, you would fetch the product details from an API
    const foundProduct = state.products.find(p => p.id === id);
    
    // Simulate API call
    setTimeout(() => {
      if (foundProduct) {
        setProduct(foundProduct);
      }
      setLoading(false);
    }, 500);
  }, [id, state.products]);

  const isInWishlist = state.wishlist.some(item => item.id === id);

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id as string });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleBuyNow = () => {
    if (product) {
      handleAddToCart();
      navigate('/checkout');
    }
  };

  if (loading) {
    return (
      <div className="product-detail">
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Skeleton variant="rectangular" height={400} />
          </Box>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={100} />
            <Box mt={2}>
              <Skeleton variant="rectangular" height={50} width="80%" />
            </Box>
          </Box>
        </Box>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail">
        <Typography variant="h4">Product not found</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="product-detail">
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Paper elevation={3} className="product-image-container">
            <img src={product.image} alt={product.title} className="product-detail-image" />
          </Paper>
        </Box>
        <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 6' } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          
          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="textSecondary" ml={1}>
              ({product.rating})
            </Typography>
          </Box>
          
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price.toFixed(2)}
          </Typography>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body1" sx={{ mb: 2 }}>
            {product.description || "No description available for this product."}
          </Typography>
          
          <Box display="flex" alignItems="center" mt={3} mb={2}>
            <Typography variant="body1" mr={2}>Quantity:</Typography>
            <select 
              value={quantity} 
              onChange={handleQuantityChange}
              className="quantity-select"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </Box>
          
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mt={2}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              startIcon={<ShoppingCartIcon />}
              onClick={handleAddToCart}
              fullWidth
            >
              Add to Cart
            </Button>
            
            <Button 
              variant="contained" 
              color="secondary" 
              size="large"
              onClick={handleBuyNow}
              fullWidth
            >
              Buy Now
            </Button>
          </Box>
          
          <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2} mt={2}>
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              startIcon={isInWishlist ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleToggleWishlist}
              fullWidth
            >
              {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
            
            <Button 
              variant="outlined" 
              color="info" 
              size="large"
              startIcon={<CompareArrowsIcon />}
              onClick={() => {
                dispatch({ type: 'ADD_TO_COMPARE', payload: product });
                navigate('/compare');
              }}
              fullWidth
            >
              Add to Compare
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default ProductDetail;