import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Divider,
  Header,
  Input,
  Segment,
} from "semantic-ui-react";
import { UserContext } from "../context/user";
import Chart from "./Chart";
import API_KEY from "../assets/API.json";

function Watchlist() {
  const [user, setUser] = useContext(UserContext);
  const [stocksArray, setStocksArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const cardElement = useRef();

  // TODO: Add useReducer to fetch. If fetch is not fullfilled return empty array.

  useEffect(() => {
    let stocks = [];
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=${API_KEY}&symbol=`;
    try {
      Promise.all(
        user.stocks.map((stock) =>
          fetch(url + stock)
            .then((res) => res.json())
            .then((data) => data)
        )
      )
        .then((res) => stocks.push(res))
        .then(() => {
          console.log(stocks[0]);
          setStocksArray([...stocks[0]]);
        });
    } catch (e) {
      console.error(e);
    }
  }, [user.stocks]);

  const stocksToRender = stocksArray.filter((stock) =>
    stock["Meta Data"]["2. Symbol"]
      .toLowerCase()
      .includes(searchString.toLowerCase())
  );

  function removeStock(stockName) {
    const newArr = user.stocks.filter((stock) => stock !== stockName);
    // Remove from db.json
    fetch(`https://dry-lowlands-31397.herokuapp.com/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        username: user.username,
        password: user.password,
        stocks: [...newArr],
      }),
    });
    // Remove from current user list
    setUser({ ...user, stocks: [...newArr] });
  }
  return (
    <Segment>
      <Header as="h3" textAlign="center" content={"Watchlist Page"} />
      <Input
        icon="search"
        placeholder="Filter stocks to display... "
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <Divider horizontal></Divider>

      {stocksToRender !== [] ? (
        <CardGroup centered itemsPerRow={2}>
          {stocksToRender.map((stock, index) => {
            return (
              <Card key={index} fluid={true}>
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
                <Card.Content extra>
                  <Button
                    basic
                    color="red"
                    onClick={() => removeStock(stock["Meta Data"]["2. Symbol"])}
                  >
                    Remove Stock from Watchlist
                  </Button>
                </Card.Content>
              </Card>
            );
          })}
        </CardGroup>
      ) : (
        <p>Your watchlist is currently empty!</p>
      )}
    </Segment>
  );
}

export default Watchlist;
