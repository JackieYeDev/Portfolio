import React, { useState, useContext } from "react";
import { Button, Card, Input, Message, Segment } from "semantic-ui-react";
import Chart from "./Chart";
import { UserContext } from "../context/user";
import useFetchStocks from "../hooks/useFetchStocks";

/*

let chartKey = Object.keys(chartData["Time Series (5min)"]).map((key)=> key.split(' ')[1]).reverse()
Changes 2022-07-13 18:45:00 to 18:45:00

Object.keys(chartData['Time Series (5min)']).map((key) => console.log(chartData['Time Series (5min)'][`${key}`]['4. close'])).reverse()

*/

function Stock() {
  const [user, setUser] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [stockData, stockName] = useFetchStocks(query);
  const [fluid, setFluid] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [messageData, setMessageData] = useState({
    message: "",
    status: "",
    color: "",
  });
  function handleSearch() {
    if (searchString === "") return null;
    setQuery(searchString);
    setMessageData({ message: "", status: "", color: "" });
  }

  const dbURL = `https://dry-lowlands-31397.herokuapp.com/users/${user.id}`;
  function handleClick() {
    if (
      user.stocks.find(
        (stock) => stock.toLowerCase() === stockName.toLowerCase()
      )
    ) {
      setMessageData({
        message: `${stockName} is already in your Watchlist`,
        status: "Warning:",
        color: "red",
      });
      return null;
    }
    fetch(dbURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        stocks: [...user.stocks, stockName],
      }),
    })
      .then(() => {
        setUser({ ...user, stocks: [...user.stocks, stockName] });
        setMessageData({
          message: `${stockName} was successfully added to the Watchlist`,
          status: "Success:",
          color: "olive",
        });
      })
      .catch((err) => console.error(err));
  }
  return (
    <Segment>
      <Card centered color="olive" fluid={fluid}>
        <Card.Header textAlign={"center"}>
          <Input
            action
            placeholder="Enter Stock Name Here..."
            fluid
            value={searchString}
            onChange={(event) =>
              setSearchString(event.target.value.toUpperCase())
            }
          >
            <input />
            <Button basic color="green" onClick={handleSearch}>
              Search
            </Button>
          </Input>
        </Card.Header>
        {stockData ? (
          <>
            <Chart
              stockName={stockName}
              labels={Object.keys(stockData["Time Series (5min)"])
                .map((key) => key.split(" ")[1])
                .reverse()}
              data={Object.keys(stockData["Time Series (5min)"])
                .map(
                  (key) => stockData["Time Series (5min)"][`${key}`]["4. close"]
                )
                .reverse()}
            />
            <Card.Content textAlign={"center"}></Card.Content>
            <Card.Content extra>
              <div className="ui two buttons">
                <Button
                  basic
                  color="green"
                  name="searchBtn"
                  onClick={handleClick}
                >
                  Add Stock to Watchlist
                </Button>
                <Button basic color="grey" onClick={() => setFluid(!fluid)}>
                  {fluid ? "Collapse" : "Expand"}
                </Button>
              </div>
            </Card.Content>
            {messageData.message ? (
              <Message color={messageData.color}>
                <Message.Header>{messageData.status}</Message.Header>
                <p>{messageData.message}</p>
              </Message>
            ) : null}
          </>
        ) : null}
      </Card>
    </Segment>
  );
}

export default Stock;
