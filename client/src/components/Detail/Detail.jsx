import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getById } from "../../redux/actions/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./Detail.css";

const CardDetails = ({ match }) => {

  const history = useHistory();

  console.log(match.params.id);
  const dispatch = useDispatch();
  const dog = useSelector((state) => state.selectedDog);

  const goBack = () => {
    history.goBack();
  };

  useEffect(() => {
    const dogId = match.params.id;
    dispatch(getById(dogId));
  }, [dispatch, match.params.id]);

  if (dog) {
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
        <p className="details-text">
          Temperament: {formattedTemperaments}
        </p>
      </div>
    );
  } else {
    return (
      <div className="warning-message">
        <p>No existe este perro</p>
      </div>
    );
  }
};

export default CardDetails;
