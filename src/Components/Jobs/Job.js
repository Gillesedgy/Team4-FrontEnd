// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Job.css";
import jobpic1 from "../../Assets/jobpic1.png";
import jobpic2 from "../../Assets/jobpic2.png";
import jobpic3 from "../../Assets/jobpic3.png";
import jobpic4 from "../../Assets/jobpic4.png";
import jobpic5 from "../../Assets/jobpic5.png";
import jobpic6 from "../../Assets/jobpic6.png";
import jobpic7 from "../../Assets/jobpic7.png";
import jobpic8 from "../../Assets/jobpic8.png";
import jobpic9 from "../../Assets/jobpic9.png";
export default function Job({
  job: { id, job_title, company, location, native_language, posted_date },
}) {
  //Job Icons
  const jobIcons = [
    jobpic1,
    jobpic2,
    jobpic3,
    jobpic4,
    jobpic5,
    jobpic6,
    jobpic7,
    jobpic8,
    jobpic9,
  ];
  // randomize Icon
  const randomizeIcon = jobIcons[Math.floor(Math.random() * jobIcons.length)];
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
            <img src={randomizeIcon} alt="job-icon" />
            <p className="company">{company}</p>
          </div>
        </div>
        {/* Middle  */}
        <div className="middle-section">
          <h2>{job_title}</h2>
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
