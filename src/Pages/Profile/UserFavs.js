import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Fav from "./Fav";

const API = process.env.REACT_APP_API_URL;

export default function UserFavs() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/users/favorites`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="favorites">
      <h3>Favorites</h3>
      {favorites.map((fav) => {
        return <Fav id={fav.id} fav={fav} />;
      })}
    </div>
  );
}
