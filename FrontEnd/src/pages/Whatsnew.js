// src/Whatsnew.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';  
import './Whatsnew.css';


const ProductCard = ({ title, description, price, image }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
  };

  const handleBuyNowClick = () => {
    // Add logic to handle "Buy Now" action, e.g., redirect to checkout page
    alert(`Buying ${quantity} ${title}(s)`);
  };

  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-image" />
      <div className="product-details">
        <h2>{title}</h2>
        <p className="description">{description}</p>
        <p className="price">${price}</p>
        <div className="quantity-section">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
        <button className="buy-now-btn" onClick={handleBuyNowClick}>
          Buy Now
        </button>
      </div>
    </div>
  );
};

function Whatsnew() {
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

      <div className="Whatsnew">
        <h1>Latest Products</h1>
        <ProductCard
          title="HP LAPTOP"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          price="29.99"
          image="./images/Latest.png" // Replace with your actual image URL
        />
        {/* Add more ProductCard components as needed */}
      </div>
    </div>
  );
}
export default Whatsnew;
