import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

const NotFound = () => {
  return (
    <footer>
      <div className="container">
        <div className="banner">
          <div className="left">Debansu</div>
          <div className="right">
            <p>Santoshpur,Kolkata-700066,India</p>
            <p>Open:11pm-2pm</p>
          </div>
        </div>
        <div className="banner">
          <div className="left">
            <p>Develop By Debansu</p>
          </div>
          <div className="right">
            <p>All Rights Reserved By Team Debansu</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NotFound;
