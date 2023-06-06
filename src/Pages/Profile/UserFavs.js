import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Fav from "./Fav";

const API = process.env.REACT_APP_API_URL;

export default function UserFavs() {
  const [favorites, setFavorites] = useState([]);

  const [starred, setStarred] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/favorites/listings`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setFavorites(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${API}/favorites/jobs`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log(res.data);
        setStarred(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="saved_container">
      <div className="favorites">
        <h3>Favorite Listings</h3>
        {favorites.length > 0
          ? favorites.map((fav) => {
              return <Fav id={fav.id} fav={fav} />;
            })
          : null}
      </div>
      <div className="starred_stuff">
        <h3>Starred Jobs</h3>
        {starred.length > 0
          ? starred.map((fav) => {
              return <li key={fav.id}>{fav.job_title}</li>;
            })
          : null}
      </div>
    </div>
  );
}
