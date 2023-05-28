import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Job.css";
import { handleIcons } from "../../Features/helper";
export default function Job({
  job: { id, job_title, company, location, native_language, posted_date },
}) {
  const [icon, setIcon] = useState(handleIcons());
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
          <div className="job-icon">
            <img src={icon} alt="job-icon" />
            <p className="company">{company}</p>
          </div>
        </div>
        {/* Middle  */}
        <div className="middle-section">
          <h2>{job_title}</h2>
        </div>
        {/* Right */}
        <div className="right-section">
          <p>
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
