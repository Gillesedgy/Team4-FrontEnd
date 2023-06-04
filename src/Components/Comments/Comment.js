import React from "react";

export default function Comment({
  comment: { comment_body, created_at, updated_at },
}) {
  return (
    <div className="post_comments">
      <p>{created_at}</p>
      <p>{comment_body}</p>
      <p>{updated_at}</p>
    </div>
  );
}
