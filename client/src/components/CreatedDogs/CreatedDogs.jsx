import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card/Card";

const CreatedDogs = () => {
  const createdDogs = useSelector((state) => state.dogs.filter((dog) => dog.createInDb));

  return (
    <div>
      <h1>Your Created Dogs</h1>
      {createdDogs.length > 0 ? (
        <div className="card-container">
          {createdDogs.map((dog) => (
            <Card
              key={dog.id}
              id={dog.id}
              name={dog.name}
              age={dog.age}
              weight={dog.weight}
              height={dog.height}
              image={dog.image}
              temperament={dog.temperament}
            />
          ))}
        </div>
      ) : (
        <p>No dogs created yet.</p>
      )}
    </div>
  );
};

export default CreatedDogs;
