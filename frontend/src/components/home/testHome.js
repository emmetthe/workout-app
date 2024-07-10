import React from 'react';
import Hero from './hero/testHero';
import Features from './features/features';
// import Video from './video/video';
import AboutSectionOne from './about/AboutSectionOne'
import AboutSectionTwo from './about/AboutSectionTwo';

const TestHome = () => {
  return (
    <>
      <Hero />
      <Features />
      {/* <Video /> */}
      <AboutSectionOne />
      <AboutSectionTwo />
    </>
  );
};

export default TestHome;
