import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
let API;
export default function RentalDetails() {
  const [rental, setRental] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const [showMore, setShowMore] = useState(false);

  const fullText = rental.description;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayText = showMore ? fullText : fullText.slice(0, 100);

  useEffect(() => {
    axios
      .get(`${API}/rentals/${id}`)
      .then((res) => {
        console.log(res);
        setRental(res);
      })
      .catch((err) => console.warn(err));
  }, [id]);

  const deleteRental = () => {
    axios
      .delete(`${API}/rentals/${id}`)
      .then(() => {
        navigate(`/rentals`);
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
        <img src={rental.image} alt={rental.image} />
      </div>
      <div className="rental_description">
        <p>{displayText}</p>

        {!showMore ? (
          <button onClick={toggleShowMore}>View More...</button>
        ) : (
          <button onClick={toggleShowMore}>View less...</button>
        )}
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
