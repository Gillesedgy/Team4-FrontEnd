import React from "react";
import axios from "axios";
import "./Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContextProvider } from "../../Provider";
import { translateSite } from "../../utils";
import content from "../../content";

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
          localStorage.setItem("user_id", user_id);
          // handleUserInfo(user_id);
          localStorage.setItem("user_info", JSON.stringify(response.data));
          return translateSite(content, response.data.native_language)
        },
        (error) => console.log(error)
      )
      .then((translationJson) => localStorage.setItem('siteTranslations', JSON.stringify(translationJson)))
      .then(() => window.location.href = "/")
      .catch((c) => console.warn("catch", c));
  }

  return (
    <div className="login-form">
            <img className="pinksticker" src="https://www.tickettailor.com/v3/svg/our-impact/sticker-pink.svg" alt="pinksticker"/>
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
