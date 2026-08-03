import React, { useEffect, useState } from "react";
import "../App.css";

const DefaultList = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, []);

  async function getMovies() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}`,
        {
          headers: {
            "Content-type": "application/json",
          },
          method: "GET",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
      } else {
        console.error("Failed to fetch movies.");
      }
    } catch (error) {
      console.error("An error occurred while fetching movies:", error);
    }
  }

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
              <p className="movie-list__overview">Plot : {movie.overview}</p>
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

export default DefaultList;
