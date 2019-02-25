import React from "react";

export const UserForm = props => {
  return (
    <form style={{ padding: "20px" }}>
      <label htmlFor="username">User:</label>
      <input type="text" name="username" />
      <label htmlFor="password">Password:</label>
      <input type="password" name="password" />
      <button>Submit</button>
    </form>
  );
};
