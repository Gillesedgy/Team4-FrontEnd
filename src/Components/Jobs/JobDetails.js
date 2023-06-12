import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./jobDetails.css";
import Contact from "../../Features/Contact";
import Recommended from "./Recommended";
import MapContainer from "../../Features/MapContainer";

import jobImage from "../../Assets/logoJobImage.jpg";
import Starred from "../../Features/Starred";
//
const API = process.env.REACT_APP_API_URL;

export default function JobDetails({ handleAddressSubmit }) {
  const [jobs, setJobs] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [recommended, setRecommended] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/jobs/${id}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        setRecommended(res.data);
      })
      .catch((error) => console.warn(error));
  }, []); // Fetching for similar jobs

  const filtered = recommended.filter((rec) => {
    return rec.skills === jobs.skills && rec.id !== jobs.id;
  });
  //
  const deleteJob = () => {
    axios
      .delete(`${API}/jobs/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(
        () => {
          navigate(`/jobs`);
        },
        (error) => console.log(error)
      )
      .catch((error) => console.warn(error));
  };
  //map view
  const handleToggle = () => {
    setShowMap(!showMap);
  };
  //
  let dateMade = new Date(jobs.posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  // Logo handler
  const logoImage = jobs.logo ? jobs.logo : jobImage;
  return (
    <div className="job-page-whole">
      <div className="page-container">
        <button className="back-button-top" onClick={() => navigate(`/jobs`)}>
          Back
        </button>
        {/* // Top ----- */}
        <p className="date p1">
          Posted Date:
          <span>
            {middle}, {year}
          </span>
        </p>
        <div className="details-icon">
          {<img src={logoImage} alt="job-icon" />}{" "}
        </div>
        <div className="top job-details-body">
          <div className="job-title-star">
            <h2 className="job-title">{jobs.job_title}</h2>{" "}
            <Starred className="heart_button star" jobId={jobs.id} />
          </div>
          <p className="company p1">
            <strong>Company:</strong>
            <span>{jobs.company}</span>
          </p>
          <p className="email p1">
            <strong>Email:</strong>
            <span> {jobs.email}</span>
          </p>
          <p className="location p1">
            <strong>Location:</strong>
            <span>{jobs.location}</span>
          </p>
          <p className="job-type p1">
            <strong>Job Type:</strong>
            <span>{jobs.job_type}</span>
          </p>
          <p className="salary p1">
            <strong>Salary:</strong>
            <span> $ {jobs.salary}/hr</span>
          </p>
          <p className="native-language p1">
            <strong>Native Language:</strong>
            <span>{jobs.native_language}</span>
          </p>
          <div className="center">
            <div className="skill">
              <strong>Skills:</strong> <span> {jobs.skills}</span>{" "}
            </div>
            <p className="divide"> </p>
            <div className="requirement">
              <strong>Requirements:</strong> <span>{jobs.requirements}</span>{" "}
            </div>{" "}
          </div>
          <p className="description-label p1">
            <strong>Description</strong>
          </p>
          <p className="description">{jobs.description}</p>
          <br />
          <hr />

          {/* //!BUTTONS -----  */}
          {localStorage.getItem("user_id") === String(jobs.user_id) ? (
            <div className="buttons-container">
              <button
                className="button"
                onClick={() => navigate(`/jobs/${id}/edit`)}
                type="submit"
              >
                Edit
              </button>{" "}
              <button className="button" type="submit" onClick={deleteJob}>
                Delete
              </button>
            </div>
          ) : null}
        </div>
        {/* //!MIDDLE ----- */}
        <p>
          <button className="show-button button" onClick={handleToggle}>
            {showMap ? "Hide Map" : "View on map"}
          </button>
        </p>
        {showMap && (
          <div className="middle map-container">
            <MapContainer
              handleAddressSubmit={handleAddressSubmit}
              location={jobs.location}
            />
          </div>
        )}
        {/* //! BOTTOM ---Contact / Recs*/}

        <div className="bottom">
          <div className="contact-rec-container">
            <div className="recommended-container">
              <h3>Recommended</h3>
              {filtered.map((rec) => {
                return <Recommended key={rec.id} rec={rec} />;
              })}
            </div>
            <div className="contact-container">
              <h3>Contact</h3>
              <Contact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
