import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Rental({
  rental: { id, title, image_url, description },
}) {
  const shortDescript = description.slice(0, 100);
  return (
    <Link to={`/listings/${id}`}>
      <div className="rental">
        <div>
          <h3 className="rental_title">{title}</h3>
        </div>
        <div className="rental_image">
          <img src={image_url} alt={image_url} />
        </div>
        <div className="rental_description">
          <p>{shortDescript}</p>
        </div>
      </div>
    </Link>
  );
}
