import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  //Todo: Try to make map work in its own Component

  //*--------------------------------------------------
  return (
    <div className="job-details">
      <Search
        addressConverter={addressConverter}
        handleAddressSubmit={handleAddressSubmit}
        lat={latitude}
        lng={longitude}
      />
      <div className="map-container">
        <MapContainer
          handleAddressSubmit={handleAddressSubmit}
          addressConverter={addressConverter}
          // latitude={latitude}
          // longitude={longitude}
        />
      </div>
      <p className="date">
        <strong>Posted Date:</strong> {jobs.posted_date}
      </p>
      <div className="job-details-body">
        {" "}
        <p>{jobs.job_title}</p>
        <p>
          <strong>Favorite:</strong> {jobs.is_favorite ? "<3" : null}
        </p>
        <p>
          <strong>Company:</strong> {jobs.company}
        </p>
        <p>
          <strong>Email:</strong> {jobs.email}
        </p>
        <p>
          <strong>Location:</strong> {jobs.location}
        </p>
        <p>
          <strong>Job Type:</strong> {jobs.job_type}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{jobs.description}</p>
        <p>
          <strong>Native Language:</strong> {jobs.native_language}
        </p>
      </div>
      <div className="delete-button">
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
  );
}
