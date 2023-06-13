import React from "react";
import { Link } from "react-router-dom";
import { BiBed } from "react-icons/bi";

export default function Rental({
  rental: { id, title, image_url, rooms, price },
}) {
  return (
    <Link to={`/listings/${id}`} onClick={() => window.scrollTo(0, 0)}>
      <div className="rental">
        <div className="rental_image_div">
          <img className="rental_image" src={image_url[0]} alt={image_url} />
        </div>
        <div className="rental_title">
          <h3>{title}</h3>
        </div>
        <div className="rental_descrip">
          <p>
            <b>Rent: </b>${price}
          </p>
          <div className="bed_info_div">
            <p>
              <BiBed style={{ fontSize: "1.2em", float: "left" }} />{" "}
              {/* <b>Beds: </b> */}
              {rooms === 0 ? "Studio" : rooms + " BR"}{" "}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
