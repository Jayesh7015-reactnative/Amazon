import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PaymentIcon from '@mui/icons-material/Payment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreditCardIcon from '@mui/icons-material/CreditCard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="footer">
      <button className="footer__backToTop" onClick={scrollToTop}>
        Back to top
      </button>
      
      <div className="footer__main">
        <div className="footer__container">
          <div className="footer__grid">
            <div className="footer__section">
              <h3 className="footer__sectionTitle">Get to Know Us</h3>
              <ul className="footer__list">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press Releases</Link></li>
                <li><Link to="/community">Community</Link></li>
                <li><Link to="/sustainability">Sustainability</Link></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h3 className="footer__sectionTitle">Make Money with Us</h3>
              <ul className="footer__list">
                <li><Link to="/sell">Sell products</Link></li>
                <li><Link to="/affiliate">Become an Affiliate</Link></li>
                <li><Link to="/advertise">Advertise Your Products</Link></li>
                <li><Link to="/publish">Self-Publish</Link></li>
                <li><Link to="/vendor">Become a Vendor</Link></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h3 className="footer__sectionTitle">Customer Service</h3>
              <ul className="footer__list">
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/returns">Returns & Replacements</Link></li>
                <li><Link to="/shipping">Shipping Rates & Policies</Link></li>
                <li><Link to="/orders">Track Orders</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            
            <div className="footer__section">
              <h3 className="footer__sectionTitle">Download Our App</h3>
              <p className="footer__appText">Shop anytime, anywhere with our mobile app</p>
              <div className="footer__appButtons">
                <button className="footer__appButton" onClick={() => window.open('https://apps.apple.com', '_blank')}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/203px-Download_on_the_App_Store_Badge.svg.png" alt="Download on App Store" />
                </button>
                <button className="footer__appButton" onClick={() => window.open('https://play.google.com', '_blank')}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/270px-Google_Play_Store_badge_EN.svg.png" alt="Get it on Google Play" />
                </button>
              </div>
              
              <h3 className="footer__sectionTitle footer__socialTitle">Connect With Us</h3>
              <div className="footer__social">
                <button className="footer__socialButton" aria-label="Facebook" onClick={() => window.open('https://facebook.com', '_blank')}><FacebookIcon /></button>
                <button className="footer__socialButton" aria-label="Twitter" onClick={() => window.open('https://twitter.com', '_blank')}><TwitterIcon /></button>
                <button className="footer__socialButton" aria-label="Instagram" onClick={() => window.open('https://instagram.com', '_blank')}><InstagramIcon /></button>
                <button className="footer__socialButton" aria-label="YouTube" onClick={() => window.open('https://youtube.com', '_blank')}><YouTubeIcon /></button>
                <button className="footer__socialButton" aria-label="LinkedIn" onClick={() => window.open('https://linkedin.com', '_blank')}><LinkedInIcon /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer__payment">
        <div className="footer__container">
          <h4 className="footer__paymentTitle">Secure Payments</h4>
          <div className="footer__paymentMethods">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Visa.svg/200px-Visa.svg.png" alt="Visa" className="footer__paymentIcon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/200px-Mastercard_2019_logo.svg.png" alt="Mastercard" className="footer__paymentIcon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/200px-PayPal.svg.png" alt="PayPal" className="footer__paymentIcon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/80px-Apple_logo_black.svg.png" alt="Apple Pay" className="footer__paymentIcon" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/200px-Google_Pay_Logo.svg.png" alt="Google Pay" className="footer__paymentIcon" />
          </div>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__container">
          <div className="footer__bottomContent">
            <div className="footer__copyright">
              © {currentYear} ShopZone. All rights reserved.
            </div>
            <div className="footer__bottomLinks">
              <Link to="/privacy">Privacy Notice</Link>
              <Link to="/terms">Terms of Use</Link>
              <Link to="/cookies">Cookie Policy</Link>
              <Link to="/accessibility">Accessibility</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;