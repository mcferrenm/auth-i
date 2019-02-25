import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  state = { username: "", password: "", error: null, user: null };

  handleChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  handleLogin = async e => {
    e.preventDefault();

    const { username, password } = this.state;
    try {
      const user = await axios.post("http://localhost:8000/api/login", {
        username,
        password
      });
      console.log(user.data);
      this.setState({ user: user.data, username: "", password: "" });

    } catch (error) {
      this.setState(error);
    }
  };

  render() {
    const { user } = this.state;
    return (
      <div>
        {user && <p>{user.message}</p>}
        <form style={{ padding: "20px" }}>
          <label htmlFor="username">User:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <button onClick={this.handleLogin}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;
