import { useState, useEffect } from 'react';
import "./App.css";
import searchIcon from "./search.svg";
import MovieCard from './MovieCard';
//5257338a

const Movieapp_URL = "http://omdbapi.com?apikey=5257338a";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setsearchTerms] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${Movieapp_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search)
  }

  useEffect(() => {
    searchMovies("Batman");
  }, []);
  return (
    <div className='app'>
      <h1>Netflixify</h1>
      <div className='search'>
        <input type="text" placeholder='Search for movies..'
          value={searchTerm} onChange={(e) => {
            setsearchTerms(e.target.value)
           }}
        />
        <img src={searchIcon} alt="search" onClick={() => {
           searchMovies(searchTerm);
         }} />
      </div>



      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}

    </div>
  );
}

export default App;
