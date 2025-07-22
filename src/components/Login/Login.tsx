import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Login.css';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    // Email validation
    if (!email) {
      setEmailError('Enter your email');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Password validation
    if (!password) {
      setPasswordError('Enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const signIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Mock authentication - replace with Firebase auth
      const mockUser = {
        uid: '123',
        email: email,
        displayName: email.split('@')[0]
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      navigate('/');
    }
  };

  const register = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // For demo purposes, we'll use the same mock user
    if (email) {
      const mockUser = {
        uid: '123',
        email: email,
        displayName: email.split('@')[0]
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      navigate('/');
    } else {
      setEmailError('Enter your email to create an account');
    }
  };

  return (
    <div className="login">
      <Link to='/'>
        <img
          className="login__logo"
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
          alt="Amazon Logo"
        />
      </Link>

      <div className='login__container'>
        <h1>Sign in</h1>

        <form>
          <h5>Email or mobile phone number</h5>
          <input 
            type='text' 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            className={emailError ? 'error' : ''}
          />
          {emailError && <div style={{ color: '#c40000', fontSize: '12px', marginTop: '-5px', marginBottom: '10px' }}>{emailError}</div>}

          <h5>Password</h5>
          <input 
            type='password' 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <div style={{ color: '#c40000', fontSize: '12px', marginTop: '-5px', marginBottom: '10px' }}>{passwordError}</div>}

          <button 
            type='submit' 
            onClick={signIn} 
            className='login__signInButton'
          >
            Sign in
          </button>
        </form>

        <p>
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
        
        <div className="login__divider">
          <span className="login__dividerText">New to Amazon?</span>
        </div>

        <button 
          onClick={register} 
          className='login__registerButton'
        >
          Create your Amazon account
        </button>
      </div>
      
      <div className="login__footer">
        <div className="login__footerLinks">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
        <div className="login__footerCopyright">
          © 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
};

export default Login;