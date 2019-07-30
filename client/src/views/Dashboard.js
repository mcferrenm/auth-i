import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  signal = axios.CancelToken.source();

  state = { users: [], error: null, isLoading: false, activeUser: "" };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
        activeUser: localStorage.getItem("username")
      });

      const users = await axios.get("/api/users", {
        cancelToken: this.signal.token
      });

      this.setState({ users: users.data, isLoading: false });
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log("Error: ", error.message); // => prints: Api is being canceled
      } else {
        this.setState({ isLoading: false });
      }
    }
  }

  componentWillUnmount() {
    this.signal.cancel("Api is being canceled");
  }

  render() {
    const { users } = this.state;
    if (!users) {
      return null;
    }
    return (
      <ul>
        Welcome: {this.state.activeUser}
        {users.map(user => (
          <li key={user.id}>
            <p>{user.username}</p>
          </li>
        ))}
      </ul>
    );
  }
}

export default Dashboard;
