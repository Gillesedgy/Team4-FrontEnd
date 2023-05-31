import React from "react";
// import { Link } from "react-router-dom";
// import doodle1 from "../../Assets/doodle1.png";
import MorphinWords from "../MorphinWords";
import About from "../About/About";
import Welcoming from "../../Components/Welcome/Welcoming";
import WelcomeImg from "../../Assets/welcome1white.png"
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
      <div className="doodle1">
          <img className="welcome-img" src={WelcomeImg} alt="doddle1" />
        </div>
        <About />
     

    </div>
  );
}

export default Welcome;
