import React, { useState, useContext } from "react";
import { Button, Form } from "semantic-ui-react";
import useGetUsers from "../hooks/useGetUsers";
import * as url from "url";
import { UserContext } from "../context/user";
const saltedSha256 = require("salted-sha256");

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [userList, setUserList] = useGetUsers();
  const { user, setUser } = useContext(UserContext);

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const url = "https://dry-lowlands-31397.herokuapp.com/users";
    const saltedHash = saltedSha256(formData.password, "SALTY-CHIPS");
    const testUser = userList.find(
      (user) => user.username === formData.username
    );
    testUser
      ? fetch(url + `/${testUser.id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.password === saltedHash) {
              return {
                username: data.username,
                id: data.id,
                isLoggedIn: true,
              };
            } else {
              console.error("Password does not match!");
            }
          })
          .then((res) => (res ? setUser(res) : null))
      : console.error("User not found!");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Username:</label>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Field>
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
      <Button type="submit" color="blue">
        Log In
      </Button>
    </Form>
  );
}
export default Login;
