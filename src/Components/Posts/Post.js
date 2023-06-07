import React from "react";
import { Link } from "react-router-dom";
import "./Pinterest.css";

export default function Post({
  post: { id, post_title, post_content, image_url, created_at, updated_at },
  postSize,
}) {
  let date = new Date(created_at);
  date = date.toDateString();
  let day = date.split(" ").splice(2, 1);
  let year = date.split(" ").pop();
  let month = date.split(" ").splice(1, 1);
  date = month + " " + day + ", " + year;

  return (
    <div className={`post ${postSize}`} key={id}>
      {image_url ? (
        <Link to={`/communityBoard/${id}`}>
          <img src={image_url} alt={image_url} className="postImg" />
        </Link>
      ) : (
        <Link to={`/communityBoard/${id}`}>
          <p className={`post ${postSize}`} key={id}>
            {post_content}
          </p>
        </Link>
      )}
      <div className="post-title">
        <h4>{post_title}</h4>
      </div>
    </div>
  );
}
