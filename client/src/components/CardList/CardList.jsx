import React from "react";
import "./CardList.css";
import Card from "../Card/Card";

const CardList = ({ allDogs }) => {
  return (
    <div className="card-list">
      {allDogs.map((dog) => (
          <Card
            id = {dog.id}
            ket= {dog.key}
            name={dog.name}
            age={dog.age}
            image={dog.image}
            height={dog.height}
            weight={dog.weight}
            temperament={dog.temperament}
          />
      ))}
    </div>
  );
};

export default CardList;
