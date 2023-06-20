import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRandomBreed } from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";
import "./RandomDog.css";

const RandomDog = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const dog = useSelector((state) => state.selectedDog);

  useEffect(() => {
    dispatch(getRandomBreed());
  }, [dispatch]);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    if (dog && !isRedirecting) {
      setIsLoading(false);
      setIsRedirecting(true);
      history.push(`/random/${dog.id}`);
    }
  }, [dog, isRedirecting, history]);

  if (isLoading) {
    return (
      <div className="loading-message">
        <p>Loading...</p>
      </div>
    );
  }

  if (!dog) {
    return (
      <div className="warning-message">
        <p>No existe este perro</p>
      </div>
    );
  }
  console.log(dog)
  return (
    <div className="details">
      <button className="back-button" onClick={goBack}>
        Back
      </button>
      <h2 className="details-title">{dog.name}</h2>
      <img src={dog.image} alt={dog.name} className="details-image" />
      <p className="details-text">Age: {dog.age}</p>
      <p className="details-text">Height: {dog.height}</p>
      <p className="details-text">Weight: {dog.weight}</p>
      <p className="details-text">
        Temperament: {dog.temperament.join(", ")}
      </p>
    </div>
  );
};

export default RandomDog;
