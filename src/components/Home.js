import React, { useContext } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Divider, Grid, Rail, Segment } from "semantic-ui-react";
import { UserContext } from "../context/user";

function Home() {
  const [user] = useContext(UserContext);

  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Segment>
          {user.isLoggedIn ? null : (
            <>
              <Rail position="left">
                <Segment>
                  <Signup />
                </Segment>
              </Rail>

              <Rail position="right">
                <Segment>
                  <Login />
                </Segment>
              </Rail>
            </>
          )}

          <h3>
            <i>Flatiron School - SE Flex - Phase 2 - Portfolio App</i>
          </h3>
          <Divider horizontal>o</Divider>
          <div>
            {user.isLoggedIn ? (
              <>
                <p>Welcome back: {user.username}</p>
                <br></br>
                You are currently watching:
                <ul>
                  {user.stocks.map((stock, index) => (
                    <li key={index}>{stock}</li>
                  ))}
                </ul>
              </>
            ) : (
              <p>Create a new portfolio or select an existing portfolio!</p>
            )}
          </div>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
