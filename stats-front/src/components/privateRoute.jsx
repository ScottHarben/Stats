import React from "react";
import { Navigate } from "react-router-dom";
import checkStorageForUser from "./functions/checkStorageForUser";

export default function PrivateRoute({ children }) {

  function checkedForLoggedIn() {
    const { loggedIn } = checkStorageForUser();
    return loggedIn;
  }

  return checkedForLoggedIn() ? children : <Navigate to="/" />;
}
