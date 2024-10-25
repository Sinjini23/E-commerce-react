// LogoutComponent.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('userToken');

    // Redirect to the login page or any other desired route
    navigate('/login');
  };

  return (
    <div>
      <button type="button" className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default LogoutComponent;
