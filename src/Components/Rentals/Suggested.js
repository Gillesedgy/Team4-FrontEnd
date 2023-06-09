import React from "react";
import { Link } from "react-router-dom";

export default function Suggested({
  rental: { id, title, image_url, rooms, price },
}) {
  return (
    <div className="suggested">
      <Link
        to={`/listings/${id}`}
        onClick={() => window.scrollTo(0, 0)}
        style={{ textDecoration: "none", color: "#303030" }}
      >
        <div className="suggested_divs">
          <img className="sug_image" src={image_url[0]} alt={image_url[0]} />
        </div>
        <div className="sug_title">
          <h3>{title}</h3>
        </div>
        <div className="sug_descrip">
          <p>
            <b>Rent: </b>${price}
          </p>
          <p>
            <b>Beds: </b>
            {rooms === 0 ? "Studio" : rooms + " BR"}{" "}
          </p>
        </div>
      </Link>
    </div>
  );
}
