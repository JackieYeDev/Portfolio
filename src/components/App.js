import React from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./MenuBar";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Stock from "./Stock";
import { UserProvider } from "../context/user";

function App() {
  const routerLinks = [
    {
      name: "home",
      path: "/",
      loggedInRequired: false,
      component: Home,
    },
    {
      name: "portfolio",
      path: "/portfolio",
      loggedInRequired: true,
      component: Portfolio,
    },
    {
      name: "stock",
      path: "/stock",
      loggedInRequired: true,
      component: Stock,
    },
  ];
  return (
    <div>
      <UserProvider>
        <MenuBar links={routerLinks} />
        <Switch>
          {routerLinks.map((link, index) => (
            <Route
              key={index}
              exact
              path={link.path}
              component={link.component}
            ></Route>
          ))}
        </Switch>
      </UserProvider>
    </div>
  );
}

export default App;
