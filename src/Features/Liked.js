import React, { useState, useEffect } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Liked({ listingId }) {
  const [liked, setLiked] = useState([]);

  const userId = localStorage.getItem("user_id");

  const [newFav, setNewFav] = useState({
    listing_id: null,
    user_id: null,
  });

  const handleLike = (newFav) => {
    axios
      .post(`/${API}/favorites/new-listing`, newFav, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        console.log("boop");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/favorites/listings`)
      .then((res) => {
        console.log(res.data);
        setLiked(res.data);
      })
      .catch((error) => console.error(error));
  }, [userId]);

  function handleAddLike() {
    console.log(listingId, "listingId");
    console.log("userId", localStorage.getItem("user_id"));
    setNewFav({
      listing_id: +listingId,
      user_id: +localStorage.getItem("user_id"),
    });
    handleLike(newFav);
  }

  const find = liked.filter((listing) => listing.id === listingId);

  // if a user already liked a listing, the heart will be shaded in. we get this info by doing a separate axios call, checking if the listing_id exists in the user favorites array. if yes, shaded in, if no, shaded out.

  return (
    <div className="like_container">
      {console.log(find, "find!!")}

      <button onClick={handleAddLike}>
        {find.length > 0 ? (
          <BsSuitHeartFill
            style={{
              backgroundColor: "none",
              color: "red",
              fontSize: "2em",
            }}
          />
        ) : (
          <BsSuitHeart
            style={{
              backgroundColor: "none",
              color: "red",
              fontSize: "2em",
            }}
          />
        )}
      </button>
    </div>
  );
}
