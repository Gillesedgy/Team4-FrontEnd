import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsStarFill } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

const API = process.env.REACT_APP_API_URL;

export default function Starred({ jobId }) {
  const [starred, setStarred] = useState([]);
  const [isStarred, setIsStarred] = useState(false);

  const userId = localStorage.getItem("user_id");

  const newFav = {
    job_id: jobId,
    user_id: userId,
  };

  const handleLike = (newFav) => {
    axios
      .post(`${API}/favorites/new-job`, newFav, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(() => {
        setIsStarred(true);
      })
      .catch((error) => console.error(error));
  };

  const handleUnlike = (newFav) => {
    axios
      .delete(`${API}/favorites/jobs/${jobId}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
        data: newFav,
      })
      .then(() => {
        setIsStarred(false);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/favorites/jobs`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setStarred(res.data);
        console.log(starred);
      })
      .catch((error) => console.error(error));
  }, [userId, jobId, isStarred]);

  useEffect(() => {
    let isJobStarred;
    starred.length > 0
      ? (isJobStarred = starred.some((job) => job.id == jobId))
      : (isJobStarred = false);

    setIsStarred(isJobStarred);
  }, [starred]);

  function handleToggleLike() {
    if (isStarred) {
      handleUnlike(newFav);
    } else {
      handleAddLike(newFav);
    }
  }

  function handleAddLike() {
    handleLike(newFav);
  }

  return (
    <div className="star_container">
      <button onClick={handleToggleLike} style={{ border: "none" }}>
        {isStarred ? (
          <BsStarFill
            style={{
              backgroundColor: "none",
              color: "orange",
              fontSize: "2em",
            }}
          />
        ) : (
          <BsStar
            style={{
              backgroundColor: "none",
              color: "orange",
              fontSize: "2em",
            }}
          />
        )}
      </button>
    </div>
  );
}
