import React, { useState } from "react";
import { Button, Checkbox, Form, Message } from "semantic-ui-react";
const saltedSha256 = require("salted-sha256");

function Signup(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    requirePassword: false,
    status: "",
    message: "",
  });

  const usernameList = props.usernameList;

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleClick() {
    setFormData({ ...formData, requirePassword: !formData.requirePassword });
  }

  function updateFormMessages(status, message) {
    setFormData({ ...formData, status: status, message: message });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.username.length === 0) {
      updateFormMessages(
        "warning",
        "Please enter 1 or more character(s) for the username"
      );
    } else if (usernameList.find((user) => user === formData.username)) {
      updateFormMessages("warning", "User exists!");
    } else if (
      formData.requirePassword &&
      formData.password !== formData.passwordConfirmation
    ) {
      updateFormMessages("warning", "Passwords does not match!");
    } else {
      setFormData({ ...formData, message: "" });
      const url = "https://dry-lowlands-31397.herokuapp.com/users";
      const saltedHash = formData.requirePassword
        ? saltedSha256(formData.password, "SALTY-CHIPS")
        : "";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: saltedHash,
          stocks: [],
        }),
      })
        .then((res) => {
          if (res.statusText === "Created") {
            setFormData({
              username: "",
              password: "",
              passwordConfirmation: "",
              requirePassword: false,
              status: "success",
              message: "Your portfolio has been successfully created.",
            });
            return res.json();
          }
        })
        .then((data) => {
          props.setUserList([...props.userList, data]);
        });
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      warning={formData.status === "warning"}
      success={formData.status === "success"}
    >
      <Form.Field>
        <label>Create New Portfolio by Username:</label>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
      </Form.Field>
      <Form.Field>
        <Checkbox
          label="Use password (optional)"
          name="requirePassword"
          onClick={handleClick}
          checked={formData.requirePassword}
        />
      </Form.Field>
      {formData.requirePassword ? (
        <>
          <Form.Field>
            <label>Password: </label>
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
        </>
      ) : null}
      {formData.status ? (
        <Message
          warning={formData.status === "warning"}
          success={formData.status === "success"}
          list={[formData.message]}
        />
      ) : null}
      <Button type="submit" color="green">
        Create
      </Button>
    </Form>
  );
}

export default Signup;
