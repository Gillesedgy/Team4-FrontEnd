import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

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
    <div className="community_board_posts">
      <h3>Community Board</h3>
      <button onClick={() => navigate(`/communityBoard/new`)}>New Post</button>
      {posts.map((post) => {
        return <Post key={post.id} post={post} />;
      })}
    </div>
  );
}
