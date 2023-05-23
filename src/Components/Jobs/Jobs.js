import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Job from "./Job";
import { RiFileAddLine } from "react-icons/ri";
// import {CgFolderAdd} from 'react-icons/cg'
const API = process.env.REACT_APP_API_URL;
export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API}/jobs`)
      .then((res) => {
        console.log(res.data)
        setJobs(res.data);
      })
      .catch((error) => console.warn(error));
  }, []);



  return (
    <div className="jobs">
      {/* <div className="title-button"> */}{" "}
      <h2 className="jobs-title">
        Current Jobs{" "}
        <button onClick={() => navigate(`/jobs/new`)} className="add-button">
          <RiFileAddLine />
        </button>
      </h2>
      {/* </div> */}
      {jobs.map((job) => {
        return <Job job={job} key={job.id} />;
      })}
    </div>
  );
}
