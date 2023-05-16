import React from "react";
import { Link } from "react-router-dom";

export default function Post({
  post: { id, post_title, post_content, image_url, created_at, updated_at },
}) {
  let date = new Date(created_at);
  date = date.toDateString();
  let day = date.split(" ").splice(2, 1);
  let year = date.split(" ").pop();
  let month = date.split(" ").splice(1, 1);
  date = month + " " + day + ", " + year;

  return (
    <Link to={`/communityBoard/${id}`}>
      <div className="post">
        <h4>{post_title}</h4>
        <img src={image_url} alt={image_url} />
        <p>{post_content}</p>
        <p>{date}</p>
      </div>
    </Link>
  );
}
