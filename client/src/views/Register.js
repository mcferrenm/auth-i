import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  signal = axios.CancelToken.source();

  state = {
    username: "",
    password: "",
    confirmPw: "",
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

  handleRegister = async e => {
    e.preventDefault();

    const { username, password, confirmPw } = this.state;
    try {
      this.setState({ isLoading: true });

      if (password !== confirmPw) {
        throw Error("Passwords don't match");
      }
      const user = await axios.post("/api/auth/register", {
        username,
        password
      });

      localStorage.setItem("jwt", user.data.token)

      this.setState({
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
    const { user, error } = this.state;
    if (error) {
      return null
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
