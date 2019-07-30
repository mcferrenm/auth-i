import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("jwt");

    return options;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      localStorage.getItem("jwt") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
          }}
        />
      )
    }
  />
);

export default ProtectedRoute;
