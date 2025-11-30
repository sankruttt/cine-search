import React, { useState, useEffect } from 'react';
import { getMovieDetails } from '../services/api';
import '../styles/MovieDetails.css';

function MovieDetails({ movie, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movie.imdbID);
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movie.imdbID]);

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  const posterUrl = details.Poster !== 'N/A' 
    ? details.Poster 
    : 'https://via.placeholder.com/300x450?text=No+Poster';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className="details-container">
          <img src={posterUrl} alt={details.Title} className="details-poster" />
          
          <div className="details-info">
            <h2>{details.Title}</h2>
            <div className="rating">⭐ {details.imdbRating}/10</div>
            
            <div className="details-meta">
              <p><strong>Year:</strong> {details.Year}</p>
              <p><strong>Runtime:</strong> {details.Runtime}</p>
              <p><strong>Genre:</strong> {details.Genre}</p>
              <p><strong>Director:</strong> {details.Director}</p>
              <p><strong>Cast:</strong> {details.Actors}</p>
            </div>
            
            <div className="plot-section">
              <h3>Plot</h3>
              <p>{details.Plot}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
