import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PostForms.css";
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

  const onChange = (e) => {
    async function fileToBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader(); // built in function
        reader.readAsDataURL(file); // methods that reads the file and turns it into data uri
        reader.onload = () => resolve(reader.result); // if file is read resolve with the uri
        reader.onerror = (error) => reject(error); // if the file fails to be read reject with the error
      });
    }

    fileToBase64(e.target.files[0]).then((uri) => {
      setPost({ ...post, image_url: uri });
    });
  };

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
    <div className="post_form_container">
      <div className="post_form">
        <h2>New Post</h2>
        <form onSubmit={handleSubmit}>
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

          <label htmlFor="image_url">Post Picture: </label>
          <input
            className="file"
            id="image_url"
            type="file"
            accept=".png, .jpg, .jpeg"
            placeholder="Post Picture"
            onChange={onChange}
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
            <button
              className="button_edit post_button"
              onClick={() => navigate(`/communityBoard`)}
            >
              Back
            </button>
            <button className="button_edit post_button" onClick={handleSubmit}>
              Submit!
            </button>{" "}
          </div>
        </form>
      </div>
    </div>
  );
}
