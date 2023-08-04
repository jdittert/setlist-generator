import React from "react";

const OptionsList = ({ options }) => {
  return (
    <div>
      <h2>{options && options.length > 0 ? "Generated Option" : "No Option"}</h2>
      {options && options.length > 0 ? 
      <ul>
        {options.map((song, index) => (
          <li key={index}>{song.title}</li>
        ))}
      </ul> :
      <div>Click &quot;Generate&quot; to see a random selection.</div>
        }
    </div>
  );
};

export default OptionsList;
