import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import './App.css';
import Navbar from "./components/navbar";
import Tournament from "./components/tournament";
import Log from "./components/log";
import Player from "./components/player";
import PrivateRoute from "./components/privateRoute";
import Admin from "./components/admin";
import checkStorageForUser from "./components/functions/checkStorageForUser";
import Bets from "./components/bets";
import Account from "./components/account";
import Dashboard from "./components/dashboard";

const baseURL = process.env.NODE_ENV === 'development' ? 
"http://localhost:9000" : "https://api.playthefade.com";

const axios = require("axios").create({
  baseURL: baseURL,
});

export default function App() {
  const [user, setUser] = useState({});

  useEffect(() => {
    const { user } = checkStorageForUser();
    setUser(user);
  }, []);

  function handleUserChange(user) {
    setUser(user);
  }

  return (
    <Router>
        <div className="content-inside">
          <Navbar user={user} handleUserChange={handleUserChange}/>
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Tournament axios={axios} />
                  </PrivateRoute>
                }
                />
              <Route path="/admin" element={<Admin axios={axios} handleUserChange={handleUserChange} />} />
              <Route
                path="/log"
                element={
                  <PrivateRoute>
                    <Log axios={axios} />
                  </PrivateRoute>
                }
                />
              <Route
                path="/player"
                element={
                  <PrivateRoute>
                    <Player axios={axios} />
                  </PrivateRoute>
                }
                />
              <Route
                path="/bets"
                element={
                  <PrivateRoute>
                    <Bets axios={axios} />
                  </PrivateRoute>
                }
                />
              <Route
                path="/account"
                element={
                  <PrivateRoute>
                    <Account axios={axios} />
                  </PrivateRoute>
                }
                />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard axios={axios} />
                  </PrivateRoute>
                }
                />
            </Routes>
          </div>
        </div>
    </Router>
  );
};