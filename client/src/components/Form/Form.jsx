import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postDog, getTemperaments } from "../../redux/actions/actions";
import "./Form.css";

const Form = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    id: "",
    name: "",
    height: "",
    weight: "",
    age: "",
    image: "",
    createInDb: "",
    temperament: [],
    temperaments: [],
  });

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
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSelect = (event) => {
    const selectedTemperament = event.target.value;
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, selectedTemperament],
      temperaments: Array.isArray(prevInput.temperaments)
        ? [...prevInput.temperaments, selectedTemperament]
        : [selectedTemperament],
    }));
    setSelectedTemps((prevSelectedTemperaments) => [
      ...prevSelectedTemperaments,
      selectedTemperament,
    ]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(postDog(input));
    setInput({
      id: "",
      name: "",
      height: "",
      weight: "",
      age: "",
      image: "",
      createInDb: "",
      temperament: [],
      temperaments: [],
    });
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
          <div>
            <h1 className="title">Register a breed!</h1>
            <div className="field">
              <label className="label">Breed:</label>
              <input
                type="text"
                value={input.name}
                name="name"
                onChange={handleChange}
                className="input"
                placeholder="Breed name"
              />
            </div>
            <div className="field">
              <label className="label">Height:</label>
              <input
                type="text"
                value={input.height}
                name="height"
                onChange={handleChange}
                className="input"
                placeholder="Min height - Max height"
              />
            </div>
            <div className="field">
              <label className="label">Weight:</label>
              <input
                type="text"
                value={input.weight}
                name="weight"
                onChange={handleChange}
                className="input"
                placeholder="Min weight - Max weight"
              />
            </div>
            <div className="field">
              <label className="label">Life Expectancy:</label>
              <input
                type="text"
                value={input.age}
                name="age"
                onChange={handleChange}
                className="input"
                placeholder="Min - Max"
              />
            </div>
            <div className="field">
              <label className="label">Image URL:</label>
              <input
                type="text"
                value={input.image}
                name="image"
                onChange={handleChange}
                className="input"
                placeholder="http://example.com"
              />
            </div>
            <div className="field">
              <label htmlFor="temperament" className="label">
                Temperament:
              </label>
              <select
                id="temperaments"
                onChange={handleSelect}
                className="select"
              >
                <option value="">Select</option>
                {filteredTemps?.sort().map((temp) => (
                  <option key={temp} value={temp}>
                    {temp}
                  </option>
                ))}
              </select>
              <div className="selectedTemps">
                {selectedTemps?.sort().map((temp) => (
                  <div key={temp?.id} className="selectedTemp">
                    <span>{temp}</span>
                    <button
                      type="button"
                      onClick={() => handleRemove(temp)}
                      className="removeButton"
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button type="submit" className="createButton">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
