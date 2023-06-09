import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function Comment({
  comment: { comment_body, created_at, id, commenter_name, user_id },
  postId,
}) {
  const deleteComment = () => {
    axios
      .delete(`${API}/communityBoard/${postId}/comments/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(() => {
        console.log("Comment deleted successfully");
        window.location.reload();
      })
      .catch((error) => console.warn(error));
  };

  let dateMade = new Date(created_at);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <div className="post_comments">
      <p className="comment_date">
        {middle} {year}
      </p>
      <h4 style={{ marginBottom: "1em", color: "orange" }}>{commenter_name}</h4>
      <p className="comment_body">{comment_body}</p>
      {console.log(localStorage.getItem("user_id"))}

      {+localStorage.getItem("user_id") === +user_id ? (
        <div className="delete-comment">
          <button onClick={deleteComment}>Delete</button>
        </div>
      ) : null}
    </div>
  );
}
