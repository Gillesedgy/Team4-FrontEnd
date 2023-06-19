import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Rental from "./Rental";
import Filter from "../../Features/Filter";
import { LanguageSelect } from "../../Features/LanguageSelect";
import { MdOutlineAddHome } from "react-icons/md";

import "./Rentals.css";
import { RiFileAddLine } from "react-icons/ri";

const API = process.env.REACT_APP_API_URL;

export default function Rentals() {
  const [rentals, setRentals] = useState([]);
  const navigate = useNavigate();

  const [selectedLanguage, setSelectLanguage] = useState("");

  const handleSelectedLanguage = (e) => {
    const selected = e.target.value;
    setSelectLanguage(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}/listings`)

      .then((res) => {
        const recent = res.data.sort(
          (a, b) => new Date(b.date_posted) - new Date(a.date_posted)
        );

        setRentals(recent);
      })
      .catch((err) => console.warn(err));
  }, []);

  return (
    <div className="rentals_page_main_container">
      <div className="title_add_container">
        <h2 className="rentals_title">Rental Listings</h2>

        <LanguageSelect
          selectedLanguage={selectedLanguage}
          handleSelectedLanguage={handleSelectedLanguage}
        />

        <div className="rentals_button_container">
          {localStorage.getItem("user_id") ? (
            <button
              className="rentals_add"
              onClick={() => navigate(`/listings/new`)}
            >
              <MdOutlineAddHome />
            </button>
          ) : null}
        </div>
      </div>
      <div className="rentals">
        {selectedLanguage && <Filter selectedLanguage={selectedLanguage} />}
        {!selectedLanguage &&
          rentals.map((rental) => {
            return <Rental key={rental.id} rental={rental} />;
          })}
      </div>
    </div>
  );
}
