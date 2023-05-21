import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function EditPostForm() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const updatePost = (updatedPost) => {
    axios
      .put(`${API}/communityBoard/${id}`, updatedPost)
      .then(
        () => {
          navigate(`/communityBoard/${id}`);
        },
        (err) => console.log(err)
      )
      .catch((err) => console.warn(err));
  };

  const handleTextChange = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    axios
      .get(`${API}/communityBoard/${id}`)
      .then(
        (res) => setPost(res.data),
        (err) => navigate(`/error`)
      )
      .catch((err) => console.warn(err));
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePost(post);
  };

  return (
    <div className="post_form">
      <h3>Edit Post</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            id="post_title"
            value={post.post_title}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <label>
          Post:
          <textarea
            type="text"
            id="post_content"
            value={post.post_content}
            onChange={handleTextChange}
            required
            style={{ fontFamily: "Helvetica" }}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="url"
            id="image_url"
            value={post.image_url}
            onChange={handleTextChange}
          />
        </label>
        <button type="submit">Submit!</button>
      </form>
    </div>
  );
}
