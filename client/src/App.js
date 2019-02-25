import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";

import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav style={{ padding: "20px" }}>
          {/* <NavLink to="">Dashboard</NavLink>{" "} */}
          <NavLink to="/login">Login</NavLink>{" "}
          <NavLink to="/register">Register</NavLink>
        </nav>
        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
