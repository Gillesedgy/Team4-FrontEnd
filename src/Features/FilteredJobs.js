import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Job from "../Components/Jobs/Job";

const API = process.env.REACT_APP_API_URL;

export default function FilteredJobs({ selectedLanguage }) {
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/jobs?language=${selectedLanguage}`)
      .then((res) => {
        console.log(res.data);
        setFiltered(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [selectedLanguage]);

  return (
    <>
      {filtered.length > 0 ? (
        filtered.map((job) => {
          return <Job key={job.id} job={job} />;
        })
      ) : (
        <h3 className="no_results">
          Sorry, there are no jobs right now that match that language
          preference!
        </h3>
      )}
    </>
  );
}
