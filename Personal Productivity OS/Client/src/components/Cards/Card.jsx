import React from "react";

const Card = ({ label, icon, value, color }) => {
  return (
    <div className="card">
      <div className="flex gap-2 justify-between items-center mb-3">
        <h1 className="">{label}</h1>
        <span className={`${color} text-xl rounded-full p-2`} >{icon}</span>
      </div>
      <span className="text-2xl p-2">{value}</span>
    </div>
  );
};

export default Card;
