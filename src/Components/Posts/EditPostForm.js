import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./PostForms.css";

const API = process.env.REACT_APP_API_URL;

export default function EditPostForm() {
  const [post, setPost] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const updatePost = (updatedPost) => {
    axios
      .put(`${API}/communityBoard/${id}`, updatedPost, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
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

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Chinese", label: "Chinese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Hindi", label: "Hindi" },
    { value: "Korean", label: "Korean" },
    { value: "Arabic", label: "Arabic" },
    { value: "Japanese", label: "Japanese" },
    { value: "Creole", label: "Creole" },
    { value: "Filipino", label: "Filipino" },
    { value: "Urdu", label: "Urdu" },
  ];

  const handleSelectChange = (e) => {
    let selected = e.target.value;
    setPost({ ...post, native_language: selected });
  };

  return (
    <div className="post_form">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <img className="post_image" src={post.image_url} alt={post.image_url} />
        <label>Title: </label>
        <input
          type="text"
          id="post_title"
          value={post.post_title}
          onChange={handleTextChange}
          required
        />

        <br />
        <label>Post: </label>
        <textarea
          type="text"
          id="post_content"
          value={post.post_content}
          onChange={handleTextChange}
          required
          style={{ fontFamily: "Helvetica" }}
        />

        <br />
        <label>Image: </label>
        <input
          type="url"
          id="image_url"
          value={post.image_url}
          onChange={handleTextChange}
        />
        <label>Native Language: </label>
        <select
          id="native_language"
          value={post.native_language}
          onChange={handleSelectChange}
          required
        >
          <option value="">Select a language</option>
          {languages.map((language) => (
            <option value={language.value} key={language.value}>
              {language.label}
            </option>
          ))}
        </select>
        <div className="form-button-container">
          {" "}
          <button className="button_edit post_button" type="submit">
            Submit!
          </button>
          <button
            className="button_edit post_button"
            onClick={() => navigate(`/communityBoard/${id}`)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
