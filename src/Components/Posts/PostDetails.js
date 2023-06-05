import React from "react";
import axios from "axios";
import "./postDetails.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewCommentForm from "../Comments/NewCommentForm";
import Comments from "../Comments/Comments";
const API = process.env.REACT_APP_API_URL;

export default function PostDetails() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/communityBoard/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  const deletePost = () => {
    axios
      .delete(`${API}/communityBoard/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(() => {
        navigate(`/communityBoard`);
      })
      .catch((error) => console.warn(error));
  };
  let dateMade = new Date(post.created_at);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");

  let dateUpdated = new Date(post.updated_at);
  dateUpdated = dateUpdated.toDateString();
  let updatedYear = dateUpdated.split(" ").pop();
  let updatedMid = dateUpdated.split(" ").splice(1, 2).join(" ");

  return (
    <div className="centered-content">
      <div className="post_details">
        <div className="back-button-container">
          <button
            onClick={() => navigate(`/communityBoard`)}
            className="comment_button"
            type="submit"
          >
            Back
          </button>
        </div>
        <div className="post_card">
          <img
            className="post_image"
            src={post.image_url}
            alt={post.image_url}
          />
          {/* <p>
            Last Updated on: {updatedMid}, {updatedYear}
          </p> */}
          <p>
            Posted on: {middle}, {year}
          </p>
          <div className="post_details_body">
            <h3>{post.post_title}</h3>

            <p>{post.post_content}</p>
          </div>
        </div>
        {localStorage.getItem("user_id") === String(post.user_id) ? (
          <div className="post_details_buttons">
            <button onClick={() => navigate(`/communityBoard`)}>Back</button>
            <button onClick={() => navigate(`/communityBoard/${id}/edit`)}>
              Edit
            </button>
            <button onClick={deletePost}>Delete!</button>
          </div>
        ) : null}
        <hr />
        <NewCommentForm />

        <hr />
        {/* Comments pass id as props to render comments */}
        <Comments postId={id} />
      </div>
    </div>
  );
}
