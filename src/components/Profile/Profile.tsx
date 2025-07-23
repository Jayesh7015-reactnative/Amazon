import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  Avatar, 
  Button, 
  TextField,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PersonIcon from '@mui/icons-material/Person';
import './Profile.css';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Profile: React.FC = () => {
  const { state } = useApp();
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    displayName: state.user?.displayName || '',
    email: state.user?.email || '',
    phone: '',
    address: '',
  });

  // Mock order history
  const [orderHistory] = useState([
    { 
      id: 'ORD123456', 
      date: '2025-07-15', 
      total: 129.99, 
      status: 'Delivered',
      items: [
        { id: 'prod1', name: 'Wireless Headphones', price: 79.99, quantity: 1, image: 'https://via.placeholder.com/50' },
        { id: 'prod2', name: 'Phone Case', price: 24.99, quantity: 2, image: 'https://via.placeholder.com/50' }
      ]
    },
    { 
      id: 'ORD789012', 
      date: '2025-07-01', 
      total: 349.95, 
      status: 'Shipped',
      items: [
        { id: 'prod3', name: 'Smart Watch', price: 349.95, quantity: 1, image: 'https://via.placeholder.com/50' }
      ]
    }
  ]);

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!state.user) {
      navigate('/login');
    }
  }, [state.user, navigate]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditToggle = () => {
    setEditing(!editing);
    if (!editing) {
      // Reset form if canceling edit
      setUserData({
        displayName: state.user?.displayName || '',
        email: state.user?.email || '',
        phone: '',
        address: '',
      });
    }
  };

  const handleSaveProfile = () => {
    // In a real app, this would update the user profile in the database
    console.log('Saving profile:', userData);
    setEditing(false);
  };

  if (!state.user) {
    return null; // Will redirect in useEffect
  }

  return (
    <Container className="profile-container">
      <Paper elevation={3} className="profile-paper">
        <Box className="profile-header">
          <Avatar 
            src={state.user.photoURL || undefined} 
            alt={state.user.displayName || 'User'} 
            className="profile-avatar"
          >
            {!state.user.photoURL && (state.user.displayName?.[0] || <PersonIcon />)}
          </Avatar>
          <Typography variant="h4" component="h1">
            {state.user.displayName || 'My Profile'}
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="profile tabs"
            centered
          >
            <Tab label="Personal Info" />
            <Tab label="Order History" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box className="profile-actions">
            {!editing ? (
              <Button 
                startIcon={<EditIcon />} 
                variant="outlined" 
                onClick={handleEditToggle}
              >
                Edit Profile
              </Button>
            ) : (
              <Box>
                <Button 
                  startIcon={<SaveIcon />} 
                  variant="contained" 
                  color="primary" 
                  onClick={handleSaveProfile}
                  sx={{ mr: 1 }}
                >
                  Save
                </Button>
                <Button 
                  startIcon={<CancelIcon />} 
                  variant="outlined" 
                  onClick={handleEditToggle}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3, mt: 2 }}>
            <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                label="Display Name"
                name="displayName"
                value={userData.displayName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing}
              />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={true} // Email should not be editable
              />
            </Box>
            <Box sx={{ gridColumn: { xs: 'span 12', sm: 'span 6' } }}>
              <TextField
                label="Phone Number"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                disabled={!editing}
              />
            </Box>
            <Box sx={{ gridColumn: 'span 12' }}>
              <TextField
                label="Address"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={3}
                margin="normal"
                disabled={!editing}
              />
            </Box>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {orderHistory.length > 0 ? (
            orderHistory.map((order) => (
              <Paper key={order.id} elevation={2} sx={{ mb: 3, p: 2 }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <Typography variant="h6">Order #{order.id}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {order.date}
                  </Typography>
                </Box>
                
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="body1">
                    Status: <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    Total: ${order.total.toFixed(2)}
                  </Typography>
                </Box>
                
                <Divider sx={{ my: 1 }} />
                
                <List>
                  {order.items.map((item) => (
                    <ListItem key={item.id}>
                      <ListItemAvatar>
                        <Avatar src={item.image} alt={item.name} variant="square" />
                      </ListItemAvatar>
                      <ListItemText 
                        primary={item.name} 
                        secondary={`Qty: ${item.quantity} × $${item.price.toFixed(2)}`} 
                      />
                    </ListItem>
                  ))}
                </List>
                
                <Box mt={2} display="flex" justifyContent="flex-end">
                  <Button variant="outlined" size="small">
                    View Details
                  </Button>
                </Box>
              </Paper>
            ))
          ) : (
            <Box textAlign="center" py={4}>
              <ShoppingBagIcon sx={{ fontSize: 60, opacity: 0.3, mb: 2 }} />
              <Typography variant="h6">No orders yet</Typography>
              <Typography variant="body2" color="textSecondary" mb={2}>
                When you place orders, they will appear here
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => navigate('/')}
              >
                Start Shopping
              </Button>
            </Box>
          )}
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Profile;