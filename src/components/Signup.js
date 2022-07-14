import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import useGetUsers from "../hooks/useGetUsers";
const saltedSha256 = require("salted-sha256");

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    warning: "",
    success: "",
  });

  const [userList, setUserList] = useGetUsers();

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (userList.find((user) => user === formData.username)) {
      setFormData({ ...formData, warning: "User exists!" });
    } else if (formData.password !== formData.passwordConfirmation) {
      setFormData({ ...formData, warning: "Passwords does not match!" });
    } else {
      setFormData({ ...formData, warning: "" });
      const url = "https://dry-lowlands-31397.herokuapp.com/users";
      const saltedHash = saltedSha256(formData.password, "SALTY-CHIPS");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: saltedHash,
        }),
      })
        .then((res) => {
          if (res.statusText === "Created") {
            setFormData({
              username: "",
              password: "",
              passwordConfirmation: "",
              warning: "",
              success: "Your account has been successfully created.",
            });
            return res.json();
          }
        })
        .then((data) => setUserList([...userList, data.username]))
        .then(() => console.log(userList));
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      warning={formData.warning ? true : false}
      success={formData.success ? true : false}
    >
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

      <Form.Field>
        <label>Confirm Password:</label>
        <input
          name="passwordConfirmation"
          type="password"
          placeholder="Re-Enter Password"
          value={formData.passwordConfirmation}
          onChange={handleChange}
        />
      </Form.Field>
      <Message
        warning
        header="Something went wrong!"
        list={[formData.warning]}
      />
      <Message success header="Sign up complete" list={[formData.success]} />
      <Button type="submit" color="green">
        Sign Up
      </Button>
    </Form>
  );
}

export default Signup;
