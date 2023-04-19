import React from "react";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setLogin }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const login = () => {
    axios.post("http://localhost:5000/login", user).then((res) => {
      setErrorMsg(res.data.message);
      setLogin(res.data.user);
      navigate("/");
    });
  };
  return (
    <div className="login">
      <h1>Login</h1>
      <input
        className="email"
        type="text"
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Enter your email"
      ></input>
      <input
        className="password"
        type="password"
        name="password"
        value={user.password}
        onChange={handleChange}
        placeholder="Enter your password"
      ></input>
      <div className="loginBtn" onTouchStart={login} onClick={login}>
        login
      </div>
      <div>or</div>
      <div className="registerBtn" onClick={() => navigate("/register")}>
        Register
      </div>
      {errorMsg && <p className="error">{errorMsg}</p>}
    </div>
  );
};

export default Login;
