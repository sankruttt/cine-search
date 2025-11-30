import React, { useState } from 'react';
import searchIcon from '../assets/search icon.png';

function MovieSearch({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search for movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <img src={searchIcon} alt="Search" className="search-icon" />
      </button>
    </form>
  );
}

export default MovieSearch;
