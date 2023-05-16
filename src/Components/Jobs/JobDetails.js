import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./jobDetails.css";
//* --------Map---------------
import { addressConverter } from "../../Features/helper";
import Search from "../../Features/Search";
import MapContainer from "../../Features/MapContainer";
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function JobDetails({
  latitude,
  longitude,
  handleAddressSubmit,
}) {
  const [jobs, setJobs] = useState([]);
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

  // Delete
  const deleteJob = () => {
    axios
      .delete(`${API}/jobs/${id}`)
      .then(
        () => {
          navigate(`/jobs`);
        },
        (error) => console.log(error)
      )
      .cath((error) => console.warn(error));
  };
  // Date format
  let dateMade = new Date(jobs.posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <div className="job-details">
      <div className="map-container">
        <MapContainer
          handleAddressSubmit={handleAddressSubmit}
          addressConverter={addressConverter}
          // latitude={latitude}
          // longitude={longitude}
        />
      </div>
      <div className="job-page">
        <div className="left-aside">
          <p>Job suggestions or any other content</p>
        </div>
        <div className="job-details-body">
          <p className="date">
            <strong>Posted Date:</strong> {middle}, {year}
          </p>
          <p className="job-title">{jobs.job_title}</p>
          <p className="favorite">
            <strong>Favorite:</strong>{" "}
            {jobs.is_favorite ? <span>&#10084;</span> : null}
          </p>
          <p className="company">
            <strong>Company:</strong> {jobs.company}
          </p>
          <p className="email">
            <strong>Email:</strong> {jobs.email}
          </p>
          <p className="location">
            <strong>Location:</strong> {jobs.location}
          </p>
          <p className="job-type">
            <strong>Job Type:</strong> {jobs.job_type}
          </p>
          <p className="description">
            <strong>Description:</strong>
          </p>
          <p>{jobs.description}</p>
          <p className="native-language">
            <strong>Native Language:</strong> {jobs.native_language}
          </p>
          <div className="button">
            <button type="submit" onClick={deleteJob}>
              Delete
            </button>
            <button onClick={() => navigate(`/jobs/${id}/edit`)} type="submit">
              Edit
            </button>
            <button onClick={() => navigate(`/jobs`)} type="submit">
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
