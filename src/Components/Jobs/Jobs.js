import React, { useState, useEffect } from "react";
import axios from "axios";
import Job from "./Job";
// This components is responsible for rendering all the jobs that are present from the database
export default function Jobs({
  handleSumit,
  handleTextXhange,
  handleCheckChange,
}) {
  const API = process.env.REACT_APP_API_URL;
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
    <div className="job-page">
      {jobs.map(
        (
          {
            id,
            jobTitle,
            company,
            email,
            location,
            date,
            jobType,
            description,
            language,
            is_favorite,
          },
          index
        ) => {
          return (
            <div>
              <Job
                key={id}
                jobTitle={jobTitle}
                company={company}
                email={email}
                location={location}
                date={date}
                jobType={jobType}
                description={description}
                language={language}
                is_favorite={is_favorite}
              />
            </div>
          );
        }
      )}
    </div>
  );
}
