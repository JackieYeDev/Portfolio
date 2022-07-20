import React, { useState, useEffect } from "react";
import API_KEY from "../assets/API.json";

function useFetchStocks(query) {
  const [stockData, setStockData] = useState(null);
  const [stockName, setStockName] = useState(null);

  useEffect(() => {
    if (query === "") return null;
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=`;
    fetch(stockUrl + query)
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        setStockName(data["Meta Data"]["2. Symbol"]);
      });
  }, [query]);

  return [stockData, stockName];
}

export default useFetchStocks;
