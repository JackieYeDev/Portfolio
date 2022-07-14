import React from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./MenuBar";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Stock from "./Stock";

function App() {
  const routerLinks = [
    {
      name: "Home",
      path: "/",
      component: Home,
    },
    {
      name: "Portfolio",
      path: "/portfolio",
      component: Portfolio,
    },
    {
      name: "Stock",
      path: "/stock",
      component: Stock,
    },
  ];
  return (
    <div>
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
    </div>
  );
}

export default App;
