import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

let API = process.env.REACT_APP_API_URL;

export default function RentalDetails() {
  const [rental, setRental] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);

  // const fullText = rental.description;

  // const toggleShowMore = () => {
  //   setShowMore(!showMore);
  // };

  // const displayText = showMore ? fullText : fullText.slice(0, 100);

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

  return (
    <div>
      RentalDetails
      <div>
        <h3 className="rental_title">{rental.title}</h3>
      </div>
      <div className="rental_image">
        <img src={rental.image_url} alt={rental.image_url} />
      </div>
      <div className="rental_description">
        <p>{rental.description}</p>

        {/* {!showMore ? (
          <button onClick={toggleShowMore}>View More...</button>
        ) : (
          <button onClick={toggleShowMore}>View less...</button>
        )} */}
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
