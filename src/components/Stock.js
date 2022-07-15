import React, { useState, useContext } from "react";
import { Button, Card, Form, Image, Input } from "semantic-ui-react";
import Chart from "./Chart";
import { UserContext } from "../context/user";

{
  /*

let chartKey = Object.keys(chartData["Time Series (5min)"]).map((key)=> key.split(' ')[1]).reverse()
Changes 2022-07-13 18:45:00 to 18:45:00

Object.keys(chartData['Time Series (5min)']).map((key) => console.log(chartData['Time Series (5min)'][`${key}`]['4. close'])).reverse()


*/
}

function Stock() {
  const [user, setUser] = useContext(UserContext);
  const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=ELE5OMMAI6VJWEWB&symbol=`;
  const [query, setQuery] = useState("");
  const [stockData, setStockData] = useState(null);
  const [stockName, setStockName] = useState(null);
  function handleSearch() {
    fetch(stockUrl + query)
      .then((res) => res.json())
      .then((data) => {
        setStockData(data);
        setStockName(data["Meta Data"]["2. Symbol"]);
      });
  }

  const dbURL = `https://dry-lowlands-31397.herokuapp.com/users/${user.id}`;
  function handleClick() {
    fetch(dbURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        stocks: [...user.stocks, stockName],
      }),
    })
      .then(() => setUser({ ...user, stocks: [...user.stocks, stockName] }))
      .catch((err) => console.error(err));
  }
  return (
    <Card color="red">
      <Card.Header textAlign={"center"}>
        <Input
          icon="search"
          placeholder="Enter Stock Name Here..."
          fluid
          value={query}
          onChange={(event) => setQuery(event.target.value.toUpperCase())}
        />
        <Button basic color="green" onClick={handleSearch}>
          Search
        </Button>
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
          <Card.Content textAlign={"center"}>
            <Form></Form>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green" onClick={handleClick}>
                Add Stock to Porfolio
              </Button>
              <Button basic color="red">
                Remove Stock from Portfolio
              </Button>
            </div>
          </Card.Content>
        </>
      ) : null}
    </Card>
  );
}

export default Stock;
