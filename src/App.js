import './App.css';
import { useEffect,useState } from 'react';
import MovieCard from './MovieCard';



function App() {

  const MOVIE_URL_1 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1"
  const MOVIE_URL_2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=2"
  const MOVIE_URL_3 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=3"

  const MOVIE_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=81f382d33088c6d52099a62eab51d967&query="

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response1 = await fetch(MOVIE_URL_1);
      const data1 = await response1.json();
      setData1(data1.results);
      console.log(data1.results)

      const response2 = await fetch(MOVIE_URL_2);
      const data2 = await response2.json();
      setData2(data2.results);

      const response3 = await fetch(MOVIE_URL_3);
      const data3 = await response3.json();
      setData3(data3.results);
    }
    fetchData();
  }, []);


    async function fetchSearchResults(e) {
      e.preventDefault()
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      console.log("inhere")

      const response = await fetch(MOVIE_SEARCH + searchTerm);
      const results = await response.json();
      setSearchResults(results);
      console.log(results)
    }


  let pageToShow;

  if (searchResults.total_results > 0) {
    pageToShow = (
      <div>
        <h1 className='heading'>Search Results</h1>
        <div className='movies'>
          {searchResults.results.map((movie) =>(
            <MovieCard {...movie}/>
        ))}
        </div>
      </div>
    );
  } else if (currentPage === 1) {
    pageToShow = (
      <div>
        <h1 className='heading'>Page 1</h1>
        <div className='movies'>
          {data1.map((movie) =>(
            <MovieCard {...movie}/>
        ))}
        </div>
      </div>
    );
  } else if (currentPage === 2) {
    pageToShow = (
      <div>
        <h1 className='heading'>Page 2</h1>
        <div className='movies'>
          {data2.map((movie) =>(
            <MovieCard {...movie}/>
        ))}
        </div>
      </div>
    );
  } else if (currentPage === 3) {
    pageToShow = (
      <div>
        <h1 className='heading'>Page 3</h1>
        <div className='movies'>
          {data3.map((movie) =>(
            <MovieCard {...movie}/>
        ))}
        </div>
      </div>
    );
  }
 

  return (
    <div className='App'>
      <h1 className='heading'>Movie Listing</h1>
      <div className='search_nav'>
        <div className='search_box'>
          <form onSubmit={fetchSearchResults}>
            <input onChange={(e)=>setSearchTerm(e.target.value)}/>
            <button>Search</button> 
          </form>
        </div>
      </div>
      {pageToShow}
      
      <div className='nav_container'>
        <button onClick={() => setCurrentPage(1)}>Page 1</button>
        <button onClick={() => setCurrentPage(2)}>Page 2</button>
        <button onClick={() => setCurrentPage(3)}>Page 3</button>
      </div>
       
     
    </div>
  );
}

export default App;
