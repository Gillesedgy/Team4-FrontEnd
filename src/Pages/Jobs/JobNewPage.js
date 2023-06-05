import React from "react";
import NewJobs from "../../Components/Jobs/NewJob";
import "../../Components/Jobs/form.css";
export default function JobNewPage() {
  return (
    <div className="new-jop-page">
      {/* <h2>New Job Post</h2> */}
      <NewJobs />
    </div>
  );
}
