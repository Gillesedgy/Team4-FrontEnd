import React from "react";
import { Link } from "react-router-dom";
import jobImage from "../../Assets/logoJobImage.jpg";
import "./favs.css";

export default function Star({
  star: {
    id,
    job_title,
    company,
    location,
    native_language,
    posted_date,
    logo,
  },
}) {
  const logoImage = logo ? logo : jobImage;

  let dateMade = new Date(posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="star-job-container">
        <div className="star-icon-company-container">
          <img className="star-job-icon" src={logoImage} alt="job-icon" />
          <h4 className="company">{company}</h4>
        </div>

        <div className="star-content">
          <h3>{job_title}</h3>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Native Language:</strong> {native_language}
          </p>
        </div>
      </div>
    </Link>
  );
}
