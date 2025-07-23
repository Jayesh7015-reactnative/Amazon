import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [shakeError, setShakeError] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const loginContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add entrance animation class
    if (loginContainerRef.current) {
      loginContainerRef.current.classList.add('animate-scale-in');
    }
  }, []);

  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError('Enter your email');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Enter your password');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    if (!isValid) {
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
    }
    
    return isValid;
  };

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock authentication - replace with Firebase auth
      const mockUser = {
        uid: '123',
        email: email,
        displayName: email.split('@')[0]
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      setIsLoading(false);
      
      // Add success animation before navigation
      if (loginContainerRef.current) {
        loginContainerRef.current.classList.add('animate-success');
        setTimeout(() => navigate('/'), 800);
      }
    }
  };

  const register = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!email) {
      setEmailError('Enter your email to create an account');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
      setShakeError(true);
      setTimeout(() => setShakeError(false), 500);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo purposes, we'll use the same mock user
    const mockUser = {
      uid: '123',
      email: email,
      displayName: email.split('@')[0]
    };
    
    dispatch({ type: 'SET_USER', payload: mockUser });
    setIsLoading(false);
    
    // Add success animation before navigation
    if (loginContainerRef.current) {
      loginContainerRef.current.classList.add('animate-success');
      setTimeout(() => navigate('/'), 800);
    }
  };

  return (
    <div className="login page-enter">
      {/* Animated Background */}
      <div className="login__background">
        <div className="login__backgroundShape login__backgroundShape--1"></div>
        <div className="login__backgroundShape login__backgroundShape--2"></div>
        <div className="login__backgroundShape login__backgroundShape--3"></div>
      </div>

      <Link to='/' className="animated-link">
        <div className="login__logo animate-float">
          <svg viewBox="0 0 140 40" className="login__logoSvg">
            <defs>
              <linearGradient id="loginLogoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ff6b35" />
                <stop offset="100%" stopColor="#f7931e" />
              </linearGradient>
            </defs>
            <text x="70" y="25" textAnchor="middle" fill="url(#loginLogoGradient)" className="login__logoText">
              ShopZone
            </text>
          </svg>
        </div>
      </Link>

      <div className={`login__container ${shakeError ? 'animate-shake' : ''}`} ref={loginContainerRef}>
        <h1 className="animate-fade-in" style={{ animationDelay: '0.2s' }}>Sign in</h1>

        <form ref={formRef} className="login__form">
          {/* Email Field */}
          <div className="login__inputGroup animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="login__inputContainer">
              <EmailIcon className="login__inputIcon" />
              <input 
                type='text' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                className={`login__input ${emailError ? 'error' : ''} ${emailFocused || email ? 'focused' : ''}`}
                id="email"
                autoComplete="email"
              />
              <label 
                htmlFor="email" 
                className={`login__label ${emailFocused || email ? 'active' : ''}`}
              >
                Email or mobile phone number
              </label>
            </div>
            {emailError && (
              <div className="login__errorMessage animate-slide-in">
                {emailError}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="login__inputGroup animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="login__inputContainer">
              <LockIcon className="login__inputIcon" />
              <input 
                type={showPassword ? 'text' : 'password'}
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                className={`login__input ${passwordError ? 'error' : ''} ${passwordFocused || password ? 'focused' : ''}`}
                id="password"
                autoComplete="current-password"
              />
              <label 
                htmlFor="password" 
                className={`login__label ${passwordFocused || password ? 'active' : ''}`}
              >
                Password
              </label>
              <button 
                type="button"
                className="login__passwordToggle"
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={(e) => e.preventDefault()}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </button>
            </div>
            {passwordError && (
              <div className="login__errorMessage animate-slide-in">
                {passwordError}
              </div>
            )}
          </div>

          <button 
            type='submit' 
            onClick={signIn} 
            disabled={isLoading}
            className={`login__signInButton btn-primary animate-fade-in ${isLoading ? 'loading' : ''}`}
            style={{ animationDelay: '0.8s' }}
          >
            {isLoading ? (
              <>
                <div className="login__spinner"></div>
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <LoginIcon />
                <span>Sign in</span>
              </>
            )}
          </button>
        </form>

        <p className="login__terms animate-fade-in" style={{ animationDelay: '1s' }}>
          By continuing, you agree to ShopZone's 
          <button type="button" className="login__termsLink">Terms of Service</button> and 
          <button type="button" className="login__termsLink">Privacy Policy</button>.
        </p>
        
        <div className="login__divider animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <span className="login__dividerText">New to ShopZone?</span>
        </div>

        <button 
          onClick={register} 
          disabled={isLoading}
          className={`login__registerButton btn-secondary animate-fade-in ${isLoading ? 'loading' : ''}`}
          style={{ animationDelay: '1.4s' }}
        >
          {isLoading ? (
            <>
              <div className="login__spinner"></div>
              <span>Creating account...</span>
            </>
          ) : (
            <>
              <PersonAddIcon />
              <span>Create your ShopZone account</span>
            </>
          )}
        </button>
      </div>
      
      <div className="login__footer animate-fade-in" style={{ animationDelay: '1.6s' }}>
        <div className="login__footerLinks">
          <button className="login__footerLink">Conditions of Use</button>
          <button className="login__footerLink">Privacy Notice</button>
          <button className="login__footerLink">Help</button>
        </div>
        <div className="login__footerCopyright">
          © {new Date().getFullYear()} ShopZone. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Login;