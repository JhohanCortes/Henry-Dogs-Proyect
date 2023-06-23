import {
  GET_BY_ID,
  GET_BY_NAME,
  GET_DOGS,
  GET_TEMPERAMENTS,
  POST_DOG,
  FILTER_BY_TEMPERAMENT,
  FILTER_BY_WEIGHT,
  FILTER_BY_HEIGHT,
  FILTER_BY_ORIGIN,
  FILTER_BY_NAME,
  SET_RANDOM_BREED,
  FILTER_BY_CREATED,
  FILTER_BY_AGE,
  RESET_SELECTED_DOG, // Nueva acción de reset
} from "../actions/actions-types.js";

// acá se hacen los cambios de estado y asi mismo actualizar el mismo

const initialState = {
  dogs: [],
  dogsCopy: [],
  temperaments: [],
  details: [],
  error: null,
  selectedDog: null,
  randomBreed: null,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DOGS:
      return {
        ...state,
        dogs: payload,
        dogsCopy: payload,
      };

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: payload,
      };

    case GET_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };

    case GET_BY_ID:
      return {
        ...state,
        selectedDog: payload,
      };

    case POST_DOG:
      return {
        ...state,
        dogs: [...state.dogs, payload],
      };

    case SET_RANDOM_BREED:
      return {
        ...state,
        selectedDog: payload,
      };

    case FILTER_BY_CREATED:
      const createdDogs = state.dogsCopy.filter(
        (dog) => dog.createInDb === payload
      );
      return {
        ...state,
        dogs: createdDogs,
      };

    case FILTER_BY_TEMPERAMENT:
      const allDogs = state.dogsCopy;
      const filterDog =
        payload === "All"
          ? allDogs
          : allDogs.filter((dog) => dog.temperament?.includes(payload));
      const filterDb = [];
      allDogs.forEach((dog) => {
        if (typeof dog.id === "string") {
          dog.temperament?.forEach((tempDb) => {
            if (tempDb === payload) filterDb.push(tempDb);
          });
        }
      });
      return {
        ...state,
        dogs: filterDog.concat(filterDb),
        error: null,
      };

    case FILTER_BY_WEIGHT:
      const sortedDogsByWeight = [...state.dogs];

      sortedDogsByWeight.sort((first, second) => {
        const parseWeight = (weight) => {
          const parts = weight.split(" - ");
          const average = parts.reduce((sum, part) => sum + parseInt(part), 0);
          return isNaN(average) ? Infinity : average;
        };
        const weightFirst = parseWeight(first.weight);
        const weightSecond = parseWeight(second.weight);
        return weightFirst - weightSecond;
      });
      return {
        ...state,
        dogs: sortedDogsByWeight,
        error: null,
      };

    case FILTER_BY_HEIGHT:
      const sortedDogsByHeight = [...state.dogs];

      sortedDogsByHeight.sort((first, second) => {
        const parseHeight = (height) => {
          const parts = height.split(" - ");
          const average =
            parts.reduce((sum, part) => sum + parseInt(part), 0) / parts.length;
          return isNaN(average) ? -1 : average;
        };
        const heightFirst = parseHeight(first.height);
        const heightSecond = parseHeight(second.height);

        return heightFirst - heightSecond;
      });
      return {
        ...state,
        dogs: sortedDogsByHeight,
        error: null,
      };

    case FILTER_BY_ORIGIN:
      const originDogs = state.dogsCopy;
      const filterDogs = originDogs.filter((dog) =>
        payload === "api" ? dog.createInDb : !dog.createInDb
      );
      return {
        ...state,
        dogs: filterDogs,
      };

    case FILTER_BY_NAME:
      const sortedDogs = [...state.dogs];
      sortedDogs.sort((dogA, dogB) => {
        if (dogA.name > dogB.name) {
          return 1;
        }
        if (dogB.name > dogA.name) {
          return -1;
        }
        return 0;
      });
      return {
        ...state,
        dogs: sortedDogs,
      };

    case FILTER_BY_AGE:
      const sortedDogsByAge = [...state.dogs];
      sortedDogsByAge.sort((first, second) => {
        const parseAge = (age) => {
          const parts = age.split(" - ");
          const average = parts.reduce((sum, part) => sum + parseInt(part), 0);
          return isNaN(average) ? Infinity : average;
        };
        const ageFirst = parseAge(first.age);
        const ageSecond = parseAge(second.age);

        return ageFirst - ageSecond;
      });
      return {
        ...state,
        dogs: sortedDogsByAge,
      };

    case RESET_SELECTED_DOG:
      return {
        ...state,
        selectedDog: null,
      };
    default:
      return { ...state };
  }
};

export default reducer;
