import {
  GET_BY_ID,
  GET_DOGS,
  GET_TEMPERAMENTS,
  GET_BY_NAME,
  POST_DOG,
  FILTER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_HEIGHT,
  FILTER_BY_ORIGIN,
  FILTER_BY_NAME,
  DELETE_DOG,
  DELETE_DOG_ID,
  SET_RANDOM_BREED
} from "./actions-types";
import axios from "axios";

export const getDogs = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/dogs");
      dispatch({
        type: GET_DOGS,
        payload: response.data,
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getTemperaments = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/temps");
      dispatch({
        type: GET_TEMPERAMENTS,
        payload: [...response.data?.map((temperament) => temperament.name)],
      });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const getByName = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/dogs?name=${name}`
      );
      if (!response.data.length) {
        throw new Error("Dog not found");
      }
      dispatch({ type: GET_BY_NAME, payload: response.data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const getById = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/dogs/${id}`);
      return dispatch({ type: GET_BY_ID, payload: response.data });
    } catch (error) {
      console.error(error.message);
    }
  };
};

export const postDog = (dog) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("http://localhost:3001/dogs", dog);
      dispatch({ type: POST_DOG, payload: response.data });
      alert("Perro creado correctamente");
      return response;
    } catch (error) {
      alert(error.message);
    }
  };
};

export const getRandomBreed = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3001/dogs/random");
      const randomBreed = response.data; // Suponiendo que la API devuelve un objeto con los datos de la raza de perro aleatoria
      // Realiza alguna acción con la raza de perro aleatoria obtenida, como almacenarla en el estado de Redux
      dispatch({ type:   SET_RANDOM_BREED, payload: randomBreed });
    } catch (error) {
      console.error("Error occurred while fetching random breed:", error);
    }
  };
};

export const FilterByTemperament = (payload) => {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
};

export const FilterByWeight = (payload) => {
  return {
    type: FILTER_BY_WEIGHT,
    payload,
  };
};

export const FilterByHeight = (payload) => {
  return {
    type: FILTER_BY_HEIGHT,
    payload,
  };
};
export const FilterByOrigin = (payload) => {
  return {
    type: FILTER_BY_ORIGIN,
    payload,
  };
};
export const FilterByName = (payload) => {
  return {
    type: FILTER_BY_NAME,
    payload,
  };
};

export const deleteDog = (id) => async (dispatch) => {
  try {
    if (!id) {
      throw new Error("Invalid ID");
    }
    const response = await axios.delete(
      `http://localhost:3001/dogs/delete/${id}`
    );
    dispatch({
      type: DELETE_DOG,
      payload: response.data,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const deleteDogId = () => {
  return {
    type: DELETE_DOG_ID,
  };
};
