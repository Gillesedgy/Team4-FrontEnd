import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Rental from "../Components/Rentals/Rental";

const API = process.env.REACT_APP_API_URL;

export default function Filter({ selectedLanguage }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/listings?language=${selectedLanguage}`)
      .then((res) => {
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedLanguage]);

  return (
    <>
      {filtered.length > 0 ? (
        filtered.map((rental) => {
          return <Rental key={rental.id} rental={rental} />;
        })
      ) : (
        <h3 className="no_results">
          Sorry, there are no rentals right now that match that language
          preference!
        </h3>
      )}
    </>
  );
}
