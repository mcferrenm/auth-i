import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";

import ProtectedRoute from "./components/protectedRoute";

import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import "./App.css";

class App extends Component {
  logout = e => {
    e.preventDefault();
    localStorage.removeItem("jwt");
    localStorage.removeItem("username");
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/">Dashboard</NavLink>
            <button onClick={this.logout}>Logout</button>
          </nav>
        </header>
        <ProtectedRoute exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default withRouter(App);
