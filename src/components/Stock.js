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

function Stock(props) {
  const [user, setUser] = useContext(UserContext);
  const stockUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=5min&apikey=ELE5OMMAI6VJWEWB&symbol=`;
  const [stockName, setStockName] = useState("");
  const [stockData, setStockData] = useState(null);
  function handleSearch() {
    fetch(stockUrl + stockName)
      .then((res) => res.json())
      .then((data) => setStockData(data));
  }

  const dbURL = `https://dry-lowlands-31397.herokuapp.com/users/${user.id}`;
  function handleClick() {
    fetch(dbURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PATCH",
      body: JSON.stringify({
        stocks: [stockName],
      }),
    });
  }
  return (
    <Card color="red">
      <Card.Header textAlign={"center"}>
        <Input
          icon="search"
          placeholder="Enter Stock Name Here..."
          fluid
          value={stockName}
          onChange={(event) => setStockName(event.target.value)}
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
