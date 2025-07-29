import React from 'react';
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const About = () => {
  return (
    <section className='about' id='about'>
      <div className='container'>
        <div className='banner'>
          <div className='top'>
            <h1 className='heading'>ABOUT US</h1>
            <p>The only things we're serious about is food</p>
          </div>
          <p className='mid'>
            At Debansu, we're passionate about serving delicious food that's made with love and care. Our chefs use only the freshest ingredients to craft dishes that are both flavorful and visually stunning. We're dedicated to providing an exceptional dining experience that leaves you feeling full and satisfied.
          </p>
          <Link to={"/"}>
            Explore Menu{" "}
            <span>
              <HiOutlineArrowNarrowRight />
            </span>
          </Link>
        </div>
        <div className="banner">
          <img src="/about.png" alt="about" />
        </div>
      </div>
    </section>
  );
};

export default About;