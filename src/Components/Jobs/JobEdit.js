import React, { useState, useEffect } from "react";
import "./form.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const API = process.env.REACT_APP_API_URL;
export default function JobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState({
    user_id: 0,
    job_title: "",
    company: "",
    job_type: "",
    description: "",
    location: "",
    native_language: "",
    posted_date: "",
    email: "",
    is_favorite: false,
  });
  //* Languages
  const [select, setSelect] = useState("");
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
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    setSelect(e.target.value);
    setEdit({ ...edit, native_language: selected });
  };

  //* Update Job
  const updateJob = (updatedJob) => {
    axios
      .get(`${API}/jobs/${id}`)
      .then(
        (res) => {
          navigate(`/jobs/${id}`);
        },
        (error) => console.log(error)
      )
      .catch((err) => console.catch(err));
  };
  // Text  Change
  const handleTextChange = (e) => {
    setEdit({ ...edit, [e.target.id]: e.target.value });
  };
  // check change
  const handleCheckChange = () => {
    setEdit({ ...edit, is_favorite: !edit.is_favorite });
  };
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob(edit, id);
  };

  useEffect(() => {
    axios.get(`${API}/jobs/${id}`).then(
      (res) => setEdit(res.data),
      (error) => navigate(`/error`)
    );
  }, [id, navigate]);
  return (
    <div className="jobForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_title">Job Title:</label>
        <input
          type="text"
          id="job_title"
          value={edit.job_title}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={edit.company}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={edit.email}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={edit.location}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="job_date">Job Date:</label>
        <input
          type="text"
          id="job_date"
          value={edit.posted_date}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="job_type">Job Type:</label>
        <input
          type="text"
          id="jobType"
          value={edit.job_type}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={edit.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          value={edit.is_favorite}
          onChange={handleCheckChange}
          required
        />

        {/* <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={edit.salary}
          onChange={handleTextChange}
          required
        /> */}

        {/* <label htmlFor="native_language">Language:</label>
        <input
          id="native_language"
          value={edit.native_language}
          onChange={handleTextChange}
          required
        /> */}
        <label>Languages: </label>
        <select
          id={edit.native_language}
          value={edit.native_language}
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

        {/* //ToDo:  modify this to update or create/post on the same form */}

        {/* have button navigate back to previous page */}
        <button onClick={() => navigate(`/jobs/${id}`)} type="submit">
          Back
        </button>
        <button onClick={() => navigate(`/jobs`)} type="submit">
          Done
        </button>
        {/* have button navigate back to page/id */}
      </form>
    </div>
  );
}
