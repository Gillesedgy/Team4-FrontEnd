// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Job.css";
export default function Job({
  job: {
    id,
    job_title,
    company,
    job_type,
    description,
    location,
    native_language,
    posted_date,
    email,
    is_favorite,
  },
}) {
  // Date format
  let dateMade = new Date(posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <Link className="link" to={`/jobs/${id}`}>
      {" "}
      <div className="job-container">
        <div className="left-section">
          <p className="company">{company}</p>
        </div>
        {/* Middle  */}
        <div className="middle-section">
          <h2>{job_title}</h2>
          {/* <p>
          <strong>Description:</strong>
        </p>
        <p>{description}</p> */}
        </div>
        {/* Right */}
        <div className="right-section">
          <p className="date">
            <strong>Posted Date:</strong> {middle}, {year}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Native Language:</strong> {native_language}
          </p>
        </div>
      </div>{" "}
    </Link>
  );
}
