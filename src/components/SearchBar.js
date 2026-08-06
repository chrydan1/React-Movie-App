import React, { useState } from "react";
import Movie from "./Movie";
import DefaultList from "./DefaultList";
import "../App.css";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  async function searchMovie(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`,
      );

      if (response.ok) {
        const data = await response.json();
        setMovies(data.results);
        setError("");
      } else {
        setError("An error occurred while fetching movies.");
        setMovies([]);
      }
    } catch (error) {
      setError("An error occurred while fetching movies.");
      setMovies([]);
    }
  }

  function handleSearch(e) {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim() !== "") {
      searchMovie(query);
    } else {
      setMovies([]);
      setError("");
    }
  }

  return (
    <div>
      <form action="" className="search-form">
        <div className="search-form__branding">
          <div className="search-form__title-wrap">
            <h1 className="search-form__title">
              <span className="search-form__title--word-cine">Cine</span>
              <span className="search-form__title--word-scope">Scope</span>
            </h1>
            <h1
              className="search-form__title search-form__title--mask"
              aria-hidden="true"
            >
              <span>Cine</span>
              <span>Scope</span>
            </h1>
          </div>
          <p className="search-form__tagline">
            <span className="search-form__tagline--discover">Discover. </span>
            <span className="search-form__tagline--search">Search. </span>
            <span className="search-form__tagline--watch">Watch. </span>
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Movie"
          onChange={handleSearch}
          value={searchQuery}
          className="search-form__input"
        />
      </form>
      <div className="film-strip"></div>

      {error && <p>{error}</p>}

      {searchQuery ? <Movie movies={movies} /> : <DefaultList />}
    </div>
  );
};

export default SearchBar;
