import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
//* --------Map---------------
import { GoogleMap, Marker } from "@react-google-maps/api";
import Search from "../../Features/Search";
import { useLoadScript } from "@react-google-maps/api";
// import Map from "../../Features/Map";
// import MapView from "../../Features/MapView";
//* -------------------------------------------
// API
const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
const API = process.env.REACT_APP_API_URL;

export default function JobDetails() {
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
  //* ---------------------MAP---------------------------
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  useEffect(() => {
    const centered = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
        },
        (error) => {
          console.log("Error getting your current position: " + error.message);
        }
      );
    };
    centered();
  }, []);

  const addressConverter = (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, function (results, status) {
        if (
          status === window.google.maps.GeocoderStatus.OK &&
          results.length > 0
        ) {
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          setLongitude(lng);
          setLatitude(lat);
          resolve({ lat, lng });
        } else {
          reject("Address not found!");
        }
      });
    });
  };

  const handleAddressSubmit = (address) => {
    addressConverter(address)
      .then((coords) => {
        setLatitude(coords.lat);
        setLongitude(coords.lng);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const gKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
  // allows us to see if the map is loaded
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: gKey,
  });
  //*--------------------------------------------------
  return (
    <div className="job-details">
      <Search
        addressConverter={handleAddressSubmit}
        lat={latitude}
        lng={longitude}
      />
      <div className="map-container">
        {" "}
        {!isLoaded ? (
          <p> Map Error, check address again</p>
        ) : (
          <GoogleMap
            zoom={15}
            center={{ lat: latitude, lng: longitude }}
            mapContainerStyle={{ height: "100%", width: "100%" }}
          >
            <Marker size={33} position={{ lat: latitude, lng: longitude }} />
          </GoogleMap>
        )}
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
