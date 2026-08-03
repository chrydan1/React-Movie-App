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
      <form action="" className="form">
        <div className="branding">
          <div className="branding">
            <h1 className="form-title">Christian's Movie Vault</h1>
            <p className="tagline">Discover your next favorite film</p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search movie"
          onChange={handleSearch}
          value={searchQuery}
          className="search-input"
        />
      </form>
      <div className="film-strip"></div>

      {error && <p>{error}</p>}

      {searchQuery ? <Movie movies={movies} /> : <DefaultList />}
    </div>
  );
};

export default SearchBar;
