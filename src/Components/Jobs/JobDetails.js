import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./jobDetails.css";
import Contact from "../../Features/Contact";
import Recommended from "./Recommended";
import MapContainer from "../../Features/MapContainer";
//
import Job from "./Job"; //? imported to pass icon state
import { handleIcons } from "../../Features/helper";

const API = process.env.REACT_APP_API_URL;

export default function JobDetails({ handleAddressSubmit }) {
  const [jobs, setJobs] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [recommended, setRecommended] = useState([]); // Recommended Jobs

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
  return (
    <>
      <div className="page-container">
        {/*  */}
        {/* //!LEFT ----- */}
        <p className="date p1">
          Posted Date:
          <span>
            {middle}, {year}
          </span>
        </p>
        <div className="details-icon">
          {<img src={handleIcons()} alt="job-icon" />}
        </div>
        <p className="is_favorite p1">
          <p>{jobs.is_favorite ? "❤️" : "not liked"}</p>
          <span>{jobs.is_favorite}</span>
        </p>
        <div className="top job-details-body">
          <h2 className="job-title">{jobs.job_title}</h2>

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
          {/* //!BUTTONS -----  */}
          {localStorage.getItem("user_id") === String(jobs.user_id) ? (
            <div className="buttons-container">
              <button className="button" type="submit" onClick={deleteJob}>
                Delete
              </button>
              <button
                className="button"
                onClick={() => navigate(`/jobs/${id}/edit`)}
                type="submit"
              >
                Edit
              </button>
              <button
                className="button"
                onClick={() => navigate(`/jobs`)}
                type="submit"
              >
                Back
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
      </div>
      {/* //! BOTTOM ---Contact / Recs*/}

      <div className="bottom">
        <div className="contact-rec-container">
          <div className="recommended-container">
            <h3>Recommended</h3>
            {filtered.map((rec) => {
              return (
                <Recommended key={rec.id} rec={rec} icon={handleIcons()} />
              );
            })}
          </div>
          <div className="contact-container">
            <h3>Contact</h3>
            <Contact />
          </div>
        </div>
      </div>
    </>
  );
}
