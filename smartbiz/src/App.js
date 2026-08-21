import React, {useEffect, useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';

import ExploreInfo from './Explore.js';
import { Home } from './Home.js';
import Contact from './Contact.js';
import Features from './Features.js';
import Price from './Price.js';
import Aichat from './Aichat.js';
import Summary from './Summary.js';
import Form from './Form.js';
import Profile from './Profile.js';
import Inventory from './Inventory.js';
import ShopPage from "./Shoppage.js";
import Login from './Login.js';
import CreateShop from './ShopCreate.js';
import ToggleF from './Toggleform.js'
import AddProduct from "./AddProducts";
import DeleteProducts from './DeleteProducts.js';
import EditProducts from './EditProducts.js';
import TermsAndConditions from './Terms.js';
import PrivacyPolicy from './Policy.js';
import Feedback from './Feedback.js';


import user from './user.gif';
import facebookIcon from './facebook.png';
import linkedinIcon from './linkedin.png';
import twitterIcon from './twitter.png';
import instaIcon from './insta.png';

function AppContent() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  
  

  useEffect(() => {
    const toggleMenu = () => {
      const nav = document.getElementById("nav-links");
      const buttons = document.getElementById("nav-buttons");
      nav.classList.toggle("show");
      buttons.classList.toggle("show");
    };
     const checkLogin = () => {
    const isLogged = document.cookie.includes("email=");
    setIsLoggedIn(isLogged);
  };
    window.logout = () => {
      const isLoggedIn = document.cookie.includes("email=");
      if (!isLoggedIn) {
        alert("Already logged out!");
        return;
      }
   
    
      document.cookie = "fullname=; Max-Age=0; path=/";
      document.cookie = "email=; Max-Age=0; path=/";
      document.cookie = "password=; Max-Age=0; path=/";
      document.cookie = "shopCreated=; Max-Age=0; path=/";
      navigate("/");
    };

    window.toggleMenu = toggleMenu;
    checkLogin();

    const handleScroll = () => {
      setVisible(window.scrollY > 150);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navigate]);

  return (
    <div>
      <header className="navbar"  style={{
    backgroundColor: 'rgba(11, 10, 10, 0.8)', // semi-transparent black
    backdropFilter: 'blur(4px)', // optional: glassy effect
  }}>
        <div className="logo" onClick={() => navigate('/summary')} style={{ cursor: 'pointer',color:"white" }}>
          Smartbiz
        </div>
        <div className="hamburger" onClick={() => window.toggleMenu?.()}>☰</div>

        <nav id="nav-links">
          <Link to="/" className='nav-links' title="Home" onClick={() => setTimeout(() => window.scrollToHomeTop?.(), 100)}>Home</Link>
          <Link to="/" className='nav-links' title="Appointment" onClick={() => setTimeout(() => window.scrollToAboutUs?.(), 100)} >Appointment</Link>
          <Link to="/inventory" className='nav-links' title='Inventory' >Shops</Link>
          <Link to="/features" className='nav-links' title="Features" >Features</Link>
          <Link to="/price" className='nav-links' title="Pricing" >Pricing</Link>
          <Link to="/contact" className='nav-links' title="Contact Us" >Contact Us</Link>

          <div className="dropdown">
            <Link to="/explore" className="dropbtn" title='Explore'><b>Explore ▾</b></Link>
            <div className="dropdown-content">
              <Link to="/aichat" title='AI chat'>AI Chat</Link>
              <Link to="/feedback" className='nav-links' title="Feedback">Feedback</Link>
              <Link to="/explore#about" title='About us'>About</Link>
              <Link to="/explore#blog" title='Blog'>Blog</Link>
              <Link to="/explore#support" title='Support'>Support</Link>
              <Link to="/explore#careers"title='Careers'>Careers</Link>
              <Link to="/explore#media" title='Media'>Media</Link>
            </div>
          </div>
        </nav>

        <div className="buttons" id="nav-buttons">
  {isLoggedIn && (
    <button onClick={() => window.logout?.()} className="btn-outline" title='Logout'>Logout</button>
  )}
  <button onClick={() => navigate("/auth")} className="btn-outline" title='Get started'>
    Get Started
  </button>
  <button className="btn-filled" onClick={() => navigate("/features")} title='Learn More'>Learn More</button>
</div>

        <Link to="/profile" title='Profile'><img src={user} alt="user" width="50px" style={{backgroundColor:'white',borderRadius:"100px"}} /></Link>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/price" element={<Price />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/explore" element={<ExploreInfo />} />
        <Route path="/aichat" element={<Aichat />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/form" element={<Form />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:id" element={<ShopPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/createshop" element={<CreateShop />} />
        <Route path="/auth" element={<ToggleF/>}/>
        <Route path="/addproducts/:shopId" element={<AddProduct />} />
        <Route path="/deleteproducts/:id" element={<DeleteProducts />} />
        <Route path="/editproducts/:id" element={<EditProducts />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/feedback" element={<Feedback />} />

      </Routes>

      {/* Scroll to Top Button */}
      {visible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '12px 16px',
            fontSize: '20px',
           backgroundColor: 'purple',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            zIndex: 999
          }}
          title="Scroll to Top"
        >
          ⬆
        </button>
      )}

      {/* Footer */}
      <div className="footer">
        <div className="footer-top">
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><Link to="/explore#about" className="li">About Us</Link></li>
              <li><Link to="/features" className="li">Features</Link></li>
              <li><Link to="/contact" className="li">Contact Us</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
<li>
  <Link to="/" className="li"  onClick={() => setTimeout(() => window.scrollToAboutUs?.(), 100)}>
    Appointment Management
  </Link>
</li>
              <li><Link to="/inventory" className="li">Shops Management</Link></li>
             
              <li> <Link to="/feedback" className='li' >Feedback</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/price" className="li">Pricing</Link></li>
              <li><Link to="/explore#blog" className="li">Blog</Link></li>
            </ul>
          </div>
          <div className="footer-column subscribe">
            <h4>Subscribers</h4>
            <p>Stay up-to-date with the latest news and updates from Smartbiz Hub.</p>
            <p id="subscribe-text"></p>
          </div>
        </div>

        <hr />

        <div className="footer-bottom">
          <p>&copy; 2025 Smartbiz Hub. All rights reserved.</p>
          <div className="footer-links">
           <Link to="/terms" className="term">Terms and Conditions</Link>
  <Link to="/privacy" className="term">Privacy Policy</Link>
          </div>
          <div className="footer-socials">
           <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src={facebookIcon} alt="Facebook" /></a>
<a href="https://www.linkedin.com/in/jignesh-kanojiya-217262366/" target="_blank" rel="noopener noreferrer"><img src={linkedinIcon} alt="LinkedIn" /></a>
<a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src={twitterIcon} alt="Twitter" /></a>
<a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src={instaIcon} alt="Instagram" /></a>

          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
