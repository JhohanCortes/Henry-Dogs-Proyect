// actions.js

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
  FILTER_BY_AGE,
  INVERT_DOGS_STATE,
  CLEAR_FILTERS,
  RESET_SELECTED_DOG, // Nueva acción de reset
} from "./actions-types";
import axios from "axios";

  // acá se hacen las solicitudes a el backend

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

export const FilterByAge = (payload) => {
  return {
    type: FILTER_BY_AGE,
    payload,
  };
};

export const invertDogsState = () => {
  return {
    type: INVERT_DOGS_STATE
  }
}

export const clearFilters = () => {
  return {
    type: CLEAR_FILTERS
  }
}

export const resetSelectedDog = () => {
  return {
    type: RESET_SELECTED_DOG,
  };
};
