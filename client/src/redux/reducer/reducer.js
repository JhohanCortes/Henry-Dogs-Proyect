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
  FILTER_BY_AGE,
  INVERT_DOGS_STATE,
  CLEAR_FILTERS,
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
        dogs: filterDog.concat(filterDb), // Concatenar los perros filtrados y los temperamentos encontrados
        error: null,
      };

    case FILTER_BY_WEIGHT:
      const sortedDogsByWeight = [...state.dogs];

      sortedDogsByWeight.sort((first, second) => {
        const parseWeight = (weight) => {
          const parts = weight.split(" - ");
          const minWeight = parseInt(parts[0]);
          const maxWeight = parseInt(parts[1]);

          return {
            min: isNaN(minWeight) ? Infinity : minWeight,
            max: isNaN(maxWeight) ? Infinity : maxWeight,
          };
        };

        const weightFirst = parseWeight(first.weight);
        const weightSecond = parseWeight(second.weight);

        if (payload === "asc") {
          return weightFirst.min - weightSecond.min;
        } else if (payload === "desc") {
          return weightSecond.max - weightFirst.max;
        }

        return 0;
      });

      return {
        ...state,
        dogs: sortedDogsByWeight,
      };

      case FILTER_BY_HEIGHT:
        const sortedDogsByHeight = [...state.dogs];
    
        sortedDogsByHeight.sort((first, second) => {
          const parseHeight = (height) => {
            const parts = height.split(" - ");
            const minHeight = parseInt(parts[0]);
            const maxHeight = parseInt(parts[1]);
    
            return {
              min: isNaN(minHeight) ? -1 : minHeight,
              max: isNaN(maxHeight) ? -1 : maxHeight,
            };
          };
    
          const heightFirst = parseHeight(first.height);
          const heightSecond = parseHeight(second.height);
    
          if (payload === "asc") {
            return heightFirst.min - heightSecond.min;
          } else if (payload === "desc") {
            return heightSecond.max - heightFirst.max;
          }
    
          return 0;
        });
    
        return {
          ...state,
          dogs: sortedDogsByHeight,
        };


        case FILTER_BY_NAME:
          let sortedDogs = [...state.dogs];
          if (payload === "asc") {
            sortedDogs.sort((dogA, dogB) => dogA.name.localeCompare(dogB.name));
          } else if (payload === "desc") {
            sortedDogs.sort((dogA, dogB) => dogB.name.localeCompare(dogA.name));
          }
          return {
            ...state,
            dogs: sortedDogs,
          };
        

    case FILTER_BY_AGE:
      const sortedDogsByAge = [...state.dogs];

      sortedDogsByAge.sort((first, second) => {
        const parseAge = (age) => {
          const parts = age.split(" - ");
          const minAge = parseInt(parts[0]);
          const maxAge = parseInt(parts[1]);

          return {
            min: isNaN(minAge) ? Infinity : minAge,
            max: isNaN(maxAge) ? -Infinity : maxAge,
          };
        };

        const ageFirst = parseAge(first.age);
        const ageSecond = parseAge(second.age);

        if (payload === "asc") {
          return ageFirst.min - ageSecond.min;
        } else if (payload === "desc") {
          return ageSecond.max - ageFirst.max;
        }

        return 0; // No se especificó un payload válido, no se realiza ordenamiento
      });

      return {
        ...state,
        dogs: sortedDogsByAge,
      };

      
    case FILTER_BY_ORIGIN:
      let filterDogs = state.dogsCopy;

      if (payload === "all") {
        return {
          ...state,
          dogs: filterDogs,
        };
      } else {
        filterDogs = filterDogs.filter((dog) =>
          payload === "created" ? dog.createInDb : !dog.createInDb
        );
      }

      return {
        ...state,
        dogs: filterDogs,
      };

      case INVERT_DOGS_STATE:
        return {
          ...state,
          dogs: [...state.dogs].reverse(),
        };

      case CLEAR_FILTERS:
      return {
        ...state,
        dogs: state.dogsCopy
      }

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
