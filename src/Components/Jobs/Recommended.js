import { Link } from "react-router-dom";
import "./rec.css";
import jobImage from "../../Assets/logoJobImage.jpg";
export default function Recommended({
  rec: { id, job_title, company, logo },
  icon,
}) {
  // Logo handler
  const logoImage = logo ? logo : jobImage;
  return (
    <div className="recommended">
      <Link to={`/jobs/${id}`}>
        {" "}
        <div className="img-details">
          <img className="img" src={logoImage} alt="job_icon" />
          <h5>{job_title}</h5>@<p className="recommendedP">{company}</p>
        </div>
      </Link>
    </div>
  );
}
