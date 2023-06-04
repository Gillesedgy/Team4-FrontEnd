import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./form.css";
import axios from "axios";
import { LogoSelect } from "./LogoSelect";
// import { handleLogo } from "../../Features/helper";
import { LanguageSelect } from "../../Features/LanguageSelect";
const API = process.env.REACT_APP_API_URL;
export default function NewJob({ data }) {
  const navigate = useNavigate();
  const [newJob, setNewJob] = useState({
    //toDO: Inlcude Logo key
    logo: "",
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
  //Todo: Job icon functionality
  // const [logo, setLogo] = useState(handleLogo());
  const [selectLogo, setSelectLogo] = useState(""); //tracks

  // console.log("logo", logo);
  const addNewJob = (addedJob) => {
    axios
      .post(`${API}/jobs`, addedJob, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
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
  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewJob(newJob);
  };
  const [selectedLanguage, setSelectLanguage] = useState("");

  const jobType = [
    { value: "Full-Time", label: "Full-Time" },
    { value: "Part-Time", label: "Part-Time" },
  ];
  const handleSelectedLanguage = (e) => {
    const selected = e.target.value;
    setSelectLanguage(e.target.value);
    setNewJob({ ...newJob, native_language: selected });
  };
  const handleTypeChange = (e) => {
    const selected = e.target.value;
    setSelectLanguage(selected);
    setNewJob({ ...newJob, job_type: selected });
  };
  //Todo: handleLogo Dropdown function
  // const handleLogoChange = handleLogo;

  const handleLogoSelect = (e) => {
    const selectedLogo = e.target.value;
    setSelectLogo(selectedLogo);
    setNewJob({ ...newJob, logo: selectedLogo });
  };
  //! Character Count Feature
  // const characterLimit = 500;
  // const handleCharacterCount = (e) => {
  //   console.log(newJob.description);
  //   if (characterLimit - newJob.description.length >= 1) {
  //     setNewJob({ ...NewJob,z [e.target.id]: e.target.value });
  //   } else {

  //   }
  // };

  return (
    <div className="jobForm">
      <h2>New Job Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="job_title">Job Title:</label>
        <input
          type="text"
          id="job_title"
          value={newJob.job_title}
          onChange={handleTextChange}
          required
        />
        <LogoSelect
          selectedLogo={selectLogo}
          handleLogoSelect={handleLogoSelect}
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
        <label>Job Type: </label>
        <select
          id={newJob.job_type}
          value={newJob.job_type}
          onChange={handleTypeChange}
          required
        >
          <option value="">Select a language</option>
          {jobType.map((job_type) => (
            <option value={job_type.value} key={job_type.value}>
              {job_type.label}
            </option>
          ))}
        </select>
        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={newJob.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="skills">Skills:</label>
        <input
          type="text"
          id="skills"
          value={newJob.skills}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="requirements">Requirements:</label>
        <input
          type="text"
          id="requirements"
          value={newJob.requirements}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={newJob.salary}
          onChange={handleTextChange}
          required
        />
        <LanguageSelect
          selected={selectedLanguage}
          handleSelectedLanguage={handleSelectedLanguage}
        />

        <div className="form-button-container">
          {" "}
          <button className="button_edit" type="submit">
            Post
          </button>
          <button
            className="button_edit"
            onClick={() => navigate(`/jobs`)}
            type="submit"
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
