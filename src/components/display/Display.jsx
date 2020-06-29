import React from "react";
import "./Display.css";

const Display = ({ condition, result }) => {
  return (
    <div className="display">
      <div className='condition'>{condition}</div>
      <div className='result'>{result}</div>
    </div>
  );
};

export default Display;
