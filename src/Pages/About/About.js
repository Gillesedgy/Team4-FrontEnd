import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
import communityAbout from "../../Assets/community-about1.png";
import jobAbout from "../../Assets/job-about3.png";
import rentalAbout from "../../Assets/rental-about5.png";

function About() {
  return (
    <div className="page">
      <div className="about-title">
        <h1>
          Speak Your Language <br /> Find Your place!
        </h1>
      </div>
      <div className="boxes">
        <div className="box">
          <div className="rentals-about">
            <div className="about-img">
              <img src={rentalAbout} alt="rental" width={300} height={280} />
            </div>
            <div className="about-text">
              <h1>Find Housing</h1>
              <p>
                Connect with locals who listed affordable housing options not
                availble on other competetive markets, no credit checks or income threshold requirements.
              </p>
              <Link to="/listings">
                <button className="About-btn">See More..</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="stagger box">
          <div className="jobs-about">
          <div className="about-img">
              <img src={jobAbout} alt="community-about1" width={300} height={250}
 />
            </div>
            <div className="about-text">
              <h1>Find a Job</h1>
              <p>
                Find work within your community quickly to start building
                towards your new life, without the hastle of extensive resume or interview process.
              </p>
              <Link to="/jobs">
                <button className="About-btn">See More..</button>
              </Link>
            </div>
          
          </div>
        </div>

        <div className="box">
          <div className="community-about">
            <div className="about-img">
              <img
                src={communityAbout}
                alt="community-about1"
                width={300}
                height={250}
              />
            </div>
            <div className="about-text">
              <h1>Connect with people like you!</h1>
              <p>
                Engage with others who speak your native language and who also
                are new to NYC, though posting and commenting in the community
                board!
              </p>
              <Link to="/communityBoard">
                <button className="About-btn">See More..</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
