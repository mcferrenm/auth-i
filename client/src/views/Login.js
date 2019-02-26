import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

class Login extends Component {
  signal = axios.CancelToken.source();

  state = {
    username: "",
    password: "",
    error: null,
    user: null,
    isLoading: false
  };

  handleChange = e => {
    e.persist();
    this.setState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  handleLogin = async e => {
    e.preventDefault();

    // move this to axios config module
    const login = axios.create({
      withCredentials: true
    });

    const { username, password } = this.state;

    try {
      this.setState({ isLoading: true });

      const user = await login.post("/api/login", {
        username,
        password
      });

      this.setState({
        user: user.data,
        username: "",
        password: "",
        isLoading: false
      });
      this.props.history.push("/");
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Error: ", error.message); // => prints: Api is being canceled
      } else {
        this.setState({ isLoading: false });
      }
    }
  };

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

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
        <Link to="/register">Need to sign up?</Link>
      </div>
    );
  }
}

export default withRouter(Login);
