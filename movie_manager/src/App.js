import axios from 'axios';
import './App.css';
import { useEffect, useState, useRef } from 'react';
import Grid from './Grid';

let favourites = new Map();
function App() {
  const [search, setSearch] = useState('');
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const displayingFavourite = useRef(false);

  // useEffect(() => {
  //   console.log(JSON.parse(localStorage.getItem('favourites')))
  // }, [])

  const handleSearch = async (e) => {
    e.preventDefault();
    displayingFavourite.current = false;
    try {
      const response = await axios.get(`http://localhost:8080/movies?word=${search}`);
      console.log(response.data.results);
      setDisplayedMovies(response.data.results);
    } catch (e) {
      console.log(e);
    }
  }

  const handleAddFavourite = (e, id, title, poster_path, release_date) => {
    e.preventDefault();
    favourites.set(id, [title, poster_path, release_date]);
    console.log(favourites);
    // localStorage.setItem('favourites', JSON.stringify(favourites))
  }

  const handleDeleteFavourite = (e, id) => {
    e.preventDefault();
    favourites.delete(id);
    setDisplayedMovies([]);
    favourites.forEach((value, key) => {
      setDisplayedMovies((currentMovies) => [...currentMovies, {'id': key, 'title': value[0], 'poster_path': value[1], 'release_date': value[2]}]);
    });
    // localStorage.setItem('favourites', JSON.stringify(favourites))
    console.log(favourites);
    displayingFavourite.current = true;
  }

  const handleDisplayFavourites = (e) => {
    e.preventDefault();
    setDisplayedMovies([]);
    favourites.forEach((value, key) => {
      setDisplayedMovies((currentMovies) => [...currentMovies, {'id': key, 'title': value[0], 'poster_path': value[1], 'release_date': value[2]}]);
    });
    displayingFavourite.current = true;
  }

  return (
    <div className="app">
      <div className="topBar">
        <textarea className="search"
            value={search}
            placeholder={'Search...'}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {if (e.key === 'Enter') handleSearch(e)}}
        />
        <div className="tab" onClick={handleDisplayFavourites}>
          <p>Favourites</p>
        </div>
      </div>
      {displayingFavourite.current ? (<Grid movies={displayedMovies} handleClick={handleDeleteFavourite}></Grid>) :
      (<Grid movies={displayedMovies} handleClick={handleAddFavourite}></Grid>)}
    </div>
  );
}
export default App;
