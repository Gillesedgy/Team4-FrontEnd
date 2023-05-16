import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from "./Job";

const API = process.env.REACT_APP_API_URL;
export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <div className="jobs">
      <h2>Current Jobs</h2>
      {jobs.map((job) => {
        return <Job job={job} key={job.id} />;
      })}
    </div>
  );
}
