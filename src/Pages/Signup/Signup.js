import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../Provider";
import { LanguageSelect } from "../../Features/LanguageSelect";
import "./Signup.css";
import { translateSite } from "../../utils";
import content from "../../content";
import Floating from "../Login/Floating";

const API = process.env.REACT_APP_API_URL;

export default function Signup() {
  const navigate = useNavigate();
  const { user, setUser } = useContextProvider();
  const [selectedLanguage, setSelectLanguage] = useState("");

  const onChange = (e) => {
    async function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader(); // built in function
        reader.readAsDataURL(file); // methods that reads the file and turns it into data uri
        reader.onload = () => resolve(reader.result); // if file is read resolve with the uri
        reader.onerror = (error) => reject(error); // if the file fails to be read reject with the error
      });
    }

    fileToBase64(e.target.files[0]).then((uri) => {
      setUser({ ...user, image_url: uri });
    });
  };

  const handleTextChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSelectedLanguage = (e) => {
    const selected = e.target.value;
    setSelectLanguage(e.target.value);
    setUser({ ...user, native_language: selected });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signUpUser(user);
  };

  function signUpUser(user) {
    axios
      .post(`${API}/users/signup`, user)
      .then(
        (res) => {
          console.log(res.data);
          return translateSite(content, selectedLanguage);
        },
        (error) => console.log(error)
      )
      .then((translationJson) => {
        localStorage.setItem(
          "siteTranslations",
          JSON.stringify(translationJson)
        );
        navigate("/login");
      })
      .catch((c) => console.warn("catch", c));
  }

  return (
    <div>
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
              type="text"
              id="address"
              value={user.address}
              onChange={handleTextChange}
              required
            />
          </label>
          <label htmlFor="image_url" className="custom-file-upload">
            Profile Picture:
            <input
              className="profile_pic"
              id="image_url"
              type="file"
              accept=".png, .jpg, .jpeg"
              placeholder="Post Picture"
              onChange={onChange}
            />
          </label>
          <br />
          <label style={{ marginTop: "-13px" }}>
            <LanguageSelect
              selected={selectedLanguage}
              handleSelectedLanguage={handleSelectedLanguage}
            />
          </label>
          <button type="submit" onClick={handleSignup} style={{ marginTop: "10px" }}>
            Submit
          </button>
        </form>
      </div>
      <Floating />
    </div>
  );
}
