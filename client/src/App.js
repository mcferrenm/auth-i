import React, { Component } from "react";
import { Route } from "react-router-dom";

// import ProtectedRoute from "./components/protectedRoute";

import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <ProtectedRoute exact path="/" component={Dashboard} /> */}

        <Route exact path="/" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </div>
    );
  }
}

export default App;
