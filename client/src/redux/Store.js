import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  ADD_COUNT,
  REMOVE_COUNT,
  ON_SEARCH,
  GET_PRODUCT,
  FILTER_BY_CATEGORY,
  TOTAL_PRODUCT,
  CATEGORIES,
} from "./Action";

const initialState = {
  totalProds: [],
  categories: [],
  products: [],
  prodcutrandom: [],
  count: 1,
};

export function counterReducer(state = initialState, action) {
  console.log('Estado de store',state)
  switch (action.type) {
    case ADD_COUNT:
      return {
        ...state,
        count: state.count + 1,
      };
    case REMOVE_COUNT:
      return {
        ...state,
        count: state.count - 1,
      };
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        totalProds: action.payload,
      };
    case ON_SEARCH:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT:
      return {
        ...state,
        totalProds: action.payload,
      };
<<<<<<< HEAD
    case RANDOM:
      console.log("esto entra a RANDOM", state  );
      return {
        ...state,
        prodcutrandom: action.payload.value
      };
    case TOTAL_PRODUCT:
      return {
        ...state,
        totalProds: action.payload,
      };
    case CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
=======
    case TOTAL_PRODUCT:
      return {
        ...state,
        totalProds: action.payload
      }
    case CATEGORIES:
      return {
        ...state,
        categories: action.payload
      }
>>>>>>> a7a40f1b34c08f20ff769d54a96697e0b22b6f35
    default:
      return {
        state
      };
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

<<<<<<< HEAD
export default createStore(
  counterReducer,
  composeEnhancers(applyMiddleware(thunk))
);
=======
export default createStore(counterReducer, composeEnhancers(applyMiddleware(thunk)));
>>>>>>> a7a40f1b34c08f20ff769d54a96697e0b22b6f35
