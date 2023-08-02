import React from 'react';
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

const HomePage = () => {
  return (
    <div>
      <h1>Set List Generator</h1>
      <div style={{ display: "flex" }}>
        <LeftSection />
        <RightSection />
      </div>
    </div>
  );
};

export default HomePage;
