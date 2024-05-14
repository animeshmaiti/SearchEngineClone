import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();
const baseUrl =
  "https://google-search74.p.rapidapi.com/?limit=10&related_keywords=true&query=";

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const getResults = async (query) => {
    setIsLoading(true);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_SEARCH_API_KEY,
            'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
        }
    }
    const response = await fetch(`${baseUrl}${query}`, options);
    const data = await response.json();
    setResults(data);
    setIsLoading(false);
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, isLoading, setSearchTerm }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => {
  return useContext(ResultContext);
};
