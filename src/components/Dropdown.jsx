import React, { useState } from "react";

function Dropdown({options}) {
const [selectedOption, setSelectedOption] = useState("Popular");

  return (
    <React.Fragment>
    <select
      className="font-bold border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
    >
      {options.map((o, index) => (
        <option key={index} value={o.value} className="px-10 m-10">
          {o.title}
        </option>
      ))}
    </select>
    </React.Fragment>
  );
}

export default Dropdown;
