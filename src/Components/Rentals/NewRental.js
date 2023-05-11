import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

let API = process.env.REACT_APP_API_URL;

export default function NewRental() {
  const navigate = useNavigate();

  const addRental = (newRental) => {
    axios
      .post(`${API}/listings`, newRental)
      .then(
        () => {
          navigate(`/listings`);
        },
        (err) => console.log(err)
      )
      .catch((error) => console.warn(error));
  };

  return (
    <div>
      NewRental
      {/* <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={listings.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Native Language:
          <input
            type="text"
            name="nativeLanguage"
            value={listings.nativeLanguage}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={listings.image_url}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
         Rent:
          <input
            type="number"
            name="price"
            value={listings.price}
            onChange={handleChange}
            required
          />
        </label>
        <br />
      
      </form> */}
    </div>
  );
}
