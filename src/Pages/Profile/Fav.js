import React from "react";
import { Link } from "react-router-dom";
import "./favs.css";

export default function Fav({ fav: { id, title, image_url, rooms, price } }) {
  return (
    <Link to={`/listings/${id}`}>
      <div className="fav_rental">
        <div className="fav_img_container">
          <img
            className="fav_rental_image"
            src={image_url[0]}
            alt={image_url}
          />
        </div>
        <div className="fav_content">
          <div className="fav_rental_title">
            <h3>{title}</h3>
          </div>
          <hr className="fav_hr" />
          <div className="fav_rental_descrip">
            <p>
              <b>Rent: </b>${price}
            </p>
            <p>
              <b>Beds: </b>
              {rooms === 0 ? "Studio" : rooms + " BR"}{" "}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
