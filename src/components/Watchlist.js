import React, { useContext, useEffect, useState } from "react";
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
import API_KEY from "../assets/API.json";
import StockCard from "./StockCard";

function Watchlist() {
  const [user, setUser] = useContext(UserContext);
  const [stocksArray, setStocksArray] = useState([]);
  const [searchString, setSearchString] = useState("");

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
          {stocksToRender.map((stock, index) => (
            <StockCard stock={stock} key={index} removeStock={removeStock} />
          ))}
        </CardGroup>
      ) : (
        <p>Your watchlist is currently empty!</p>
      )}
    </Segment>
  );
}

export default Watchlist;
