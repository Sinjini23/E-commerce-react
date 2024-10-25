// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import LoginComponent from '../pages/LoginComponent';

const Header = () => {
  return (
    <header className="header-top-strip py-3">
      <div className="container-xxl">
        <div className="row">
          <div className="col-md-5">
            <img src="../Images/logo.png" alt="logo" />
          </div>
          <div className="col-md-7 text-right">
            <div className="form-container">
              <LoginComponent />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
