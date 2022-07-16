import React, { useContext, useEffect, useState } from "react";
import { Card, CardGroup, Divider } from "semantic-ui-react";
import { UserContext } from "../context/user";
import useFetchPortfolio from "../hooks/useFetchPortfolio";
import Chart from "./Chart";

function Portfolio() {
  const [user] = useContext(UserContext);
  const stocksArray = useFetchPortfolio(user.stocks);

  // console.log(stocksArray);
  if (stocksArray !== null) {
    stocksArray.forEach(stock =>
      console.log(stock[Object.keys(stock)]["Time Series (5min)"])
    );
  }

  return (
    <div>
      <Divider horizontal></Divider>
      <h3>Portfolio Page</h3>
      <Divider horizontal></Divider>

      {stocksArray !== null ? (
        <CardGroup centered itemsPerRow={2}>
          {stocksArray.map((stock, index) => {
            console.log(stock[Object.keys(stock)]["Time Series (5min)"]);
            return (
              <Card key={index}>
                <Card.Content>{Object.keys(stock)}</Card.Content>
                <Card.Content></Card.Content>
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
