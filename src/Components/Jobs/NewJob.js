import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./form.css";
import axios from "axios";
const API = process.env.REACT_APP_API;
export default function NewJob({ data }) {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    company: "",
    email: "",
    location: "",
    date: "",
    jobType: "",
    description: "",
    language: "",
    is_favorite: false,
  });
  //Todo:
  // add new job by making a call
  const addNewJob = (addedJob) => {
    axios
      .post(`${API}/jobs`, addedJob)
      .then(
        () => {
          navigate(`/jobs`);
        },
        (error) => console.log(error)
      )
      .catch((error) => console.warn(error));
  };

  // Text  Change
  const handleTextChange = (e) => {
    setNewJob({ ...newJob, [e.target.id]: e.target.value });
  };
  // check change
  const handleCheckChange = () => {
    setNewJob({ ...newJob, is_favorite: !newJob.is_favorite });
  };
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewJob(newJob);
  };
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
    setNewJob({ ...newJob, native_language: selected });
  };
  //! Character Count Feature
  // const characterLimit = 500;
  // const handleCharacterCount = (e) => {
  //   console.log(newJob.description);
  //   if (characterLimit - newJob.description.length >= 1) {
  //     setNewJob({ ...NewJob, [e.target.id]: e.target.value });
  //   } else {
  //    // playMySound(error);
  //   }
  // };
  return (
    <div className="jobForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_title">Job Title:</label>
        <input
          type="text"
          id="job_title"
          value={newJob.job_title}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={newJob.company}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={newJob.email}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={newJob.location}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="job_date">Job Date:</label>
        <input
          type="date"
          id="job_date"
          value={newJob.posted_date}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="job_type">Job Type:</label>
        <input
          type="text"
          id="jobType"
          value={newJob.job_type}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={newJob.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          value={newJob.is_favorite}
          onChange={handleCheckChange}
          required
        />

        {/* <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={newJob.salary}
          onChange={handleTextChange}
          required
        /> */}

        {/* <label htmlFor="native_language">Language:</label>
        <input
          id="native_language"
          value={newJob.native_language}
          onChange={handleTextChange}
          required
        /> */}
        <label>Languages: </label>
        <select
          id={newJob.native_language}
          value={newJob.native_language}
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
      </form>
      {/* //ToDo:  modify this to update or create/post on the same form */}
      <button type="submit">Post</button>
      <button onClick={() => navigate(`/jobs`)} type="submit">
        Back
      </button>
    </div>
  );
}
