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
      <Navbar user={user} handleUserChange={handleUserChange}/>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<Tournament axios={axios} />} />
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
        </Routes>
      </div>
    </Router>
  );
};