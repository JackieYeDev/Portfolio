import React from "react";
import { Button, Card } from "semantic-ui-react";
import Chart from "./Chart";

function StockCard(props) {
  return (
    <Card>
      <Card.Content>{props.stock["Meta Data"]["2. Symbol"]}</Card.Content>
      <Card.Content>
        <Chart
          stockName={props.stock["Meta Data"]["2. Symbol"]}
          labels={Object.keys(props.stock["Time Series (5min)"])
            .map((key) => key.split(" ")[1])
            .reverse()}
          data={Object.keys(props.stock["Time Series (5min)"])
            .map(
              (key) => props.stock["Time Series (5min)"][`${key}`]["4. close"]
            )
            .reverse()}
        />
      </Card.Content>
      <Card.Content extra>
        <Button
          basic
          color="red"
          onClick={() =>
            props.removeStock(props.stock["Meta Data"]["2. Symbol"])
          }
        >
          Remove Stock from Watchlist
        </Button>
      </Card.Content>
    </Card>
  );
}

export default StockCard;
