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
      .put(`${API}/listings/${id}`, updatedRental, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then(
        () => {
          navigate(`/listings/${id}`);
        },
        (error) => console.log(error)
      )
      .catch((err) => console.warn(err));
  };

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

  const [imageUrls, setImageUrls] = useState([]);
  const [imageUrl, setImageUrl] = useState("");

  const handleTextChange = (e) => {
    setRental({ ...rental, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (e) => {
    let selected = e.target.value;
    setRental({ ...rental, native_language: selected });
  };

  const handleImageChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleAddImage = (e) => {
    e.preventDefault();

    if (imageUrl) {
      const updatedImageUrls = [...rental.image_url, imageUrl];
      setImageUrls([...updatedImageUrls]);
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
    axios
      .get(`${API}/listings/${id}`)
      .then(
        (res) => {
          setRental(res.data);
          setImageUrls(res.data.image_url);
        },
        (err) => navigate(`/error`)
      )
      .catch((err) => console.warn(err));
  }, [id, navigate]);

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

        <div style={{ display: "flex", flexDirection: "row", gap: ".5em" }}>
          {imageUrls.map((imageUrl, index) => {
            return (
              <li key={index}>
                {" "}
                <img src={imageUrl} alt={index} style={{ height: "80px" }} />
                <button
                  type="button"
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
          <input
            type="text"
            value={imageUrl}
            onChange={handleImageChange}
            placeholder="Image URL"
          />
          <button type="button" className="add_image" onClick={handleAddImage}>
            Add Image
          </button>
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
          navigate(`/listings/${id}`);
        }}
      >
        Go Back
      </button>
    </div>
  );
}
