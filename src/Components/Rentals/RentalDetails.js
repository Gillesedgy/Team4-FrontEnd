import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./RentalDetails.css";
//* --------Map---------------
import MapContainer from "../../Features/MapContainer";
// import { useLoadScript } from "@react-google-maps/api"; // this is needed to make sure the map loads correctly
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function RentalDetails() {
  const [rental, setRental] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);

  const fullText = rental.description;
  const shortText =
    String(rental.description).split("").splice(0, 10).join("") + "...";

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayText = showMore ? fullText : shortText;

  useEffect(() => {
    axios
      .get(`${API}/listings/${id}`)
      .then((res) => {
        console.log(res.data);
        setRental(res.data);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  const deleteRental = () => {
    axios
      .delete(`${API}/listings/${id}`)
      .then(() => {
        navigate(`/listings`);
      })
      .catch((error) => console.warn(error));
  };
  //*

  return (
    <div className="rental_detail">
      <div className="map-container">
        <MapContainer />
      </div>

      <div>
        <h2 className="rental_title">{rental.title}</h2>
      </div>
      <div className="rental_image">
        <img src={rental.image_url} alt={rental.image_url} />
      </div>
      <div className="rental_description">
        <p>{displayText}</p>

        {!showMore ? (
          <button className="view_button" onClick={toggleShowMore}>
            View More...
          </button>
        ) : (
          <button className="view_button" onClick={toggleShowMore}>
            View less
          </button>
        )}
      </div>
      <div className="rental_details_buttons">
        <button
          onClick={() => {
            navigate(`/listings/${id}/edit`);
          }}
        >
          Edit
        </button>
        <button onClick={deleteRental}>Delete</button>
      </div>
      <div className="rental_map">
        <h5>View on Map</h5>
      </div>
      <div className="rental_recs">
        <h4>Similar listings</h4>
      </div>
    </div>
  );
}
