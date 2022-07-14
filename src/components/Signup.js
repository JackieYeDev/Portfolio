import React, { useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    warnings: "",
  });
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setFormData({ ...formData, warnings: "Passwords does not match!" });
    } else {
      setFormData({ ...formData, warnings: "" });
    }
  }

  return (
    <Form onSubmit={handleSubmit} warning={formData.warnings ? true : false}>
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
        list={[formData.warnings]}
      />
      <Button type="submit" color="green">
        Sign Up
      </Button>
    </Form>
  );
}

export default Signup;
