import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Rental from "./Rental";
import "./Rentals.css";

let API = process.env.REACT_APP_API_URL;

export default function Rentals() {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/listings`)

      .then((res) => {
        setRentals(res.data);
        console.log(res.data);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="rentals">
      <h3>Rental Listings</h3>

      {rentals.map((rental) => {
        return <Rental key={rental.id} rental={rental} />;
      })}
    </div>
  );
}
