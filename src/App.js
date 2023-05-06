import './App.css';
import { useEffect,useState } from 'react';
import MovieCard from './MovieCard';



function App() {

  const MOVIE_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1"
  const MOVIE_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=81f382d33088c6d52099a62eab51d967&query="

  const [movies,setMovies] = useState([])
  const [term,setTerm] = useState([]);

  useEffect(() => {
    fetch(MOVIE_URL)
    .then(res => res.json())
    .then(data => setMovies(data.results))
  },[])

  console.log(movies)

  const searchMovie = (event) =>{
    event.preventDefault();

    fetch(MOVIE_SEARCH + term)
    .then(res => res.json())
    .then(data => setMovies(data.results))
  }

 

  return (
    <div className="App">
       <div className="search_nav">
        <div>
          <h1>Movie List</h1>
        </div>

        <div>
          <form onSubmit={searchMovie}>
            <input onChange={(e)=> setTerm(e.target.value)}/>
            <button>Search</button>
          </form>
        </div>
      </div>

      <div className='movies'>
        {movies.map((movie) =>(
            <MovieCard {...movie}/>
        ))}

      </div>
     
    </div>
  );
}

export default App;
