import React from "react";
import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContextProvider } from "../Provider";

const API = process.env.REACT_APP_API_URL;

export default function Login() {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const { user, setUser } = useContextProvider();

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser(user);
  };

  const handleTextChange = (e) => {
    setUserLogin({ ...userLogin, [e.target.id]: e.target.value });
  };

  let user_id;

  // const handleUserInfo = (user_id) => {
  //   axios
  //     .get(`${API}/users/profile/${user_id}`, {
  //       headers: {
  //         Authorization: `Bearer ${JSON.stringify(
  //           window.localStorage.getItem("jwtToken")
  //         )}`,
  //       },
  //     })
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.warn(err));
  // };

  function loginUser() {
    axios
      .post(`${API}/users/login`, {
        username: userLogin.username,
        password: userLogin.password,
      })
      .then(
        (response) => {
          const jwtToken = response.data.token;
          user_id = response.data.id;
          localStorage.setItem("jwtToken", jwtToken);
          // handleUserInfo(user_id);
          setUser(response.data);
          console.log(response.data);
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
            value={userLogin.username}
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
            value={userLogin.password}
            onChange={handleTextChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="signup-prompt">
        <p>
          Dont have an account?{" "}
          <Link to="/signup">
            {" "}
            <button className="signup-btn">Sign Up</button>
          </Link>
        </p>
      </div>
    </div>
  );
}
