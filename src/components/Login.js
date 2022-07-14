import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
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
