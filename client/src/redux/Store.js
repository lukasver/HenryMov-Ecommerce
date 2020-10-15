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
  DELETE_FILTER,
  totalProds
} from "./Action";

const initialState = {
  totalProds: [],
  categories: [],
  products: [],
  totalProdsFilter: [],
  count: 1,
};

export function counterReducer(state = initialState, action) {
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
        totalProdsFilter: state.totalProdsFilter.concat(action.payload),
      };
    case ON_SEARCH:
      return {
        ...state,
        products: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        totalProds: action.payload,
      };
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
      case DELETE_FILTER:
        return {
          ...state,
          totalProdsFilter: []
        }
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(counterReducer, composeEnhancers(applyMiddleware(thunk)));
