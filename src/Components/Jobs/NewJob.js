import React, { useState } from "react";
import "./form.css";
export default function NewJob({ data }) {
  // create new job state
  const [newJob, setNewJob] = useState({
    jobTitle: "",
    company: "",
    email: "",
    location: "",
    date: "",
    jobType: "",
    description: "",
    language: "",
    is_favorite: false,
  });
  //Todo:
  // add new job by making a call
  const addNewJob = () => {
    // axios goes here ...
  };

  // Text  Change
  const handleTextChange = (e) => {
    setNewJob({ ...newJob, [e.target.value]: e.target.value });
  };
  // check change
  const handleCheckChange = () => {
    setNewJob({ ...newJob, is_favorite: !newJob.is_favorite });
  };
  // Submit
  const handleSubmit = (e) => {
    e.preventDefasult();
    addNewJob(newJob);
  };

  //! Character Count Feature
  // const characterLimit = 500;
  // const handleCharacterCount = (e) => {
  //   console.log(newJob.description);
  //   if (characterLimit - newJob.description.length >= 1) {
  //     setNewJob({ ...NewJob, [e.target.id]: e.target.value });
  //   } else {
  //     // playMySound(error);
  //   }
  // };
  return (
    <div className="jobFrom">
      <form onSubmit={handleSubmit}>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={newJob.jobTitle}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="jobDate">Job Date:</label>
        <input
          type="text"
          id="jobDate"
          name="jobDate"
          value={newJob.jobDate}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={newJob.company}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={newJob.location}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="jobType">Job Type:</label>
        <input
          type="text"
          id="jobType"
          value={newJob.jobType}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={newJob.salary}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={newJob.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          value={newJob.is_favorite}
          onChange={handleCheckChange}
          required
        />

        {/* //ToDo:  modify this to update or create/post on the same form */}
        <button type="submit">{data ? "Update" : "Post"}</button>
        <button type="submit">Back</button>
        {/* have button navigate back prev page */}
      </form>
    </div>
  );
}
