import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LanguageSelect } from "../../Features/LanguageSelect";
import "./rentalForm.css";

const API = process.env.REACT_APP_API_URL;

export default function NewRental() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectLanguage] = useState("");

  const addRental = (newRental) => {
    axios
      .post(`${API}/listings`, newRental, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(
        () => {
          navigate(`/listings`);
        },
        (err) => console.log(err)
      )
      .catch((error) => console.warn(error));
  };

  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const [rental, setRental] = useState({
    description: "",
    native_language: "",
    image_url: [],
    date_posted: new Date().toLocaleDateString(),
    price: 0,
    location: "",
    is_applied: false,
    is_favorite: false,
    title: "",
    company: "",
    rooms: 0,
  });

  const handleTextChange = (e) => {
    setRental({ ...rental, [e.target.id]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSelectedLanguage = (e) => {
    const selected = e.target.value;
    setSelectLanguage(e.target.value);
    setRental({ ...rental, native_language: selected });
  };

  const handleAddImage = (e) => {
    e.preventDefault();

    if (imageUrl) {
      const updatedImageUrls = [...rental.image_url, imageUrl];
      setImageUrls(updatedImageUrls);
      setRental({ ...rental, image_url: updatedImageUrls });
      setImageUrl("");
    }
  };

  function deleteImage(index) {
    let imageList = imageUrls.filter((item, i) => i !== index);
    setImageUrls(imageList);
    setRental({ ...rental, image_url: imageList });
  }

  useEffect(() => {
    if (!rental.image_url || rental.image_url.length === 0) {
      setRental({
        ...rental,
        image_url: [
          "https://dummyimage.com/400x400/6e6c6e/e9e9f5.png&text=No+Image",
        ],
      });
    }
  }, [rental]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addRental(rental);
  };

  return (
    <div className="rental_form">
      <h2 className="new_rental_title">New Rental Listing</h2>
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
            name="description"
            id="description"
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

        <LanguageSelect
          selected={selectedLanguage}
          handleSelectedLanguage={handleSelectedLanguage}
        />

        <div style={{ display: "flex", flexDirection: "row", gap: ".5em" }}>
          {imageUrls.map((imageUrl, index) => {
            return (
              <li key={index} className="image_form_display">
                <img
                  src={imageUrl}
                  alt={index}
                  style={{ height: "80px" }}
                  className="images_added_form"
                />
                <button
                  className="delete_pic"
                  onClick={() => deleteImage(index)}
                >
                  X
                </button>
              </li>
            );
          })}
        </div>
        <label>
          Image URL:
          <div className="image_adder">
            <input
              style={{ width: "84%" }}
              type="text"
              value={imageUrl}
              onChange={handleImageChange}
              placeholder="Image URL"
            />

            <button
              type="button"
              className="add_image"
              onClick={handleAddImage}
            >
              Add
            </button>
          </div>
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
            id="location"
            name="address"
            value={rental.location}
            onChange={handleTextChange}
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
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
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
