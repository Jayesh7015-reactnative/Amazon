import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import Product from '../Product/Product';
import { 
  Container, 
  Typography, 
  Box, 
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './SearchResults.css';

const SearchResults: React.FC = () => {
  const { state, dispatch } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState('relevance');
  
  const query = searchParams.get('q') || '';

  useEffect(() => {
    if (query && state.products.length > 0) {
      // Filter products based on search query
      const filteredProducts = state.products.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      );
      
      // Sort results
      let sortedProducts = [...filteredProducts];
      switch (sortBy) {
        case 'price-low':
          sortedProducts.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          sortedProducts.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sortedProducts.sort((a, b) => b.rating - a.rating);
          break;
        case 'name':
          sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
          break;
        default:
          // Keep relevance order (no additional sorting)
          break;
      }
      
      dispatch({ type: 'SET_SEARCH_RESULTS', payload: sortedProducts });
    }
  }, [query, state.products, sortBy, dispatch]);

  const handleSortChange = (event: any) => {
    setSortBy(event.target.value);
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH_RESULTS', payload: [] });
    navigate('/');
  };

  return (
    <Container className="search-results">
      <Paper elevation={2} className="search-header">
        <Box display="flex" alignItems="center" mb={2}>
          <SearchIcon className="search-icon" />
          <Typography variant="h5" component="h1" ml={1}>
            Search Results
          </Typography>
        </Box>
        
        {query && (
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Typography variant="body1">
              Results for:
            </Typography>
            <Chip 
              label={`"${query}"`} 
              onDelete={clearSearch}
              color="primary"
              variant="outlined"
            />
          </Box>
        )}
        
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="body2" color="textSecondary">
            {state.searchResults.length} results found
          </Typography>
          
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              label="Sort by"
              onChange={handleSortChange}
            >
              <MenuItem value="relevance">Relevance</MenuItem>
              <MenuItem value="price-low">Price: Low to High</MenuItem>
              <MenuItem value="price-high">Price: High to Low</MenuItem>
              <MenuItem value="rating">Customer Rating</MenuItem>
              <MenuItem value="name">Name: A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {state.searchResults.length === 0 ? (
        <Box className="no-results">
          <SearchIcon className="no-results-icon" />
          <Typography variant="h6">No results found</Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            {query ? `No products match "${query}". Try different keywords or browse our categories.` : 'Enter a search term to find products.'}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }} className="search-results-grid">
          {state.searchResults.map((product) => (
            <Box key={product.id} sx={{ gridColumn: { xs: 'span 12', sm: 'span 6', md: 'span 4', lg: 'span 3' } }}>
              <Product product={product} />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default SearchResults;