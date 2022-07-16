import React, { useState, useContext } from "react";
import { Button, Card, Form, Image, Input } from "semantic-ui-react";
import Chart from "./Chart";
import { UserContext } from "../context/user";
import useFetchStocks from "../hooks/useFetchStocks";

{
  /*

let chartKey = Object.keys(chartData["Time Series (5min)"]).map((key)=> key.split(' ')[1]).reverse()
Changes 2022-07-13 18:45:00 to 18:45:00

Object.keys(chartData['Time Series (5min)']).map((key) => console.log(chartData['Time Series (5min)'][`${key}`]['4. close'])).reverse()


*/
}

function Stock() {
  const [user, setUser] = useContext(UserContext);
  const [query, setQuery] = useState("");
  const [stockData, stockName] = useFetchStocks(query);
  const [fluid, setFluid] = useState(false);
  const [formData, setFormData] = useState({
    searchString: "",
  });
  function handleSearch(event) {
    if (event.key !== "Enter") {
      return null;
    }
    if (formData.searchString === "") return null;
    setQuery(formData.searchString);
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
      .catch(err => console.error(err));
  }
  return (
    <Card centered color='olive' fluid={fluid}>
      <Card.Header textAlign={"center"}>
        <Input
          action
          onKeyPress={handleSearch}
          placeholder='Enter Stock Name Here...'
          fluid
          value={formData.searchString}
          onChange={event =>
            setFormData({
              ...formData,
              searchString: event.target.value.toUpperCase(),
            })
          }
        >
          <input />
          <Button basic color='green' onClick={handleSearch}>
            Search
          </Button>
        </Input>
      </Card.Header>
      {stockData ? (
        <>
          <Chart
            stockName={stockName}
            labels={Object.keys(stockData["Time Series (5min)"])
              .map(key => key.split(" ")[1])
              .reverse()}
            data={Object.keys(stockData["Time Series (5min)"])
              .map(key => stockData["Time Series (5min)"][`${key}`]["4. close"])
              .reverse()}
          />
          <Card.Content textAlign={"center"}></Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green' onClick={handleClick}>
                Add Stock to Porfolio
              </Button>
              <Button basic color='grey' onClick={() => setFluid(!fluid)}>
                {fluid ? "Collapse" : "Expand"}
              </Button>
            </div>
          </Card.Content>
        </>
      ) : null}
    </Card>
  );
}

export default Stock;
