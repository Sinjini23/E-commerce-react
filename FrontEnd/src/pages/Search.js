// Search.js
import React, { useState } from 'react';
import axios from 'axios';

const Search = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchClick = () => {
    axios.get(`/api/search?query=${searchQuery}`)
      .then(response => {
        onSearch(response.data);
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
      });
  };

  return (
    <div className="input-group mb-2" style={{ float: 'right', width: '25%' }}>
      <input
        type="text"
        className="form-control input-sm"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
      />
      <span className="input-group-btn">
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </span>
    </div>
  );
};

export default Search;
