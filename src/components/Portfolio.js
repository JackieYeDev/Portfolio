import React from "react";
import { Card, Divider } from "semantic-ui-react";

function Portfolio() {
  return (
    <div>
      <Divider horizontal></Divider>
      <h3>Portfolio Page</h3>
      <Divider horizontal></Divider>
      {true ? (
        <p>Your portfolio is currently empty!</p>
      ) : (
        <Card.Group centered></Card.Group>
      )}
    </div>
  );
}

export default Portfolio;
