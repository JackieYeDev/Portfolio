import React, { useState, useContext, useEffect } from "react";
import API_KEY from "../assets/API.json";
import { UserContext } from "../context/user";

function useFetchStocks(props) {
  const [stockData, setStockData] = useState(null);
  const [stockName, setStockName] = useState(null);

  useEffect(() => {
    if (props === "") return null;
    const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=`;
    fetch(stockUrl + props)
      .then(res => res.json())
      .then(data => {
        setStockData(data);
        setStockName(data["Meta Data"]["2. Symbol"]);
      });
  }, [props]);

  return [stockData, setStockData, stockName, setStockName];
}

export default useFetchStocks;
