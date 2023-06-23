import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById, resetSelectedDog } from "../../redux/actions/actions";
import { useHistory } from "react-router-dom";
import "./Detail.css";
import doge from "../../recourses/doge.png"

const CardDetails = ({ match }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.selectedDog);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const dogId = match.params.id;
    dispatch(getById(dogId));

    // Función de limpieza
    return () => {
      dispatch(resetSelectedDog()); // Restablecer el perro seleccionado a nulo
    };
  }, [dispatch, match.params.id]);

  if (!dog) {
    return (
      <div className="loading-spinner">
          <img src={doge} alt="Loading" />
          <p>LOADING DOG!</p>
        </div>
    );
  }

  const { name, age, weight, height, image, temperament } = dog;
  const formattedTemperaments = temperament.join(", ");

  return (
    <div className="details">
      <button className="back-button" onClick={goBack}>
        Back
      </button>
      <h2 className="details-title">{name}</h2>
      <img src={image} alt={name} className="details-image" />
      <p className="details-text">Age: {age}</p>
      <p className="details-text">Height: {height}</p>
      <p className="details-text">Weight: {weight}</p>
      <p className="details-text">Temperament: {formattedTemperaments}</p>
    </div>
  );
};

export default CardDetails;
