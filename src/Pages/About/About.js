import React from "react";
import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="page">
    <div className="box rentals-about">
      <h1>Find Housing</h1>
      <p>
        Connect with locals who have affordable housing options not listed on
        the market.
      </p>
      <Link to="/listings">
        <button className="About-btn">See More..</button>
      </Link>
    </div>
    <div className="box jobs-about">
      <h1>Find a Job</h1>
      <p>
        Find work within your community quickly to start building towards your
        new life.
      </p>
      <Link to="/jobs">
        <button className="About-btn">See More..</button>
      </Link>
    </div>
    <div className="box community-about">
      <h1>Connect with people like you!</h1>
      <p>
        Engage with others who speak your native language and who also are new
        to NYC, <br /> though posting and commenting in the community board!
      </p>
      <Link to="/communityBoard">
        <button className="About-btn">See More..</button>
      </Link>
    </div>
  </div>
  
  );
}

export default About;
