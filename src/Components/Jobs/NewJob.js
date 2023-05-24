import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./form.css";
import axios from "axios";
const API = process.env.REACT_APP_API_URL;
export default function NewJob({ data }) {
  const navigate = useNavigate();
  //todo: Add new Table details to job state
  const [newJob, setNewJob] = useState({
    job_title: "",
    company: "",
    email: "",
    location: "",
    posted_date: new Date().toLocaleDateString(),
    job_type: "",
    description: "",
    native_language: "",
    is_favorite: false,
    requirements: "",
    salary: "",
  });
  //Todo:
  // add new job by making a call
  const addNewJob = (addedJob) => {
    axios
      .post(`${API}/jobs`, addedJob, { headers: {
        authorization: localStorage.getItem('jwtToken')
      }})
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
  //! Found CSS Format Online

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
        <label htmlFor="job_type">Job Type:</label>
        <input
          type="text"
          id="job_type"
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
        />
        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={newJob.salary}
          onChange={handleTextChange}
          required
        />
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
        </select>{" "}
        <button type="submit">Post</button>
      </form>
      <div className="button">
        <button onClick={() => navigate(`/jobs`)} type="submit">
          Back
        </button>
      </div>
    </div>
  );
}
