import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Input, Menu } from "semantic-ui-react";
import { UserContext } from "../context/user";

function MenuBar(props) {
  const [activeTab, setActiveTab] = useState("");

  function handleClick(event) {
    const id = event.target.id;
    setActiveTab(id);
  }

  const [user] = useContext(UserContext);

  return (
    <div>
      <Menu>
        {props.links.map((link, index) => {
          if (link.loggedInRequired && user.isLoggedIn) {
            // Renders links that require login
            return (
              <Menu.Item
                key={index}
                id={link.name}
                active={activeTab === link.name}
                as={NavLink}
                exact
                to={link.path}
                onClick={handleClick}
              >
                {link.name.toUpperCase()}
              </Menu.Item>
            );
          } else if (!link.loggedInRequired) {
            // Renders links that does not require login
            return (
              <Menu.Item
                key={index}
                id={link.name}
                active={activeTab === link.name}
                as={NavLink}
                exact
                to={link.path}
                onClick={handleClick}
              >
                {link.name.toUpperCase()}
              </Menu.Item>
            );
          } else {
            // Do nothing
            return null;
          }
        })}
        {user.isLoggedIn && activeTab === "portfolio" ? (
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        ) : null}
      </Menu>
    </div>
  );
}

export default MenuBar;
