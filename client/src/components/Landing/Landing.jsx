import React from "react";
import { Link } from "react-router-dom";
import dogImage from "../../recourses/pngwing.com.png";
import "./Landing.css";

const Landing = () => {
  
  return (
    <div className="landing">
      <h1 className="landing-title">Welcome to the Dog's Website</h1>
      <p className="landing-description">What would you like to do?</p>
      <div className="landing-buttons">
        <Link to="/home" className="landing-button">
          Discover Dog Breeds!
        </Link>
        <Link to="/form" className="landing-button">
          Register Your Breed!
        </Link>
        {/* <Link to="/random" className="landing-link">
          Random Breed!
        </Link> */}
      </div>
      <img src={dogImage} alt="Facherito Dog" className="landing-image" />
    </div>
  );
};

export default Landing;
