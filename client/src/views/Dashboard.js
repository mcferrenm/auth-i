import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  signal = axios.CancelToken.source();

  state = { users: [], error: null, isLoading: false };

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });

      // move this to axios config module
      const usersList = axios.create({
        withCredentials: true
      });

      const users = await usersList.get(
        "http://localhost:4000/api/restricted/users",
        { cancelToken: this.signal.token }
      );
      this.setState({ users: users.data, isLoading: false });
      
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Error: ', error.message); // => prints: Api is being canceled
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
        Dashboard
        {users.map(user => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    );
  }
}

export default Dashboard;
