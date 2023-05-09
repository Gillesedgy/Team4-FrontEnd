import React from "react";

//Todo: Import params from jobs (use table for reference)
export default function Job({
  jobTitle,
  company,
  email,
  location,
  date,
  jobType,
  description,
  language,
  is_favorite,
}) {
  return (
    <div className="job-single">
      <h2>{jobTitle}</h2>
      <p>{language}</p>
      <p>{date}</p>
      <h4>{email}</h4>
      <h3>{company}</h3>
      <p>{location}</p>
      <p>{jobType}</p>
      <p>{description}</p>
      <p>Update is_favorite</p>
      <p>{is_favorite ? "yes" : null}</p>
    </div>
  );
}
