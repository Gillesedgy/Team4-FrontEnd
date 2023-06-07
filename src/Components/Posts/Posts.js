import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import "./resources.css";
import { GrAdd } from "react-icons/gr";
import "./Pinterest.css";

const API = process.env.REACT_APP_API_URL;

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);

  // let size = "large"
  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };
  useEffect(() => {
    axios
      .get(`${API}/communityBoard`)
      .then((res) => {
        setPosts(res.data);
        setSearchPosts(res.data);
        console.log(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);
  //! ---------------Handle Search Functionality---------------------
  const handleSearch = (event) => {
    event.preventDefault();

    if (event.target.value) {
      setSearchPosts(
        posts.filter((post) =>
          post.post_title
            .toLowerCase()
            .includes(event.target.value.toLowerCase())
        )
      );
    } else {
      setSearchPosts(posts);
    }
  };
  //?----------------------Resources-------------------------------
  const resources = [
    {
      name: "New York City Employment Services",
      link: "https://www1.nyc.gov/site/sbs/careers/employment-services.page",
    },
    { name: "Upwardly Global", link: "https://www.upwardlyglobal.org" },
    { name: "New York Public Library", link: "https://www.nypl.org" },
    { name: "Literacy Assistance Center", link: "https://www.lacnyc.org" },
    { name: "NYC Housing Connect", link: "https://www.nyc.gov/housingconnect" },
    {
      name: "Catholic Charities Community Services",
      link: "https://www.catholiccharitiesny.org",
    },
    {
      name: "New York Legal Assistance Group (NYLAG)",
      link: "https://www.nylag.org",
    },
    {
      name: "Immigrant Defense Project",
      link: "https://www.immigrantdefenseproject.org",
    },
    {
      name: "English Language Conversation Groups",
      link: "https://www.meetup.com",
    },
    {
      name: "We Are New York",
      link: "https://www.nyc.gov/html/weareny/html/home/home.shtml",
    },
    {
      name: "New York City Mayor's Office of Immigrant Affairs",
      link: "https://www1.nyc.gov/site/immigrants/index.page",
    },
    {
      name: "Supplemental Nutrition Assistance Program (SNAP)",
      link: "https://www.ny.gov/services/apply-snap",
    },
    {
      name: "Women, Infants, and Children (WIC)",
      link: "https://www.nyc.gov/wic",
    },
  ];
  const cardColors = ["#739CAE", "#8BAEA8", "#D07F7B", "#E4C17B", "#86B1B8"];
  //!----------------------------------------------------------------
  return (
    <div className="Posts-container">
      <main>
        <div className="searchBox">
          <input onChange={handleSearch} type="search" placeholder="Search.." />
          <button
            className="add-btn-comunity"
            onClick={() => navigate(`/communityBoard/new`)}
          >
            <GrAdd />
          </button>
        </div>

        <div className="mainContainer">
          {searchPosts.map((post) => {
            // if(size === "small"){
            //   size ='medium'
            //  }else if(size === "medium"){
            //   size = "large"
            // }else if(size === "large"){
            //   size = 'small'
            //  }
            //  console.log(size)
            return (
              <Post key={post.id} post={post} postSize={getRandomSize()} />
            );
          })}
        </div>
      </main>

      <div className="menuContainer">
        <div className="resource-body">
          <h2 className="resource-title">Resources</h2>
          <ul className="resource-list">
            {resources.map((resource, index) => (
              <li
                className="resource-card"
                key={index}
                style={{
                  backgroundColor: cardColors[index % cardColors.length],
                }}
              >
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {resource.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
