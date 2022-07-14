import React from "react";
import { Route, Switch } from "react-router-dom";
import MenuBar from "./MenuBar";
import Home from "./Home";
import Portfolio from "./Portfolio";
import Stock from "./Stock";

function App() {
  const routerLinks = [
    {
      name: "home",
      path: "/",
      component: Home,
    },
    {
      name: "portfolio",
      path: "/portfolio",
      component: Portfolio,
    },
    {
      name: "stock",
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
