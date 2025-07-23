import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Container, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  CardActions, 
  Button, 
  Rating, 
  Box,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Wishlist.css';

const Wishlist: React.FC = () => {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: productId });
  };

  const handleAddToCart = (product: any) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container className="wishlist-container">
      <Typography variant="h4" component="h1" gutterBottom className="wishlist-title">
        My Wishlist
      </Typography>

      {state.wishlist.length === 0 ? (
        <Box className="empty-wishlist">
          <FavoriteBorderIcon className="empty-wishlist-icon" />
          <Typography variant="h6">Your wishlist is empty</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            Add items you love to your wishlist. Review them anytime and easily move them to the cart.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={() => navigate('/')}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
          {state.wishlist.map((product) => (
            <Box key={product.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3' } }}>
              <Card className="wishlist-card">
                <Box className="wishlist-card-media-container">
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    className="wishlist-card-media"
                    onClick={() => handleProductClick(product.id)}
                  />
                </Box>
                <CardContent className="wishlist-card-content">
                  <Typography 
                    variant="h6" 
                    component="h2" 
                    className="wishlist-product-title"
                    onClick={() => handleProductClick(product.id)}
                  >
                    {product.title}
                  </Typography>
                  <Box display="flex" alignItems="center" mb={1}>
                    <Rating value={product.rating} precision={0.5} size="small" readOnly />
                    <Typography variant="body2" color="textSecondary" ml={1}>
                      ({product.rating})
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    ${product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions className="wishlist-card-actions">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<ShoppingCartIcon />}
                    onClick={() => handleAddToCart(product)}
                    size="small"
                  >
                    Add to Cart
                  </Button>
                  <IconButton 
                    aria-label="remove from wishlist"
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Wishlist;