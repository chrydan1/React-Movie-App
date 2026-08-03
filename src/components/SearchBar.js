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
            <h1 className="search-form__title">Christian's Movie Vault</h1>
            <p className="search-form__tagline">Discover your next favorite film</p>
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
