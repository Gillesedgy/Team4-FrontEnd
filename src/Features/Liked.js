import React, { useState, useEffect } from "react";
import { BsSuitHeart } from "react-icons/bs";
import { BsSuitHeartFill } from "react-icons/bs";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Liked({ listingId }) {
  const [liked, setLiked] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  const userId = localStorage.getItem("user_id");

  const newFav = {
    listing_id: listingId,
    user_id: userId,
  };

  const handleLike = (newFav) => {
    axios
      .post(`${API}/favorites/new-listing`, newFav, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setIsLiked(true);
      })
      .catch((error) => console.error(error));
  };

  const handleUnlike = (newFav) => {
    axios
      .delete(`${API}/favorites/listings/${listingId}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
        data: newFav,
      })
      .then(() => {
        setIsLiked(false);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/favorites/listings`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setLiked(res.data);
        console.log("setting first", liked);
      })
      .catch((error) => console.error(error));
  }, [userId, listingId, isLiked]);

  useEffect(() => {
    let isListingLiked;
    liked.length > 0
      ? (isListingLiked = liked.find((listing) => listing.id == listingId))
      : setIsLiked(false);
    isListingLiked ? setIsLiked(true) : setIsLiked(false);
  }, [liked]);

  function handleToggleLike() {
    if (isLiked) {
      handleUnlike(newFav);
    } else {
      handleLike(newFav);
    }
  }

  function handleAddLike() {
    handleLike(newFav);
    console.log("newfav", newFav);
  }

  return (
    <div className="like_container">
      <button onClick={handleToggleLike} style={{ border: "none" }}>
        {console.log(liked)}
        {isLiked ? (
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
