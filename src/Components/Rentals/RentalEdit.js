import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./rentalForm.css";

const API = process.env.REACT_APP_API_URL;

export default function RentalEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

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
    { value: "French", label: "French" },
    { value: "German", label: "German" },
    { value: "Italian", label: "Italian" },
    { value: "Vietnamese", label: "Vietnamese" },
  ];

  const updateRental = (updatedRental) => {
    axios
      .put(`${API}/listings/${id}`)
      .then(
        () => {
          navigate(`/listings/${id}`);
        },
        (error) => console.log(error)
      )
      .catch((err) => console.warn(err));
  };

  const [select, setSelect] = useState("");

  const [address, setAddress] = useState("");

  const [rental, setRental] = useState({
    user_id: 0,
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
    rooms: 0,
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

  useEffect(() => {
    axios
      .get(`${API}/listings/${id}`)
      .then(
        (res) => setRental(res.data),
        (err) => navigate(`/error`)
      )
      .catch((err) => console.warn(err));
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateRental(rental);
  };

  return (
    <div className="rental_form">
      <h2 className="rental_edit_title">Edit form</h2>
      <form onSubmit={handleSubmit}>
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

        <label>
          Description:
          <textarea
            type="text"
            id="description"
            name="description"
            value={rental.description}
            onChange={handleTextChange}
            style={{ fontFamily: "Supreme, sans-serif" }}
            required
          />
        </label>

        <label>
          Rooms:
          <input
            type="number"
            id="rooms"
            name="rooms"
            value={rental.rooms}
            onChange={handleTextChange}
            required
          />
        </label>

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
          navigate(`/listings/${id}`);
        }}
      >
        Go Back
      </button>
    </div>
  );
}
