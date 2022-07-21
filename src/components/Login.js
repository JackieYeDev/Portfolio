import React, { useState, useContext } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { UserContext } from "../context/user";
const saltedSha256 = require("salted-sha256");

function Login(props) {
  const [formData, setFormData] = useState({
    password: "",
    message: "",
    status: "",
  });

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    username: "",
    password: "",
    stocks: [],
  });
  const userList = props.userList;
  const [user, setUser] = useContext(UserContext);

  function handleUserSelect(event) {
    const value = event.target.value;
    setSelectedUser(userList.find((user) => user.id == value));
    setFormData({ ...formData, password: "", status: "", message: "" });
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (selectedUser.id === null) return null;
    const saltedHash = saltedSha256(formData.password, "SALTY-CHIPS");
    if (
      selectedUser.password.length > 0 &&
      selectedUser.password !== saltedHash
    ) {
      setFormData({
        ...formData,
        status: "warning",
        message: "Invalid Password",
      });
    } else {
      setUser({
        id: selectedUser.id,
        username: selectedUser.username,
        password: selectedUser.password,
        stocks: selectedUser.stocks,
        isLoggedIn: true,
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit} warning={formData.status === "warning"}>
      <Form.Field>
        <label>Load Watchlist by Username:</label>
        <select onChange={handleUserSelect}>
          <option selected value={0} disabled></option>
          {userList.map((user, index) => (
            <option name="id" key={index} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </Form.Field>
      {selectedUser.password ? (
        <Form.Field>
          <label>Password:</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Field>
      ) : null}
      <Button type="submit" color="blue">
        Load Watchlist
      </Button>
      {formData.status ? (
        <Message
          warning={formData.status === "warning"}
          list={[formData.message]}
        />
      ) : null}
    </Form>
  );
}
export default Login;
