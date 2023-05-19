import React from "react";

export default function Recommended({ rec: { job_title, company } }) {
  return (
    <div className="recommended">
      <div className="titles">
        <h4>{job_title}</h4>
        {company}
      </div>
    </div>
  );
}
