import React, { useState, useEffect } from "react";
import "./form.css";
import { useParams } from "react-router-dom";
export default function JobEdit() {
  const { id } = useParams();
  const [newEdit, setNewEdit] = useState({
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

  //* Update Job
  const updateJob = (uodatedJob) => {
    // Axios call here
  };
  // Text  Change
  const handleTextChange = (e) => {
    setNewEdit({ ...newEdit, [e.target.value]: e.target.value });
  };
  // check change
  const handleCheckChange = () => {
    setNewEdit({ ...newEdit, is_favorite: !newEdit.is_favorite });
  };
  // Submit
  const handleSubmit = (e) => {
    e.preventDefasult();
    updateJob(newEdit, id);
  };

  //Todo: Call
  useEffect(() => {
    //axios.get(`{API}//jobs/${id}`)
  }, [id]);
  return (
    <div className="jobForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="jobTitle">Job Title:</label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={newEdit.jobTitle}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="jobDate">Job Date:</label>
        <input
          type="text"
          id="jobDate"
          name="jobDate"
          value={newEdit.jobDate}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="company">Company:</label>
        <input
          type="text"
          id="company"
          value={newEdit.company}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="location">Location:</label>
        <input
          type="text"
          id="location"
          value={newEdit.location}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="jobType">Job Type:</label>
        <input
          type="text"
          id="jobType"
          value={newEdit.jobType}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="salary">Salary:</label>
        <input
          type="text"
          id="salary"
          value={newEdit.salary}
          onChange={handleTextChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          style={{ resize: "none" }}
          id="description"
          value={newEdit.description}
          onChange={handleTextChange}
          required
        />
        <label htmlFor="is_favorite">Favorite:</label>
        <input
          type="checkbox"
          id="is_favorite"
          value={newEdit.is_favorite}
          onChange={handleCheckChange}
          required
        />

        {/* //ToDo:  modify this to update or create/post on the same form */}

        {/* have button navigate back to previous page */}
        <button type="submit">Back</button>
        <button type="submit">Done</button>
        {/* have button navigate back to page/id */}
      </form>
    </div>
  );
}
