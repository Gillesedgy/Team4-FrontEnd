import React, { useState, useEffect } from "react";

import axios from "axios";
import Comment from "./Comment";
import "./comments.css";
//
const API = process.env.REACT_APP_API_URL;

export default function Comments({ postId }) {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/communityBoard/${postId}/comments`)
      .then((res) => {
        console.log("DATA:", res.data);
        setComments(res.data);
      })
      .catch((err) => console.warn(err));
  }, [postId]);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const displayedComments = showComments ? comments : comments.slice(0, 3);

  return (
    <div className="comments">
      {displayedComments.map((comment) => (
        <Comment postId={postId} comment={comment} key={comment.id} />
      ))}

      {comments.length > 3 && (
        <div className="show-more-button">
          {" "}
          <button className="showMore" onClick={handleToggleComments}>
            {showComments ? "Show less comments" : "Show more comments"}
          </button>
        </div>
      )}
    </div>
  );
}
