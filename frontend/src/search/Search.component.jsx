import React, { useState, useEffect } from "react";
import axios from "axios";
import "./search.styles.css";

const api = "http://localHost:3001";

const Search = () => {
  const [searchResult, setSearchResult] = useState("");
  const [results, setResults] = useState([]);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function getAllAdds() {
      try {
        const res = await axios.get(`${api}`);
        setAds(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllAdds();
  }, [searchResult]);

  let debounceTimer;

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchResult(searchTerm);

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const response = await axios.get(`${api}/${searchTerm}`);
      console.log(response.data);
      setResults(response.data);
    }, 500);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.get(`${api}/${searchResult}`);
      console.log(res.data);
      setResults(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchResult}
          onChange={handleSearch}
        />
        <button className="search-button" onClick={handleSubmit}>
          Search
        </button>
      </div>
      <div className="ad-grid">
        {!searchResult
          ? ads.map((ad) => (
              <div key={ad._id}>
                <h2>{ad.company}</h2>
                <img src={ad.imageUrl} alt={ad.headline} />
                <h3>{ad.headline}</h3>
                <p>{ad.primaryText}</p>
                <p>{ad.description}</p>
              </div>
            ))
          : results.map((result) => (
              <div key={result._id}>
                <h2>{result._id}</h2>
                <div>
                  {result.ads?.map((ad) => (
                    <div key={ad._id}>
                      <img src={ad.imageUrl} alt={ad.headline} />
                      <h3>{ad.headline}</h3>
                      <p>{ad.primaryText}</p>
                      <p>{ad.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Search;
