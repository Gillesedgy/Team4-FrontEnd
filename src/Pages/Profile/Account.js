import React from "react";
import axios from "axios";
import "./Account.css";
import { useEffect } from "react";
import { useContextProvider } from "../../Provider";
import UserJob from "./userJob";

const API = process.env.REACT_APP_API_URL;
export default function Account() {
  const { user, setUser } = useContextProvider();

  useEffect(() => {
    axios
      .get(`${API}/users/profile`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.warn(err));
  }, []);



  return (
    <div className="user-profile">
      <div className="profile-header">
        <img src={user.image_url} alt="User Avatar" />
        <h2>{user.username}</h2>
        <p>{user.email}</p>
      </div>
      <div className="profile-body">
        <p>{user.address}</p>
        <p>{user.native_language}</p>
      </div>
      <div className="user-job-profile">
        <UserJob />
      </div>
      
    </div>
  );
}
