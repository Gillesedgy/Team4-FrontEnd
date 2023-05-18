import React from "react";
import { Link } from "react-router-dom";

export default function Rental({
  rental: { id, title, image_url, rooms, price },
}) {
  return (
    <Link to={`/listings/${id}`}>
      <div className="rental">
        <div>
          <img className="rental_image" src={image_url} alt={image_url} />
        </div>
        <div className="rental_title">
          <h3>{title}</h3>
        </div>
        <div className="rental_descrip">
          <p>
            <b>Rent: </b>${price}
          </p>
          <p>
            <b>Beds: </b>
            {rooms === 0 ? "Studio" : rooms + " BR"}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
}
