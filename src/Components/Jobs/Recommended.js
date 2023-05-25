import React from "react";
import { Link } from "react-router-dom";
import "./rec.css";
export default function Recommended({ rec: { id, job_title, company } }) {
  return (
    <div className="recommended">
      <Link to={`/jobs/${id}`}>
        {" "}
        <h3>{job_title}</h3>
        {company}
      </Link>
    </div>
  );
}
