import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Job from "./Job";
import { RiFileAddLine } from "react-icons/ri";
import "./Job.css";
const API = process.env.REACT_APP_API_URL;
export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

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

  return (
    <div className="jobs">
      <h2 className="jobs-title">
        Current Jobs
        <div className="jobs-button-container">
          {" "}
          <button onClick={() => navigate(`/jobs/new`)} className="add-button">
            <RiFileAddLine /> Add New
          </button>{" "}
        </div>
      </h2>{" "}
      <p className="current-jobs">
        {/* //? Current jobs Count */}
        {/* <strong>{jobs.length}</strong> <em>current Jobs</em> */}
      </p>
      <div className="jobs-container">
        {jobs.map((job) => {
          return <Job job={job} key={job.id} />;
        })}
      </div>
    </div>
  );
}
