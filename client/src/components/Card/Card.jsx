import React from "react";
import "./Card.css";

const Card = ({ id, age, name, weight, height, image, temperament = [] }) => {
  const formattedTemperaments = temperament.join(", ");

  return (
    <div className="card">
      <img src={image} alt={name} className="card-image" />
      <div className="card-content">
        <h2 className="card-title">{name}</h2>
        <p className="card-text">Age: {age}</p>
        <p className="card-text">Height: {height}</p>
        <p className="card-text">Weight: {weight}</p>
        <p className="card-text">Temperament: {formattedTemperaments}</p>
      </div>
    </div>
  );
};

export default Card;
