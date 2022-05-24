import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function Admin(props) {
  const { axios, handleUserChange } = props;
  const [username, setUsername] = useState("");
  const [userStatus, setUserStatus] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  function handleChange(e) {
    switch (e.target.name) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "rememberMe":
        setRememberMe(e.target.value);
        break;
      default:
        break;
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", {
        Username: username,
        Password: password,
      });
      sessionStorage.setItem("user", JSON.stringify(response.data));
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      handleUserChange(response.data);
      setLoginSuccessful(true);
    } catch (error) {
      if (error.response.status === 403 && !error.response.data.success) {
        setUserStatus(error.response.data.message);
      } else {
        console.error(error);
      }
    }
  }

  if (loginSuccessful){
    return <Navigate to="/" />;
  }

  return (
    <React.Fragment>
      {userStatus ? (
        <div
          class="alert alert-danger w-25 mt-5 mx-auto"
          style={{ maxWidth: "400px" }}
          role="alert"
        >
          {userStatus}
        </div>
      ) : (
        <div></div>
      )}
      <div className="card w-25 mt-5 mx-auto login-card">
        <div className="card-body">
          <h5 className="card-title mb-3">Log in</h5>
          <form onSubmit={login}>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Username</label>
              <input 
                type="text" 
                class="form-control" 
                id="inputUsername" 
                name="username"
                value={username}
                onChange={handleChange} 
              />
            </div>
            <div class="mb-3">
              <label for="inputUsername" class="form-label">Password</label>
              <input 
                type="password"
                className="form-control"
                id="inputPassword"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div class="form-check mb-3">
              <input 
                class="form-check-input" 
                type="checkbox" 
                id="rememberMeCheck"
                name="rememberMe"
                checked={rememberMe}
                onChange={handleChange} />
              <label class="form-check-label" for="rememberMeCheck">
                Keep me signed in on this device
              </label>
            </div>
            <button type="submit" className="btn btn-primary">
              Log in
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
}
