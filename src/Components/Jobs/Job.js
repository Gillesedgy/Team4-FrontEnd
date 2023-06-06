import { Link } from "react-router-dom";
import "./Job.css";
import jobImage from "../../Assets/logoJobImage.jpg";
export default function Job({
  job: { id, job_title, company, location, native_language, posted_date, logo },
}) {
  // Image Place holder
  const logoImage = logo ? logo : jobImage;

  let dateMade = new Date(posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");

  return (
    <Link className="link" to={`/jobs/${id}`}>
      <div className="job-container">
        <div className="left-section">
          <div className="icon-company-container">
            <img className="job-icon" src={logoImage} alt="job-icon" />
            <h4 className="company">{company}</h4>
          </div>
        </div>
        {/* Middle  */}
        <div className="middle-section">
          <h2>{job_title}</h2>
        </div>
        {/* Right */}
        <div className="right-section">
          <p>
            <em>Posted Date:</em> {middle}, {year}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Native Language:</strong> {native_language}
          </p>
        </div>
      </div>{" "}
    </Link>
  );
}
