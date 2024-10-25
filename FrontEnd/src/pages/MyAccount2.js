import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

class MyAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false, // Added state to track login status
      loginError: '', // Added state to track login errors
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/user/login', {
        email: this.state.email,
        password: this.state.password,
      });

      // If login is successful, update state to reflect login status
      this.setState({
        isLoggedIn: true,
        loginError: '',
      });

     

      console.log(response.data); // Log the response from the backend
    } catch (error) {
      // If login fails, update state to reflect the error
      this.setState({
        isLoggedIn: false,
        loginError: 'Invalid email or password',
      });

      console.error('Error during login:', error);
    }
  };

  render() {
    return (
      <div>
        {/* ... (previous code) ... */}
        <div className="container" style={{ marginTop: '20px' }}>
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email address"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="text-right">
              <button type="button" className="btn btn-primary" onClick={this.handleLogin} disabled={!this.state.email || !this.state.password}>
                Login
              </button>
            </div>
            {this.state.loginError && (
              <div className="alert alert-danger" role="alert">
                {this.state.loginError}
              </div>
            )}
          </form>
        </div>
        {/* ... (rest of the code) ... */}
      </div>
    );
  }
}

export default MyAccount;
