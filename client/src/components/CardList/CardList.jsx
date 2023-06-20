import React from "react";
import { Link } from "react-router-dom";
import "./CardList.css";
import Card from "../Card/Card"

const CardList = ({ allDogs }) => {
  return (
    <div className="card-list">
      {allDogs.map((dog) => (
        <Link to={`/home/${dog.id}`} key={dog.id}>
          <Card
            name={dog.name}
            age={dog.age}
            image={dog.image}
            height={dog.height}
            weight={dog.weight}
            temperament={dog.temperament}
          />
        </Link>
      ))}
    </div>
  );
};

export default CardList;
