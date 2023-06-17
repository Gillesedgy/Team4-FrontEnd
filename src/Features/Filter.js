import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

import Rental from "../Components/Rentals/Rental";

const API = process.env.REACT_APP_API_URL;

export default function Filter({ selectedLanguage }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    // if (selectedLanguage) {
    axios
      .get(`${API}/listings?language=${selectedLanguage}`)
      .then((res) => {
        let data = Object.values(res.data);
        setFiltered(data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
    // } else if (!selectedLanguage) {
    //   axios
    //     .get(`${API}/listings`)
    //     .then((res) => {
    //       const recent = res.data.sort(
    //         (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
    //       );
    //       console.log("recent", recent);
    //       setFiltered(recent);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // }
  }, [selectedLanguage]);

  return (
    <>
      {filtered.map((rental) => {
        return <Rental key={rental.id} rental={rental} />;
      })}
    </>
  );
}
