// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./job.css";
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
  return (
    <div className="job-container">
      <div className="left-section">
        <Link className="link" to={`/jobs/${id}`}>
          <h2>{job_title}</h2>
        </Link>
        <p className="company">{company}</p>
      </div>
      <div className="middle-section">
        <p>
          <strong>Description:</strong>
        </p>
        <p>{description}</p>
      </div>
      <div className="right-section">
        <p className="date">
          <strong>Posted Date:</strong> {posted_date}
        </p>
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Native Language:</strong> {native_language}
        </p>
      </div>
    </div>
  );
}
