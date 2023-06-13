import React from "react";
import axios from "axios";
import "./Account.css";
import { useEffect } from "react";
import { useContextProvider } from "../../Provider";
import UserJob from "./userJob";
import UserFavs from "./UserFavs";
import {languages} from "../../constants"

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
      // .then((res) => setUser(res.data))
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="wrapper-user">
      <div className="user-profile">
        <div className="user-container">
          <div>
            <img
              className="user-avatar"
              src={user.image_url}
              alt="User Avatar"
            />
          </div>
          <div className="profile-header">
            <h2>Username: {user.username}</h2>
            <p>
              <b>Email: </b>
              {user.email}
            </p>
            {/* </div> */}
            {/* <div className="profile-body"> */}
            <p>
              <b>Address: </b>
              {user.address}
            </p>
            <p>
              <b>Native Language: </b>
              {languages[user.native_language]}

            </p>
          </div>
        </div>

        <div className="user-job-profile">
          <UserFavs />
          {/* <UserJob /> */}
        </div>
      </div>
    </div>
  );
}
