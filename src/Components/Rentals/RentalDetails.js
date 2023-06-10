import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Suggested from "./Suggested";
import Contact from "../../Features/Contact";
import Carousel from "./Carousel";
import Liked from "../../Features/Liked";

import "./RentalDetails.css";
//* --------Map---------------
import MapContainer from "../../Features/MapContainer";
// import { useLoadScript } from "@react-google-maps/api"; // this is needed to make sure the map loads correctly
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function RentalDetails({ handleAddressSubmit }) {
  const [showMap, setShowMap] = useState(false);
  const handleToggle = () => {
    setShowMap(!showMap);
  };
  const [rental, setRental] = useState({});
  const [moreRentals, setMoreRentals] = useState([]);
  const [images, setImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

  let datePosted = new Date(rental.date_posted);
  datePosted = datePosted.toDateString();
  let year = datePosted.split(" ").pop();
  let middle = datePosted.split(" ").splice(1, 2).join(" ");

  useEffect(() => {
    axios
      .get(`${API}/listings/${id}`)
      .then((res) => {
        setRental(res.data);
        setImages(res.data.image_url);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  const deleteRental = () => {
    axios
      .delete(`${API}/listings/${id}`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(() => {
        navigate(`/listings`);
      })
      .catch((error) => console.warn(error));
  };

  useEffect(() => {
    axios
      .get(`${API}/listings`)

      .then((res) => {
        setMoreRentals(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  let filtered = moreRentals.filter((more) => rental.rooms === more.rooms);
  filtered = filtered.length > 3 ? filtered.splice(0, 3) : filtered;

  return (
    <div className="rental_details">
      {/* <div className="heart_button">
        <Liked listingId={id} />
      </div> */}
      <div className="details_main_content">
        <div className="rental_dets_image">
          <Carousel images={images} />
        </div>

        <div className="heart_button">
          <h2 className="rental_dets_title">{rental.title}</h2>
          <Liked listingId={id} />
        </div>
        <p>
          <em>
            Date Posted: {middle}, {year}
          </em>
        </p>
        <div className="important_dets">
          <p>
            <b>Monthly Rent:</b> ${rental.price}
          </p>

          <hr className="hr" />
          <p>
            <b>Rooms: </b>
            {rental.rooms}
          </p>
        </div>
        <h3>Description</h3>
        <div className="rental_dets_description">
          <p>{rental.description}</p>
        </div>
      </div>
      <>
        {localStorage.getItem("user_id") === String(rental.user_id) ? (
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
        ) : null}
      </>

      <div className="rental_map">
        <h5>View on Map</h5>
        <p>
          <button
            className="show-button button"
            onClick={handleToggle}
            style={{ backgroundColor: "teal" }}
          >
            {showMap ? "Hide Map" : "View on map"}
          </button>
        </p>
        {showMap && (
          <div className="middle map-container">
            <MapContainer
              handleAddressSubmit={handleAddressSubmit}
              location={rental.location}
            />
          </div>
        )}
      </div>
      <hr style={{ margin: "1em" }} />
      <div className="contact-rec-container">
        <div className="recommended-container">
          <h3 className="rental_recs_h">Similar listings</h3>
          {filtered.map((rental) => {
            return <Suggested key={rental.id} id={rental.id} rental={rental} />;
          })}
        </div>
        <div className="contact-container" style={{ height: "70%" }}>
          <h3>Contact</h3>
          <Contact />
        </div>
      </div>
    </div>
  );
}
