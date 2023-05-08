import './App.css';
import { useEffect,useState } from 'react';
import MovieCard from './MovieCard';



function App() {

  const [loading,setLoading] = useState(true)
  const spinner = document.getElementById('spinner')
  if(spinner){
    setTimeout(()=>{
      spinner.style.display="none";
      setLoading(false)
    },2000)
  }

  const MOVIE_URL_1 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=1"
  const MOVIE_URL_2 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=2"
  const MOVIE_URL_3 = "https://api.themoviedb.org/3/movie/upcoming?api_key=81f382d33088c6d52099a62eab51d967&language=en-US&page=3"

  const MOVIE_SEARCH ="https://api.themoviedb.org/3/search/movie?api_key=81f382d33088c6d52099a62eab51d967&query="
  const DISCOVER_URL ="https://api.themoviedb.org/3/discover/movie?api_key=81f382d33088c6d52099a62eab51d967&with_original_language="

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const deleteHistoryItem = (index) => {
    setSearchHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        newHistory.splice(index, 1);
        return newHistory;
    });
    };
    
  const deleteAllHistory = () => {
    setSearchHistory([]);
  };

  

  async function fetchSearchResults(e) {
    e.preventDefault()

    if(searchTerm && selectedLanguage !==""){
      const response = await fetch(DISCOVER_URL + selectedLanguage + "&with_text_query=" + searchTerm)
      const results = await response.json();
      setSearchResults(results);
    } else if (searchTerm){
      const response = await fetch(MOVIE_SEARCH + searchTerm)
      const results = await response.json();
      setSearchResults(results);
    } else{
      const response = await fetch(DISCOVER_URL + selectedLanguage);
      const results = await response.json();
      setSearchResults(results);
    }

  }


  const handleSearchSubmit = () => {
    // setSearchHistory([...searchHistory, searchTerm]);
    if(searchHistory.length>=3){
      searchHistory.shift()
    }
    if(searchTerm.trim() !== "" ){
    // setSearchHistory((prevHistory) => [searchTerm, ...prevHistory.slice(0, 2)]);
    setSearchHistory([...searchHistory,searchTerm]);
    } else if(searchTerm.trim() === "" && selectedLanguage === ""){
      alert("Please Enter Movie Name or Language")
    }
  };

  

  useEffect(() =>{
    const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(searchHistory);
  },[])

  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

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
    !loading && (
    <div className='App'>
      <h1 className='heading'>Movie Listing</h1>

      <div className='search_nav'>
        <div className='search_box'>
          <form onSubmit={fetchSearchResults}>
            <input onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search'/>
            <select value={selectedLanguage} onChange={(e)=>setSelectedLanguage(e.target.value)}>
              <option value="" default >Select Language</option>
              <option value="en">English</option>
              <option value="fr">French</option>
              <option value="de">German</option>
              <option value="es">Spanish; Castilian</option>
              <option value="ja">Japanese</option>
              <option value="pt">Portuguese</option>
              <option value="zh">Chinese</option>
              <option value="it">Italian</option>
              <option value="ru">Russian</option>
              <option value="ko">Korean</option>
              <option value="cs">Czech</option>
              <option value="nl">Dutch; Flemish</option>
              <option value="sv">Swedish</option>
              <option value="hi">Hindi</option>
              <option value="ar">Arabic</option>
              <option value="tr">Turkish</option>
              <option value="tl">Tagalog</option>
              <option value="pl">Polish</option>
              <option value="cn">Cantonese</option>
              <option value="da">Danish</option>
              <option value="ta">Tamil</option>
              <option value="el">Greek</option>
              <option value="xx">No Language</option>
              <option value="ml">Malayalam</option>
              <option value="id">Indonesian</option>
              <option value="fa">Persian</option>
              <option value="hu">Hungarian</option>
              <option value="fi">Finnish</option>
              <option value="bn">Bengali</option>
              <option value="no">Norwegian</option>
              <option value="te">Telugu</option>
              <option value="th">Thai</option>
              <option value="he">Hebrew</option>
              <option value="uk">Ukrainian</option>
              <option value="sk">Slovak</option>
              <option value="sh">Serbo-Croatian</option>
              <option value="ro">Romanian</option>
              <option value="is">Icelandic</option>
              <option value="lv">Latvian</option>
              <option value="ms">Malay</option>
              <option value="sr">Serbian</option>
              <option value="kn">Kannada</option>
              <option value="or">Oriya</option>
              <option value="vi">Vietnamese</option>
              <option value="et">Estonian</option>
              <option value="hr">Croatian</option>
              <option value="bg">Bulgarian</option>
              <option value="sl">Slovenian</option>
              <option value="ca">Catalan; Valencian</option>
              <option value="mr">Marathi</option>
              <option value="lt">Lithuanian</option>
              <option value="pa">Panjabi; Punjabi</option>
              <option value="ka">Georgian</option>
              <option value="mk">Macedonian</option>
              <option value="ur">Urdu</option>
              <option value="sq">Albanian</option>
              <option value="az">Azerbaijani</option>
              <option value="bs">Bosnian</option>
              <option value="hy">Armenian</option>
              <option value="af">Afrikaans</option>
              <option value="ku">Kurdish</option>
              <option value="eu">Basque</option>
              <option value="ne">Nepali</option>
              <option value="si">Sinhala; Sinhalese</option>
              <option value="gl">Galician</option>
              <option value="nb">Norwegian Bokmål</option>
              <option value="km">Central Khmer</option>
              <option value="my">Burmese</option>
              <option value="mn">Mongolian</option>
              <option value="gu">Gujarati</option>
              <option value="am">Amharic</option>
              <option value="kk">Kazakh</option>
              <option value="as">Assamese</option>
              <option value="jv">Javanese</option>
              <option value="uz">Uzbek</option>
              <option value="sw">Swahili</option>
              <option value="be">Belarusian</option>
              <option value="yi">Yiddish</option>
              <option value="bo">Tibetan</option>
              <option value="ga">Irish</option>
              <option value="ky">Kirghiz; Kyrgyz</option>
              <option value="zu">Zulu</option>
              <option value="cy">Welsh</option>
              <option value="se">Northern Sami</option>
              <option value="ps">Pushto; Pashto</option>
              <option value="wo">Wolof</option>
              <option value="lb">Luxembourgish; Letzeburgesch</option>
              <option value="tk">Turkmen</option>
              <option value="ht">Haitian; Haitian Creole</option>
              <option value="ab">Abkhazian</option>
              <option value="iu">Inuktitut</option>
              <option value="tg">Tajik</option>
              <option value="la">Latin</option>
              <option value="lo">Lao</option>
              <option value="mg">Malagasy</option>
              <option value="mt">Maltese</option>
              <option value="qu">Quechua</option>
              <option value="gd">Gaelic; Scottish Gaelic</option>
              <option value="fo">Faroese</option>
              <option value="dz">Dzongkha</option>
              <option value="bm">Bambara</option>
              <option value="mi">Maori</option>
              <option value="gn">Guarani</option>
              <option value="mo">Moldavian; Moldovan</option>
              <option value="eo">Esperanto</option>
              <option value="dv">Divehi; Dhivehi; Maldivian</option>
              <option value="yo">Yoruba</option>
              <option value="so">Somali</option>
              <option value="nn">Norwegian Nynorsk</option>
              <option value="kl">Kalaallisut; Greenlandic</option>
              <option value="rw">Kinyarwanda</option>
              <option value="ha">Hausa</option>
              <option value="cr">Cree</option>
              <option value="sa">Sanskrit</option>
              <option value="ak">Akan</option>
              <option value="xh">Xhosa</option>
              <option value="ks">Kashmiri</option>
              <option value="ln">Lingala</option>
              <option value="st">Sotho, Southern</option>
              <option value="ug">Uighur; Uyghur</option>
              <option value="tt">Tatar</option>
              <option value="ig">Igbo</option>
              <option value="ba">Bashkir</option>
              <option value="sm">Samoan</option>
              <option value="ay">Aymara</option>
              <option value="lg">Ganda</option>
              <option value="sn">Shona</option>
              <option value="rm">Romansh</option>
              <option value="ce">Chechen</option>
              <option value="ff">Fulah</option>
              <option value="mh">Marshallese</option>
              <option value="ti">Tigrinya</option>
              <option value="ty">Tahitian</option>
              <option value="ny">Chichewa; Chewa; Nyanja</option>
              <option value="sg">Sango</option>
              <option value="fy">Western Frisian</option>
              <option value="bi">Bislama</option>
              <option value="su">Sundanese</option>
              <option value="kw">Cornish</option>
              <option value="oc">Occitan (post 1500)</option>
              <option value="oj">Ojibwa</option>
              <option value="sc">Sardinian</option>
              <option value="to">Tonga (Tonga Islands)</option>
              <option value="ie">Interlingue; Occidental</option>
              <option value="nv">Navajo; Navaho</option>
              <option value="tn">Tswana</option>
              <option value="tw">Twi</option>
              <option value="co">Corsican</option>
              <option value="sd">Sindhi</option>
              <option value="om">Oromo</option>
              <option value="li">Limburgan; Limburger; Limburgish</option>
              <option value="fj">Fijian</option>
              <option value="br">Breton</option>
              <option value="ss">Swati</option>
              <option value="nd">Ndebele, North; North Ndebele</option>
              <option value="za">Zhuang; Chuang</option>
              <option value="rn">Rundi</option>
              <option value="av">Avaric</option>
              <option value="ts">Tsonga</option>
              <option value="aa">Afar</option>
              <option value="os">Ossetian; Ossetic</option>
              <option value="cv">Chuvash</option>
              <option value="an">Aragonese</option>
              <option value="ik">Inupiaq</option>
              <option value="pi">Pali</option>
              <option value="gv">Manx</option>
              <option value="ii">Sichuan Yi; Nuosu</option>
              <option value="kg">Kongo</option>
              <option value="ch">Chamorro</option>
              <option value="ki">Kikuyu; Gikuyu</option>
            </select>
            <button onClick={handleSearchSubmit}>Search</button> 
          </form>
        </div>
      </div>
      
      <div className='history'>
        <h2>Search History</h2>
        <button onClick={deleteAllHistory}>Delete All</button>
        {searchHistory.slice(0,3).reverse().map((historyItem, index) => (
          <div key={index}>
            {historyItem}
            <button onClick={() => deleteHistoryItem(index)}>Delete</button>
          </div>
        ))}
      </div>
      {pageToShow}

      {!searchResults.total_results && (
        <div className='nav_container'>
          {currentPage === 1 ? <button className='selected_button' onClick={() => setCurrentPage(1)}>Page 1</button> : <button onClick={() => setCurrentPage(1)}>Page 1</button>}
          {currentPage === 2 ? <button className='selected_button' onClick={() => setCurrentPage(2)}>Page 2</button> : <button onClick={() => setCurrentPage(2)}>Page 2</button>}
          {currentPage === 3 ? <button className='selected_button' onClick={() => setCurrentPage(3)}>Page 3</button> : <button onClick={() => setCurrentPage(3)}>Page 3</button>}
        </div>
      )}
      
    </div>
    )
  );
}

export default App;
