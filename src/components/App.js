import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./MenuBar";
import Home from "./Home";
import Watchlist from "./Watchlist";
import Stock from "./Stock";
import { UserContext } from "../context/user";
import { Divider } from "semantic-ui-react";

function App() {
  const routerLinks = [
    {
      name: "home",
      path: "/",
      loggedInRequired: false,
      component: Home,
    },
    {
      name: "watchlist",
      path: "/watchlist",
      loggedInRequired: true,
      component: Watchlist,
    },
    {
      name: "stock",
      path: "/stock",
      loggedInRequired: true,
      component: Stock,
    },
  ];
  const [user] = useContext(UserContext);
  return (
    <div>
      <MenuBar links={routerLinks} />
      <Divider horizontal></Divider>
      <Switch>
        {routerLinks.map((link, index) => (
          <Route key={index} exact path={link.path} component={link.component}>
            {link.loggedInRequired && user.isLoggedIn ? null : <Home />}
          </Route>
        ))}
      </Switch>
    </div>
  );
}

export default App;
