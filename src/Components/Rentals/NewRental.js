import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./rentalForm.css";

const API = process.env.REACT_APP_API_URL;

export default function NewRental() {
  const navigate = useNavigate();

  const languages = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    { value: "Chinese", label: "Chinese" },
    { value: "Bengali", label: "Bengali" },
    { value: "Hindi", label: "Hindi" },
    { value: "Korean", label: "Korean" },
    { value: "Arabic", label: "Arabic" },
    { value: "Japanese", label: "Japanese" },
    { value: "Creole", label: "Creole" },
    { value: "Filipino", label: "Filipino" },
    { value: "Urdu", label: "Urdu" },
  ];

  const addRental = (newRental) => {
    axios
      .post(`${API}/listings`, newRental)
      .then(
        () => {
          navigate(`/listings`);
        },
        (err) => console.log(err)
      )
      .catch((error) => console.warn(error));
  };

  // const [select, setSelect] = useState("");

  const [address, setAddress] = useState("");

  const [rental, setRental] = useState({
    description: "",
    native_language: "",
    image_url: "",
    date_posted: new Date().toLocaleDateString(),
    price: 0,
    longitude: 0,
    latitude: 0,
    is_applied: false,
    is_favorite: false,
    title: "",
    company: "",
  });

  const handleTextChange = (e) => {
    setRental({ ...rental, [e.target.id]: e.target.value });
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleSelectChange = (e) => {
    let selected = e.target.value;
    setRental({ ...rental, native_language: selected });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRental(rental);
  };

  return (
    <div className="rental_form">
      <h2 className="new_rental_title">New Rental Listing</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <textarea
            name="description"
            id="description"
            value={rental.description}
            onChange={handleTextChange}
            style={{ fontFamily: "Supreme, sans-serif" }}
            required
          />
        </label>
        <br />
        <label>
          Native Language:
          <select
            id="native_language"
            value={rental.native_language}
            onChange={handleSelectChange}
            required
          >
            <option value="">Select a language</option>
            {languages.map((language) => (
              <option value={language.value} key={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            id="image_url"
            name="imageUrl"
            value={rental.image_url}
            onChange={handleTextChange}
          />
        </label>
        <br />
        <label>
          Rent:
          <input
            type="number"
            id="price"
            name="price"
            value={rental.price}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            id="address"
            name="address"
            value={address}
            onChange={handleAddress}
            required
          />
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            id="title"
            name="title"
            value={rental.title}
            onChange={handleTextChange}
            required
          />
        </label>
        <br />
        <label>
          Company:
          <input
            type="text"
            id="company"
            name="company"
            value={rental.company}
            onChange={handleTextChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <button
        className="go_back"
        onClick={() => {
          navigate(`/listings`);
        }}
      >
        Go Back
      </button>
    </div>
  );
}
