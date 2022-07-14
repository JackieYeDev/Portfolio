import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import { Input, Menu } from "semantic-ui-react";

function MenuBar(props) {
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = window.location.pathname.split("/")[1];
    setActiveTab(path);
  }, [window.location.pathname]);

  return (
    <div>
      <Menu>
        {props.links.map((link, index) => (
          <Menu.Item
            key={index}
            id={link.name}
            active={activeTab === link.name}
            as={NavLink}
            exact
            to={link.path}
          >
            {link.name.toUpperCase()}
          </Menu.Item>
        ))}
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default MenuBar;
