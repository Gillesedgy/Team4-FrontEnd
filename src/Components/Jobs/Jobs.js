import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from "./Job";

// This components is responsible for rendering all the jobs that are present from the database
const API = process.env.REACT_APP_API_URL;
export default function Jobs() {
  const [myJobs, setMyJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        setMyJobs(res.data);
        console.log("!!!", res.data);
      })
      .catch((error) => console.warn(error));
  }, []);

  return (
    <div className="job-page">
      <h2>Current Jobs</h2>
      {myJobs.map((job) => {
        return <Job job={job} key={job.id} />;
      })}
    </div>
  );
}
