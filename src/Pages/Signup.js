import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../Provider";

const API = process.env.REACT_APP_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const { user, setUser } = useContextProvider();

  const handleSignup = (e) => {
    e.preventDefault();
    signUpUser(user);
  };

  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  function signUpUser(user) {
    axios
      .post(`${API}/users/signup`, user)
      .then(
        () => {
          navigate("/listings");
        },
        (error) => console.log(error)
      )
      .catch((c) => console.warn("catch", c));
  }

  return (
    <div className="signup">
      <h2>Sign up</h2>
      <form onSubmit={handleSignup}>
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
          Email:
          <input
            type="text"
            id="email"
            value={user.email}
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
        <br />
        <label>
          Address:
          <input
            type="type"
            id="address"
            value={user.address}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <label>
          Native language:
          <input
            type="text"
            id="native_language"
            value={user.native_language}
            onChange={handleTextChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
