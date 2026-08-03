import React from "react";
import "../App.css";

const Movie = (props) => {
  const { movies } = props;

  return (
    <div className="movie-list">
      {movies.map((movie) => {
        return (
          <div className="movie-list__card" key={movie.id}>
            <div className="movie-list__image-container">
              <img className="movie-list__image"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>

            <div className="movie-list__details">
              <h1 className="movie-list__title">{movie.title}</h1>
              <p className="movie-list__overview">{movie.overview}</p>
              <p className="movie-list__release-date">
                Release Date: {movie.release_date}
              </p>
              <p className="movie-list__rating">Rating: {movie.vote_average}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Movie;
