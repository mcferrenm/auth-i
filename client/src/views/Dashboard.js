import React, { Component } from "react";
import axios from "axios";

class Dashboard extends Component {
  state = { users: [], error: null };
  async componentDidMount() {
    try {
      const users = await axios.get(
        "http://localhost:8000/api/restricted/users",
        { headers: { username: "Max", password: "password" } }
      );
      this.setState({ users: users.data });
    } catch (error) {
      this.setState({ error });
    }
  }
  render() {
    const { users } = this.state;
    if (!users) {
      return null;
    }
    return (
      <div>
        {users.map(user => (
          <ul>
            <li key={user.id}>{user.username}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default Dashboard;
