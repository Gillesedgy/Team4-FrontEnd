import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import "./post.css";
import { GrAdd } from "react-icons/gr";

const API = process.env.REACT_APP_API_URL;

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/discussions`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="posts">
      <div className="community-board-title">      
        <h3>Community Board </h3>

        {" "}
        <button
          className="add-btn-comunity"
          onClick={() => navigate(`/communityBoard/new`)}
        >
          <GrAdd /> Add new
        </button>
      </div>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
