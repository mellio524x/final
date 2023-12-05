import React from "react";

import { Link } from "react-router-dom";
import "../pages/homepage.css";
import indoor from "../assets/images/indoor.jpg";

const Homepage = () => {
  return (
    <div className="homepage">
      <div className="left-image">
        <img src={indoor} alt="Left" />
      </div>
      <div className="middle-content">
        <h1>Welcome to Event+</h1>
        <p>Your go-to platform for events and more.</p>
        <div>
          <Link to="/login">
            <button className="mx-4 hover:text-orange-400 font-semibold bg-black text-white py-1 px-6 text-xl rounded-full hover:scale-105 hover:drop-shadow-md hover:cursor-pointer">
              Sign In
            </button>
          </Link>
          <Link to="/signup">
            <button className="mx-4 hover:text-orange-400 font-semibold bg-black text-white py-1 px-6 text-xl rounded-full hover:scale-105 hover:drop-shadow-md hover:cursor-pointer">
              Register
            </button>
          </Link>
        </div>
      </div>
      <div className="right-image">
        <img src={indoor} alt="Right" />
      </div>
    </div>
  );
};

export default Homepage;
