import React, { useState } from 'react';
import MovieSearch from './MovieSearch';
import MovieCard from './MovieCard';
import MovieDetails from './MovieDetails';
import Pagination from './Pagination';
import { searchMovies } from '../services/api';
import '../styles/App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query, page = 1) => {
    if (!query.trim()) return;      
    
    setLoading(true);
    setError('');
    setSearchQuery(query);
    
    try {
      const data = await searchMovies(query, page);
      if (data.Response === 'True') {
        setMovies(data.Search);
        setTotalResults(parseInt(data.totalResults));
        setCurrentPage(page);
      } else {
        setMovies([]);
        setError(data.Error);
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    handleSearch(searchQuery, page);
    window.scrollTo(0, 0);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  const hasResults = movies.length > 0 || loading || error;

  return (
    <div className="App">
      <header className={`App-header ${hasResults ? 'has-results' : ''}`}>
        <div className="logo-title">
          <span className="app-logo">🎞️</span>
          <h1>CineSearch</h1>
        </div>
        <MovieSearch onSearch={handleSearch} />
      </header>

      {loading && <div className="loading">🎬 Searching for movies...</div>}
      {error && <div className="error">{error}</div>}

      {movies.length > 0 && (
        <div className="movies-container">
          {movies.map((movie) => (
            <MovieCard 
              key={movie.imdbID} 
              movie={movie} 
              onClick={() => handleMovieClick(movie)}
            />
          ))}
        </div>
      )}

      {totalResults > 10 && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
      )}

      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie} 
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
}

export default App;
