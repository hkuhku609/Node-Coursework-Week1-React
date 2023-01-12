import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [oneQuote, setOneQuote] = useState(null);
  const [searchedQuote, setSearchedQuote] = useState(null);
  const [isOneQuoteLoading, setIsOneQuoteLoading] = useState(true);
  const [isQuotesLoading, setIsQuotesLoading] = useState(true);
  const [searchWord, setSearchWord] = useState('');
  const fetchOneQuote = async () => {
    try {
      const res = await fetch(
        'https://susan-quote-server.glitch.me/quotes/random'
      );
      const data = await res.json();
      setOneQuote(data);
      setIsOneQuoteLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchOneQuote();
    return () => fetchOneQuote();
  }, []);

  useEffect(() => {
    const searchQuote = async () => {
      if (searchWord) {
        try {
          const res = await fetch(
            `https://susan-quote-server.glitch.me/quotes/search?term=${searchWord}`
          );
          if (!res.ok) throw Error('Did not receive expected data');
          const data = await res.json();
          setSearchedQuote(data);
          setIsQuotesLoading(false);
        } catch (err) {
          console.error(err);
        }
      }
    };
    searchQuote();
    return () => searchQuote();
  }, [searchWord]);
  return (
    <div className='App'>
      {isOneQuoteLoading && 'Loading...'}
      {!isOneQuoteLoading && (
        <div className='quote-container'>
          <div>"{oneQuote.quote}"</div>
          <div>by {oneQuote.author}</div>
          <button onClick={fetchOneQuote}>click me to get another quote</button>
        </div>
      )}
      keyword:
      <input type='text' onChange={(e) => setSearchWord(e.target.value.toLowerCase())} />
      {isOneQuoteLoading && 'Loading...'}
      {!isQuotesLoading && (
        <div className='search-container'>
          {searchedQuote.map(({ quote, author }, idx) => (
            <div key={idx} className='search-quotes'>
              <div className='search-quote'>{quote}</div>
              <div className='search-author'>{author}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
