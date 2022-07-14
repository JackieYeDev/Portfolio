import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import { Input, Menu } from "semantic-ui-react";

function MenuBar() {
  const [activeTab, setActiveTab] = useState("");
  const routerLinks = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Portfolio",
      path: "/portfolio",
    },
    {
      name: "Stock",
      path: "/stock",
    },
  ];

  // @TODO: Replace with window.location.pathname
  function handleClick(event) {
    const id = event.target.id;
    setActiveTab(id);
  }

  return (
    <div>
      <Menu>
        {routerLinks.map((link, index) => (
          <Menu.Item
            key={index}
            id={link.name}
            onClick={handleClick}
            active={activeTab === link.name}
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
