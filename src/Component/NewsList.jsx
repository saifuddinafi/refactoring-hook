import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewsList.css';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchNews();
  }, []); 

  const fetchNews = async () => {
    const apiKey = 'a17b209b9ccc40579822107716faa56f'; 
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=id&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleSearch = async () => {
    const apiKey = 'a17b209b9ccc40579822107716faa56f'; 
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=id&q=${searchQuery}&apiKey=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      setNews(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <h2>Portal Berita Indonesia</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Cari berita..."
          value={searchQuery}
          onChange={handleChange}
        />
        <button onClick={handleSearch}>Cari</button>
      </div>
      <ul className="news-list">
        {news.map((article, index) => (
          <li key={index}>
            <img src={article.urlToImage} alt={article.title} />
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Baca Selengkapnya
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsList;
