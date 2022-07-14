import React, { useContext } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Divider, Grid, Rail, Segment } from "semantic-ui-react";
import { UserContext } from "../context/user";

function Home() {
  const user = useContext(UserContext);
  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Divider horizontal></Divider>
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
          <p>Please signup or login to continue</p>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Home;
