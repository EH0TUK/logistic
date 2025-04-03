import React from 'react';
import AboutUs from '../../components/layout/aboutUs/AboutUs';
import Advantages from '../../components/layout/advantages/Advantages';
import Mission from '../../components/layout/mission/Mission';
import Values from '../../components/layout/values/Values';
import Team from '../../components/layout/team/Team';
import WhyChooseUs from '../../components/layout/whyChooseUs/WhyChooseUs';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="wrapper">
        <AboutUs />
        <Advantages />
        <Mission />
        <Values />
        <Team />
        <WhyChooseUs />
      </div>
    </div>
  );
};

export default About;