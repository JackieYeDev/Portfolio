import React, { useContext, useEffect, useState } from "react";
import { Card, CardGroup, Divider } from "semantic-ui-react";
import { UserContext } from "../context/user";
import Chart from "./Chart";
import stock from "./Stock";

function Portfolio() {
  const [user] = useContext(UserContext);
  const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=ELE5OMMAI6VJWEWB&symbol=`;
  const [stocks, setStocks] = useState(null);

  function getStockData(stockName) {
    fetch(stockUrl + stockName)
      .then((res) => res.json())
      .then((data) => data["Meta Data"]["2. Symbol"].toString());
  }

  return (
    <div>
      <Divider horizontal></Divider>
      <h3>Portfolio Page</h3>
      <Divider horizontal></Divider>
      {user.stocks.length > 0 ? (
        <CardGroup centered itemsPerRow={2}>
          {user.stocks.map((stock, index) => {
            return (
              <Card key={index}>
                <Card.Content>{getStockData(stock)}</Card.Content>
                <Card.Content>Test</Card.Content>
              </Card>
            );
          })}
        </CardGroup>
      ) : (
        <p>Your portfolio is currently empty!</p>
      )}
    </div>
  );
}

export default Portfolio;
