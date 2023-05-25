import React from "react";
import axios from "axios";
import "./Account.css";
import { useState, useEffect } from "react";

const API = process.env.REACT_APP_API_URL;
export default function UserJob() {
  const [jobs, setJobs] = useState([]);

  //users jobs
  useEffect(() => {
    axios
      .get(`${API}/jobs/user`, {
        headers: {
          authorization: localStorage.getItem("jwtToken"),
        },
      })
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.warn(error));
  }, [setJobs]);

  return (
    <div className="userjob">
      <h3>Your Listings/Jobs</h3>
      {jobs.map((job) => (
        <div key={job.id}>{job.job_title}</div>
      ))}
    </div>
  );
}
