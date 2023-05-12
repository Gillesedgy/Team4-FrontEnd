import React from "react";
import "./Welcome.css";
import { Link } from "react-router-dom";

function Welcome() {
  const languageFlip = [
    "Welcome!",
    "bienvenido!",
    "স্বাগতম!",
    "مرحباً!",
    "स्वागत!",
    "いらっしゃいませ!",
    "欢迎!",
    "akeyi!",
    "maligayang pagdating!",
    "خوش آمدید!",
    
  ]
  return (
    <div className="welcome-page">
      <div className="welcometext">Welcome!</div>
      <p className="welcome_p">lets find you, your community</p>
        <div className="welcome-btn-div">
         <Link to={`/login`}>
        <button className="welcome-btn">Get Started</button>
      </Link>
      </div>
      {/* <img className="doodle1" src='./doodle1.png'
      alt="doddle1"
      width={100} height={100}/> */}
     
    
     
    </div>
  );
}

export default Welcome;
