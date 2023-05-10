import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Rental({ rental: { id, title, image, description } }) {
  const shortDescript = description.slice(0, 100);
  return (
    <Link to={`/rentals/${id}`}>
      <div className="rental">
        <div>
          <h3 className="rental_title">{title}</h3>
        </div>
        <div className="rental_image">
          <img src={image} alt={image} />
        </div>
        <div className="rental_description">
          <p>{shortDescript}</p>
        </div>
      </div>
    </Link>
  );
}
