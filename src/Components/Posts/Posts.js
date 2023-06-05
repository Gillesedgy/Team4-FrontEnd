import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
// import "./post.css";
import { GrAdd } from "react-icons/gr";
import "./Pinterest.css";

const API = process.env.REACT_APP_API_URL;

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  // let size = "large"
  const getRandomSize = () => {
    const sizes = [ 'small', 'medium', 'large' ];
    return sizes[Math.floor(Math.random() * sizes.length)]
  }



  useEffect(() => {
    axios
      .get(`${API}/communityBoard`)
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="Posts-container">
      <main>
        <div className="searchBox">
          <input type="text" placeholder="Search.." />
          <button
            className="add-btn-comunity"
            onClick={() => navigate(`/communityBoard/new`)}
          >
            <GrAdd />
          </button>
        </div>
     
    <div className="mainContainer">
        {posts.map((post) => {
          
              // if(size === "small"){
              //   size ='medium'
              //  }else if(size === "medium"){
              //   size = "large"
              // }else if(size === "large"){
              //   size = 'small'
              //  }
              //  console.log(size)
               return <Post key={post.id} post={post} postSize={getRandomSize()} />;

        })}
    </div>
      </main>

      <div className="menuContainer">
        <h1 className="resource-title">Resources</h1>
        <div className="resource-body">
          hello there 
        </div>
      </div>
    </div>
  );
}

