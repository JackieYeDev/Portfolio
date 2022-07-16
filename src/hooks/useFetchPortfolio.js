import React, { useState, useContext, useEffect } from "react";
import API_KEY from "../assets/API.json";
import { UserContext } from "../context/user";

function useFetchPortfolio(stocks) {
  const [stockData, setStockData] = useState(null);
  const fetchData = [];

  useEffect(() => {
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=`;
    if (stocks === "" || stocks === [] || stocks === null) return null;
    stocks.forEach(stock => {
      fetch(stockUrl + stock)
        .then(res => res.json())
        .then(data => {
          fetchData.push({ [stock]: data });
        });
      setStockData(fetchData);
    });
  }, [stocks]);

  return stockData;
}

export default useFetchPortfolio;
