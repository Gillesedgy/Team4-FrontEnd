import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Job from "./Job";
import { GrAdd } from "react-icons/gr";
import FilteredJobs from "../../Features/FilteredJobs";
import { LanguageSelect } from "../../Features/LanguageSelect";
import "./Job.css";
const API = process.env.REACT_APP_API_URL;
export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  const [selectedLanguage, setSelectLanguage] = useState("");

  const handleSelectedLanguage = (e) => {
    const selected = e.target.value;
    setSelectLanguage(selected);
  };

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        console.log(res.data);
        // sorting most recent at the top
        const recent = res.data.sort(
          (a, b) => new Date(b.posted_date) - new Date(a.posted_date)
        );
        setJobs(recent);
      })
      .catch((error) => console.warn(error));
  }, []);

  // const languages = [
  //   { value: "English", label: "English" },
  //   { value: "Spanish", label: "Spanish" },
  //   { value: "Chinese", label: "Chinese" },
  //   { value: "Bengali", label: "Bengali" },
  //   { value: "Hindi", label: "Hindi" },
  //   { value: "Korean", label: "Korean" },
  //   { value: "Arabic", label: "Arabic" },
  //   { value: "Japanese", label: "Japanese" },
  //   { value: "Creole", label: "Creole" },
  //   { value: "Filipino", label: "Filipino" },
  //   { value: "Urdu", label: "Urdu" },
  //   { value: "French", label: "French" },
  //   { value: "Italian", label: "Italian" },
  //   { value: "German", label: "German" },
  //   { value: "Vietnamese", label: "Vietnamese" },
  // ];

  return (
    <div className="jobs">
      <div className="jobs-button-container">
        <h2 className="jobs-title">Current Jobs </h2>
        <LanguageSelect
          selectedLanguage={selectedLanguage}
          handleSelectedLanguage={handleSelectedLanguage}
        />
        {localStorage.getItem("user_id") ? (
          <button onClick={() => navigate(`/jobs/new`)} className="add-button">
            <GrAdd />
          </button>
        ) : null}
      </div>

      <p className="current-jobs">
        {/* //? Current jobs Count */}
        {/* <strong>{jobs.length}</strong> <em>current Jobs</em> */}
      </p>
      <div className="jobs-container">
        {selectedLanguage && (
          <FilteredJobs selectedLanguage={selectedLanguage} />
        )}
        {!selectedLanguage &&
          jobs.map((job) => {
            return <Job job={job} key={job.id} />;
          })}
      </div>
    </div>
  );
}
