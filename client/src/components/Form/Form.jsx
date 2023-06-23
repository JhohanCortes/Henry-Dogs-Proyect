import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    name: "",
    ageMin: "",
    ageMax: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    image: "",
    temperament: [],
  });

  const [error, setError] = useState({
    name: "",
    age: "",
    height: "",
    weight: "",
  });

  const validate = (inputs) => {
    const { name, ageMin, ageMax, heightMin, heightMax, weightMin, weightMax } =
      inputs;
    const errors = {};
    if (!/^[a-zA-Z\s]{5,25}$/.test(name))
      errors.name =
        "Breed name must have at least 5 characters and a maximum of 25 characters";
    if (ageMin > ageMax)
      errors.age = "Minimum age cannot be greater than the maximum";
    if (heightMin > heightMax)
      errors.height = "Minimum height cannot be greater than the maximum";
    if (weightMin > weightMax)
      errors.weight = "Minimum weight cannot exceed the maximum";
    return errors;
  };

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  const temperaments = useSelector((state) => state.temperaments);
  const [selectedTemps, setSelectedTemps] = useState([]);
  const [filter] = useState("");
  const filteredTemps = temperaments?.filter((temp) =>
    temp.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
    setError(validate({ ...inputs, [name]: value }));
  };

  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    setInputs((prevInputs) => ({
      ...prevInputs,
      temperament: [...prevInputs.temperament, selectedTemperament],
    }));
    setSelectedTemps((prevSelectedTemperaments) => [
      ...prevSelectedTemperaments,
      selectedTemperament,
    ]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const ageRange = `${inputs.ageMin} - ${inputs.ageMax}`;
    const heightRange = `${inputs.heightMin} - ${inputs.heightMax}`;
    const weightRange = `${inputs.weightMin} - ${inputs.weightMax}`;
  
    const errors = validate(inputs);
  
    if (Object.keys(errors).length > 0) {
      // Si hay errores, mostrar mensaje de error y no enviar el formulario
      setError(errors);
      return;
    }
  
    dispatch(
      postDog({
        name: inputs.name,
        image: inputs.image,
        temperament: inputs.temperament,
        age: ageRange,
        height: heightRange,
        weight: weightRange,
      })
    );
  
    setInputs({
      name: "",
      ageMin: "",
      ageMax: "",
      heightMin: "",
      heightMax: "",
      weightMin: "",
      weightMax: "",
      image: "",
      temperament: [],
    });
    setSelectedTemps([]);
    setError({});
  };
  
  const handleRemove = (temperament) => {
    setSelectedTemps((prevSelectedTemps) =>
      prevSelectedTemps.filter((temp) => temp !== temperament)
    );
  };

  return (
    <div className="container">
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <h1 className="title">Register a Breed!</h1>
          <div className="field">
            <label className="label">Breed Name:</label>
            <input
              type="text"
              value={inputs.name}
              name="name"
              onChange={handleChange}
              className="input"
              placeholder="Enter the breed name"
            />
            {error.name && <span className="error">{error.name}</span>}
          </div>
          <div className="field">
            <label className="label">Age Range:</label>
            <div className="rangeInputs">
              <input
                type="number"
                value={inputs.ageMin}
                name="ageMin"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Min Age"
              />
              <span className="rangeSeparator">-</span>
              <input
                type="number"
                value={inputs.ageMax}
                name="ageMax"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Max Age"
              />
            </div>
            {error.age && <span className="error">{error.age}</span>}
          </div>
          <div className="field">
            <label className="label">Height Range:</label>
            <div className="rangeInputs">
              <input
                type="number"
                value={inputs.heightMin}
                name="heightMin"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Min Height"
              />
              <span className="rangeSeparator">-</span>
              <input
                type="number"
                value={inputs.heightMax}
                name="heightMax"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Max Height"
              />
            </div>
            {error.height && <span className="error">{error.height}</span>}
          </div>
          <div className="field">
            <label className="label">Weight Range:</label>
            <div className="rangeInputs">
              <input
                type="number"
                value={inputs.weightMin}
                name="weightMin"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Min Weight"
              />
              <span className="rangeSeparator">-</span>
              <input
                type="number"
                value={inputs.weightMax}
                name="weightMax"
                onChange={handleChange}
                className="input rangeInput"
                placeholder="Max Weight"
              />
            </div>
            {error.weight && <span className="error">{error.weight}</span>}
          </div>
          <div className="field">
            <label className="label">Image URL:</label>
            <input
              type="text"
              value={inputs.image}
              name="image"
              onChange={handleChange}
              className="input"
              placeholder="Enter the image URL"
            />
          </div>
          <div className="field">
            <label className="label">Temperament:</label>
            <select className="select" value={filter} onChange={handleSelect}>
              <option value="">Select a temperament</option>
              {filteredTemps &&
                filteredTemps.map((temp) => (
                  <option value={temp} key={temp}>
                    {temp}
                  </option>
                ))}
            </select>

            <div className="selectedTemps">
              {selectedTemps.map((temp) => (
                <div className="selectedTemp" key={temp}>
                  <span>{temp}</span>
                  <button
                    className="removeButton"
                    onClick={() => handleRemove(temp)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="createButton">
            Create Breed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
