import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
const API = process.env.REACT_APP_API_URL;

export default function NewCommentForm() {
  const [comment, setComment] = useState("");
  const { commentId } = useParams();
  const navigate = useNavigate();
  axios
    .post(`${API}//communityBoard/${commentId}`, { comment })
    .then((res) => {
      console.log(res.data);
      setComment("");
    })
    .catch((err) => console.warn());

  const handleSubmit = (e) => {
    e.event.preventDefault();
  };
  // axios.delete(`${API}//communityBoard/${id}`, {

  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Write your comment..."
          required
        ></textarea>
        <div className="comment-button-container">
          <button type="submit">Post Comment</button>{" "}
          <button
            onClick={() => navigate(`/communityBoard`)}
            className="comment_button"
            type="submit"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
