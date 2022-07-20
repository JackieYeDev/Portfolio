import React, { useContext } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Divider, Grid, Rail, Segment } from "semantic-ui-react";
import { UserContext } from "../context/user";
import useGetUsersList from "../hooks/useGetUsersList";

function Home() {
  const [user] = useContext(UserContext);
  const [userList, setUserList] = useGetUsersList();

  const usernameList = userList.map((user) => user.username);

  return (
    <Grid centered columns={3}>
      <Grid.Column>
        <Segment>
          {user.isLoggedIn ? null : (
            <>
              <Rail position="left">
                <Segment>
                  <Signup
                    usernameList={usernameList}
                    setUserList={setUserList}
                    userList={userList}
                  />
                </Segment>
              </Rail>

              <Rail position="right">
                <Segment>
                  <Login userList={userList} />
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
