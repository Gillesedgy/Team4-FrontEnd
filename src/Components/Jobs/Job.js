import React, { useState, useEffect } from "react";
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
  return (
    <div className="job-container">
      <p className="date">
        <strong>Posted Date:</strong> {posted_date}
      </p>
      <div className="job-body">
        {" "}
        <Link className="link" to={`/jobs/${id}`}>
          {" "}
          <p>{job_title}</p>
        </Link>
        {/* <p>
          <strong>Favorite:</strong> {is_favorite ? "<3" : null}
        </p> */}
        <p>
          <strong>Company:</strong> {company}
        </p>
        {/* <p>
          <strong>Email:</strong> {email}
        </p> */}
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Job Type:</strong> {job_type}
        </p>
        <p>
          <strong>Description:</strong>
        </p>
        <p>{description}</p>
        <p>
          <strong>Native Language:</strong> {native_language}
        </p>
      </div>
    </div>
  );
}
