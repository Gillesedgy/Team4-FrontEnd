import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
// API
const API = process.env.REACT_APP_API_URL;

export default function JobDetails() {
  const [jobs, setJobs] = useState([]);
  const { id } = useParams();
  const { navigate } = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/jod/${id}`)
      .then((res) => {
        console.log(res.data);
        setJobs(res.data);
      })
      .catch((error) => console.warn("catch", error));
  }, [id]);

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
      .cath((error) => console.warn(error));
  };
  return (
    <div>
      JobDetails
      <div className="job-details">
        <h1>Lorem ipsum dolor</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          blanditiis iure, sequi totam minus atque itaque vero quasi doloremque
          voluptate aspernatur impedit aut, officiis voluptatibus unde
          praesentium similique, consequuntur recusandae. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Quaerat blanditiis iure, sequi
          totam minus atque itaque vero quasi doloremque voluptate aspernatur
          impedit aut, officiis voluptatibus unde praesentium similique,
          consequuntur recusandae. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Quaerat blanditiis iure, sequi totam minus atque
          itaque vero quasi doloremque voluptate aspernatur impedit aut,
          officiis voluptatibus unde praesentium similique, consequuntur
          recusandae. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quaerat blanditiis iure, sequi totam minus atque itaque vero quasi
          doloremque voluptate aspernatur impedit aut, officiis voluptatibus
          unde praesentium similique, consequuntur recusandae. Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Quaerat blanditiis iure, sequi
          totam minus atque itaque vero quasi doloremque voluptate aspernatur
          impedit aut, officiis voluptatibus unde praesentium similique,
          consequuntur recusandae.
        </p>
      </div>
      <div className="delete-button">
        <button type="submit" onClick={deleteJob}>
          Delete
        </button>
        <button type="submit" onClick={navigate(`/jobs`)}>
          Delete
        </button>
      </div>
    </div>
  );
}
