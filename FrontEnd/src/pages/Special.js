// Special.js
import React from 'react';
import './Special.css'; // Create a Special.css file for styling
import { NavLink } from 'react-router-dom';  

const Special = () => {
  return (
    <div>
    <nav style={{ marginTop: '10px', backgroundColor: '#e0e0e0' }}>
      <ul className="nav nav-tabs">
        {/* ... your other navigation links ... */}
        <li className="nav-item">
          <NavLink to="/home" className="btn btn-home">
            Home
          </NavLink>
        </li>
            <li className="nav-item">
              <NavLink to="/whatsnew" className="btn btn-whats-new">
                Whats New
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/special" className="btn btn-specials">
                Specials
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/product" className="btn btn-product">
                Product
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/my-account" className="btn btn-my-account">
                My Account
              </NavLink>
            </li>
            </ul>
      </nav>
      <div className="special-container">
        <img
          src="../images/Special.png" // Replace with your actual image URL
          alt="Special Product"
          className="product-image"
        />
        <div className="product-details">
          <h1>Special Product</h1>
          <p className="feature">High-Quality Materials</p>
          <p className="feature">Unique Design</p>
          <p className="feature">Free Shipping Worldwide</p>
          <p className="price">$49.99</p>
          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Special;
