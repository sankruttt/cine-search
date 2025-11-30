import React from 'react';
import '../styles/MovieCard.css';

function MovieCard({ movie, onClick }) {
  const posterUrl = movie.Poster !== 'N/A' 
    ? movie.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="movie-card" onClick={onClick}>
      <img src={posterUrl} alt={movie.Title} className="movie-poster" />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
        <button className="view-details-btn">View Details</button>
      </div>
    </div>
  );
}

export default MovieCard;
