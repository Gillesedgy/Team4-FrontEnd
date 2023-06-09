import React, { useEffect } from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";
import doodle1 from "../../Assets/doodle1.png";
import doodleLeft from "../../Assets/doodleleft.png";
import orangeArrow from "../../Assets/orangearrow.gif"

function Welcoming() {

  useEffect(() => {
    
  }, [])

  return (
    <div className="welcome-page">
      <div>
        <p className="welcome_p">Find Your Community</p>
      </div>
      <div className="welcome-btn-div">
        <div className="doodle1">
          <img className="doodle-img" src={doodle1} alt="doddle1"  />
        </div>

        <div>
          <Link to={`/login`}>
            <button className="welcome-btn">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcoming;