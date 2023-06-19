/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Post from "./Post";
import "./resources.css";
import { GrAdd } from "react-icons/gr";
import "./Pinterest.css";
// import { getSiteTranslations } from "../../utils";
// import { pages } from "../../constants";
// import content from "../../content";

const API = process.env.REACT_APP_API_URL;

export default function Posts() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [searchPosts, setSearchPosts] = useState([]);
  const [translatedResources, setTranslatedResources] = useState(null);
  const [resources, setResources] = useState([
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
  ]);

  // let size = "large"
  const getRandomSize = () => {
    const sizes = ["small", "medium", "large"];
    return sizes[Math.floor(Math.random() * sizes.length)];
  };
  useEffect(() => {
    axios
      .get(`${API}/communityBoard`)
      .then((res) => {
        const recent = res.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setPosts(recent);
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

  // useEffect(() => {
  //   if(!translatedResources) {
  //     const translations = getSiteTranslations(pages.COMMUNITY_PAGE)
  //     setTranslatedResources(translations)
  //   }
  // }, [translatedResources])

  // useEffect(() => {
  //   if(translatedResources) {
  //     const mappedResources = resources.map((resource, index) => {
  //       return {...resource, name: translatedResources.resources[index].name}
  //     })
  //     setResources(mappedResources)
  //   }
  // }, [translatedResources])

  const cardColors = ["#B2BEB5", "#C0C0C0", "#A9A9A9", "#D3D3D3", "#E5E4E2"];
  //!----------------------------------------------------------------
  return (
    <div className="Posts-container">
      <main>
        <div className="searchBox">
          <input
            onChange={handleSearch}
            type="search"
            placeholder={
              translatedResources?.searchBarPlaceholderText || "Search..."
            }
          />
          {localStorage.getItem("user_id") ? (
            <button
              className="add-btn-comunity"
              onClick={() => navigate(`/communityBoard/new`)}
            >
              <GrAdd />
            </button>
          ) : null}
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
