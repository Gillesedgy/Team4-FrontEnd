import { Link } from "react-router-dom";
import "./Job.css";
import jobImage from "../../Assets/logoJobImage.jpg";
import { languages } from "../../constants";

export default function Job({
  job: { id, job_title, company, location, native_language, posted_date, logo },
}) {
  const logoImage = logo ? logo : jobImage;

  let dateMade = new Date(posted_date);
  dateMade = dateMade.toDateString();
  let year = dateMade.split(" ").pop();
  let middle = dateMade.split(" ").splice(1, 2).join(" ");

  return (
    <Link
      className="link"
      to={`/jobs/${id}`}
      onClick={() => window.scrollTo(0, 0)}
    >
      <div className="job-container job-card">
        <div className="left-section job-card-content">
          <div className="icon-company-container">
            <img className="job-icon" src={logoImage} alt="job-icon" />
            <h4 className="company">{company}</h4>
          </div>
        </div>
        {/* Middle  */}
        <div className="middle-section job-card-title">
          <h2>{job_title}</h2>
        </div>
        {/* Right */}
        <div className="right-section job-card-p ">
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Native Language:</strong> {languages[native_language]}
          </p>
        </div>
      </div>
    </Link>
  );
}
