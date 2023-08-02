import React from "react";

const OptionsList = ({ options }) => {
  return (
    <div>
      <h2>{options.length > 0 ? "Generated Option" : "No Option"}</h2>
      <ul>
        {options.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default OptionsList;
