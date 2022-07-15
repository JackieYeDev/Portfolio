import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import useGetUsers from "../hooks/useGetUsers";
import { UserContext } from "../context/user";
const saltedSha256 = require("salted-sha256");

function Login() {
  const [formData, setFormData] = useState({
    password: "",
  });

  const [selectedUser, setSelectedUser] = useState({
    id: null,
    username: "",
    password: "",
    requirePassword: false,
  });
  const [userList, setUserList] = useGetUsers();
  const [user, setUser] = useContext(UserContext);

  function handleUserSelect(event) {
    const value = event.target.value;
    setSelectedUser(userList.find((user) => user.id == value));
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const saltedHash = saltedSha256(formData.password, "SALTY-CHIPS");
    const url = `https://dry-lowlands-31397.herokuapp.com/users/${selectedUser.id}`;
    if (selectedUser.requirePassword && selectedUser.password !== saltedHash) {
      console.error("Invalid password");
    } else {
      fetch(url)
        .then((res) => res.json())
        .then((data) => console.log(data))
        .then(() =>
          setUser({
            username: selectedUser.username,
            id: selectedUser.id,
            isLoggedIn: true,
          })
        );
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Load Portfolio by Username:</label>
        <select onChange={handleUserSelect}>
          <option selected value={0} disabled></option>
          {userList.map((user, index) => (
            <option name="id" key={index} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </Form.Field>
      {selectedUser.requirePassword ? (
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
        Load Portfolio
      </Button>
    </Form>
  );
}
export default Login;
