import axios from "axios";
import "../../Features/Map.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./jobDetails.css";
import Contact from "../../Features/Contact";
//* --------Map---------------
// import { addressConverter } from "../../Features/helper";
import MapContainer from "../../Features/MapContainer";
//* -------------------------------------------
const API = process.env.REACT_APP_API_URL;

export default function JobDetails({ handleAddressSubmit }) {
  const [jobs, setJobs] = useState([]);
  // Recommended Jobs
  const [recommended, setRecommended] = useState([]);
  // const [filteredJobs, setFilteredJobs]= useState([]);
  const [jobSkills, setJobSkills] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/jobs/${id}`)
      .then((res) => {
        setJobs(res.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);
  //* Fetching for jobs that have things in common -------
  const recommendedJobs = () => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        setRecommended(res.data);
      })
      .catch((error) => console.warn(error));
  };
  //* filter Recommended Jobs
  useEffect(() => {
    const filtered = recommended.filter((rec) => {
      return rec.skills === jobs.skills && rec.id === jobs.id;
    });
    setRecommended(filtered);
  }, []);
  // //* ----------------
  // Delete
  const deleteJob = () => {
    axios
      .delete(`${API}/jobs/${id}`)
      .then(
        () => {
          navigate(`/jobs`);
        },
        (error) => console.log(error)
      )
      .catch((error) => console.warn(error));
  };
  // Date format
  let dateMade = new Date(jobs.posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");
  return (
    <div className="page-container">
      {/* //!LEFT ----- */}
      <div className="left-aside">
        {recommended.map((job) => (
          <div className="rec">
            {" "}
            <p key={job.id}>{job.job_title}</p>
          </div>
        ))}
        <p className="p1">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque rerum
          sit voluptate perspiciatis sed animi velit quaerat recusandae,
          molestias aspernatur deleniti. Facere molestias, minima nam, alias
          similique iure consequuntur earum unde vitae amet adipisci non ab
          accusamus ratione doloribus, delectus repudiandae iste. Ad id,
          ratione, culpa minima sint iusto modi dignissimos cum magni quibusdam
          a totam, quis perspiciatis. Deserunt nisi totam, iste facere sit porro
          quod a laboriosam ut asperiores nesciunt, laudantium velit distinctio,
          accusamus corrupti voluptatum! Vitae, iusto hic unde, nobis blanditiis
          eaque fugiat omnis quod voluptas distinctio modi.
        </p>
      </div>
      {/* //!MIDDLE ----- */}
      <div className="job-details-body middle">
        <p className="date">
          <em>Posted Date:</em> {middle}, {year}
        </p>
        <p className="job-title">{jobs.job_title}</p>

        <p className="company">
          <strong>Company:</strong> {jobs.company}
        </p>
        <p className="email">
          <strong>Email:</strong> {jobs.email}
        </p>
        <p className="location">
          <strong>Location:</strong> {jobs.location}
        </p>
        <p className="job-type">
          <strong>Job Type:</strong> {jobs.job_type}
        </p>
        <p className="salary">
          <strong>Salary:</strong> $ {jobs.salary}/hr
        </p>
        <p className="description">
          <strong>Description</strong>
        </p>
        <p className="description">{jobs.description}</p>
        <p className="native-language">
          <strong>Native Language:</strong> {jobs.native_language}
        </p>
        <p className="skills">
          <strong>Skills:</strong> {jobs.skills}
        </p>
        <p className="requirements">
          <strong>Requirements:</strong> {jobs.requirements}
        </p>
        {/* //!BUTTONS -----  */}
        <div className="buttons">
          <button className="button" type="submit" onClick={deleteJob}>
            Delete
          </button>
          <button
            className="button"
            onClick={() => navigate(`/jobs/${id}/edit`)}
            type="submit"
          >
            Edit
          </button>
          <button
            className="button"
            onClick={() => navigate(`/jobs`)}
            type="submit"
          >
            Back
          </button>
        </div>
      </div>
      {/* //! RIGHT ----- */}
      <div className="right-aside">
        <Contact />
      </div>
      {/* //! BOTTOM ---- Map */}
      <div className="empty"></div>
      <div className="map-container bottom ">
        <MapContainer
          handleAddressSubmit={handleAddressSubmit}
          // addressConverter={addressConverter}
          location={jobs.location}
        />
      </div>
    </div>
  );
}
