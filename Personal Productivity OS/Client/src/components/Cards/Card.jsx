import React from "react";

const Card = ({ label, icon, value }) => {
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-3">
        <h1 className="">{label}</h1>
        <span>{icon}</span>
      </div>
      <span>{value}</span>
    </div>
  );
};

export default Card;
