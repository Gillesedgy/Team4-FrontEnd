import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Fav from "./Fav";
import Star from "./Star";

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
      <h3 className="favorites_container_title">Favorite Listings</h3>
      <div className="favorites_container">
        {favorites.length > 0
          ? favorites.map((fav) => {
              return <Fav id={fav.id} fav={fav} />;
            })
          : null}
      </div>
      <h3 className="starred_container_title">Starred Jobs</h3>
      <div className="starred_stuff">
        {starred.length > 0
          ? starred.map((star) => {
              return <Star key={star.id} star={star} />;
            })
          : null}
      </div>
    </div>
  );
}
