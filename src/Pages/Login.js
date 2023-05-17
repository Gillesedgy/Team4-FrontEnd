import React from "react";
import axios from "axios";
import "./Login.css"
import { useNavigate, Link } from "react-router-dom";
import { useContextProvider } from "../Provider";

const API = process.env.REACT_APP_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContextProvider();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(user);
  };

  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  function loginUser(user) {
    axios
      .post(`${API}/users/login`, user)
      .then(
        () => {
          navigate("/listings");
        },
        (error) => console.log(error)
      )
      .catch((c) => console.warn("catch", c));
  }

  return (
    <div className="login-form">
      <h2 className="login_title">Log in</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            id="username"
            value={user.username}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            id="password"
            value={user.password}
            onChange={handleTextChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="signup-prompt">
        <p>Dont have an account? <Link to="/signup"> <button className="signup-btn">Sign Up</button></Link></p>
        
      </div>
    </div>
  );
}
