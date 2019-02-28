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
        withCredentials: true,
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0IjozLCJ1c2VybmFtZSI6IkRhdmUiLCJyb2xlcyI6W3sibmFtZSI6Imluc3RydWN0b3IiLCJyb2xlX2lkIjoxfV0sImlhdCI6MTU1MTMwNzk0MywiZXhwIjoxNTUxMzk0MzQzfQ.oNBV7u2RRsPxj1cHHYxsotEc5XH3vheNIom-tg0S5T8"
        }
      });

      const users = await usersList.get("/api/restricted/users", {
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
        Dashboard
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
