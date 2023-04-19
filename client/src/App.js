import React from "react";
import Home from "./components/home/home";
import Login from "./components/login/login";
import Register from "./components/register/register";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
function App() {
  const [user, setLogin] = useState({});

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              user && user._id ? (
                <Home setLogin={setLogin} />
              ) : (
                <Login setLogin={setLogin} />
              )
            }
          />
          <Route path="/login" element={<Login setLogin={setLogin} />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
