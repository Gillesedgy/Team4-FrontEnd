import React from "react";
import { Link } from "react-router-dom";
import "./rec.css";

export default function Recommended({ rec: { id, job_title, company }, icon }) {
  return (
    <div className="recommended">
      <Link to={`/jobs/${id}`}>
        {" "}
        <div className="img-details">
          <img className="img" src={icon} alt="job_icon" />
          <h5>{job_title}</h5>@<p className="recommendedP">{company}</p>
        </div>
      </Link>
    </div>
  );
}
