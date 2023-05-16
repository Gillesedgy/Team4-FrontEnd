import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

export default function PostDetails() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/discussions/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  let dateMade = new Date(post.created_at);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");

  let dateUpdated = new Date(post.updated_at);
  dateUpdated = dateUpdated.toDateString();
  let updatedYear = dateUpdated.split(" ").pop();
  let updatedMid = dateUpdated.split(" ").splice(1, 2).join(" ");

  const deletePost = () => {
    axios
      .delete(`${API}/discussions/${id}`)
      .then(() => {
        navigate(`/communityBoard`);
      })
      .catch((error) => console.warn(error));
  };

  return (
    <div className="post_details">
      <div className="post_details_body">
        <h3>{post.post_title}</h3>
        <h5>
          Last Updated on: {updatedMid}, {updatedYear}
        </h5>
        <h5>
          Created on: {middle}, {year}
        </h5>

        <img src={post.image_url} alt={post.image_url} />

        <p>{post.post_content}</p>
      </div>
      <div className="post_details_buttons">
        <button onClick={() => navigate(`/communityBoard`)}>Back</button>
        <button onClick={() => navigate(`/communityBoard/${id}/edit`)}>
          Edit
        </button>
        <button onclick={deletePost}>Delete!</button>
      </div>
    </div>
  );
}
