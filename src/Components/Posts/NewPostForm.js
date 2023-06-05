import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

export default function NewPostForm() {
  const navigate = useNavigate();

  const [post, setPost] = useState({
    post_title: "",
    post_content: "",
    image_url: "",
    created_at: new Date(),
    updated_at: new Date(),
    native_language: "",
  });

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

  const handleTextChange = (e) => {
    setPost({ ...post, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    let selected = e.target.value;
    setPost({ ...post, native_language: selected });
  };

  const addPost = (newPost) => {
    axios
      .post(`${API}/communityBoard`, newPost, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(
        () => {
          navigate(`/communityBoard`);
        },
        (err) => console.log(err)
      )
      .catch((error) => console.warn(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPost(post);
  };

  return (
    <div className="post_form">
      <h3>New Post</h3>
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
        <br />
        <label>
          Native Language:
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
        </label>
        <br />
        <button onClick={handleSubmit}>Submit!</button>
      </form>
      <button onClick={() => navigate(`/communityBoard`)}>Go back</button>
    </div>
  );
}
