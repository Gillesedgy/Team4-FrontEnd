import React, { useState } from "react";
import axios from "axios";
import "./commentForm.css";
import { useParams, useNavigate } from "react-router";
const API = process.env.REACT_APP_API_URL;

export default function NewCommentForm() {
  const [comment, setComment] = useState("");
  const { commentId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API}/communityBoard/${commentId}/comments`, {
        comment_body: comment,
      })
      .then((res) => {
        console.log(res.data);
        setComment("");
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
          </button>{" "}
        </div>
      </form>
    </div>
  );
}
