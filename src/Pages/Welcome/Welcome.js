import React from "react";
// import { Link } from "react-router-dom";
// import doodle1 from "../../Assets/doodle1.png";
import MorphinWords from "./MorphinWords";
import About from "../About/About";
import Welcoming from "../../Components/Welcome/Welcoming";
import WelcomeImg from "../../Assets/welcome-transparent.png"
import downArrow from "../../Assets/downarrow.gif"

import "./welcomepg.css"
// import Profile from "../Profile/Profile";
// import { useContextProvider } from "../../Provider";


function Welcome() {

 
  return (
    <div >
      <div className="welcometext">
          <MorphinWords />
      </div>
     
      <Welcoming />
      <div className="welcome-image-container">
        <div className="people-image-container">
          <img className="welcome-img" src={WelcomeImg} alt="doddle1" />
        </div>
         
        <div className="welcome-doodle-container">
          <img className="welcome-doodle" src={downArrow} alt="downarrow"/>
        </div>

      </div>
        <About />
     

    </div>
  );
}

export default Welcome;
