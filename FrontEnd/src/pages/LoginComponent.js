// LoginComponent.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', {
        email,
        password,
      });

      console.log('Login Response:', response.data);

      if (!response.data.token) {
        throw new Error('Authentication failed');
      }

      // Save the token to localStorage
      localStorage.setItem('userToken', response.data.token);

      // Set login status to true
      setLoggedIn(true);

      // Redirect to the home page or another page after successful login
      navigate('/');
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.message);
    }
  };

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('userToken');

    // Set login status to false
    setLoggedIn(false);

    // Redirect to the login page or another page after logout
    navigate('/home');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Logged in successfully! Welcome!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="form-inline">
          <div className="form-group mb-2">
            <label htmlFor="email" className="sr-only">
              Email:
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Enter Mail ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mx-sm-3 mb-2">
            <label htmlFor="password" className="sr-only">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={handleLogin}
          >
            Login
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      )}
    </div>
  );
};

export default LoginComponent;
