import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    password: "",
    confirmPw: "",
    error: null,
    user: null
  };

  handleChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  handleRegister = async e => {
    e.preventDefault();

    const { username, password, confirmPw } = this.state;
    try {
      if (password !== confirmPw) {
        throw Error("Passwords don't match");
      }
      const user = await axios.post("http://localhost:8000/api/register", {
        username,
        password
      });
      console.log(user.data);
      this.setState({
        user: user.data,
        username: "",
        password: "",
        confirmPw: ""
      });
    } catch (error) {
      this.setState(error);
    }
  };

  render() {
    const { user, error } = this.state;
    if (error) {
      return <p>{error}</p>;
    }
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
          <label htmlFor="confirmPw">confirm pw:</label>
          <input
            type="password"
            name="confirmPw"
            value={this.state.confirmPw}
            onChange={this.handleChange}
          />
          <button onClick={this.handleRegister}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Register;
