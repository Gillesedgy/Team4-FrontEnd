import React, { useState, useContext } from "react";
import axios from "axios";
import "./commentForm.css";
import { ContextData } from "../../Provider";
const API = process.env.REACT_APP_API_URL;

export default function NewCommentForm({ postId }) {
  const [comment, setComment] = useState("");
  const { username } = useContext(ContextData);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(
        `${API}/communityBoard/${postId}/comments`,
        {
          comment_body: comment,
        },
        {
          headers: {
            authorization: localStorage.getItem("jwtToken"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setComment("");
        window.location.reload();
      })
      .catch((err) => console.warn(err));
  };
  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your comment..."
          required
        ></textarea>
        <div className="comment-button-container">
          <button className="post-comment" type="submit">
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}
