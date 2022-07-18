import React, { useContext, useEffect, useState } from "react";
import { Card, CardGroup, Divider } from "semantic-ui-react";
import { UserContext } from "../context/user";
import Chart from "./Chart";
import API_KEY from "../assets/API.json";

function Portfolio() {
  const [user] = useContext(UserContext);
  const [stocksArray, setStocksArray] = useState([]);

  useEffect(() => {
    let stocks = [];
    try {
      Promise.all(
        user.stocks.map((stock) =>
          fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=` +
              stock
          )
            .then((res) => res.json())
            .then((data) => data)
        )
      )
        .then((res) => stocks.push(res))
        .then(() => {
          setStocksArray([...stocks[0]]);
        });
    } catch (e) {
      console.error(e);
    }
  }, [user.stocks]);

  return (
    <div>
      <Divider horizontal></Divider>
      <h3>Portfolio Page</h3>
      <Divider horizontal></Divider>

      {stocksArray !== [] ? (
        <CardGroup centered itemsPerRow={2}>
          {stocksArray.map((stock, index) => {
            return (
              <Card key={index}>
                <Card.Content>{stock["Meta Data"]["2. Symbol"]}</Card.Content>
                <Card.Content>
                  <Chart
                    stockName={stock["Meta Data"]["2. Symbol"]}
                    labels={Object.keys(stock["Time Series (5min)"])
                      .map((key) => key.split(" ")[1])
                      .reverse()}
                    data={Object.keys(stock["Time Series (5min)"])
                      .map(
                        (key) =>
                          stock["Time Series (5min)"][`${key}`]["4. close"]
                      )
                      .reverse()}
                  />
                </Card.Content>
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
