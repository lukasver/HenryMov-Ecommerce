import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  ADD_COUNT,
  REMOVE_COUNT,
  ON_SEARCH,
  GET_PRODUCT,
  FILTER_BY_CATEGORY,
  REMOVE_BY_CATEGORY,
  TOTAL_PRODUCT,
  CATEGORIES,
  DELETE_FILTER,
  CARRITO,
  DELETE_PROD,
  REMOVE_COUNT_CART,
  COUNT_CART,
  ORDER_DETAIL,
  DELETE_COUNT,
  STOCK,
  FILTER_BY_CATEGORIES,
  STARS,
  LOGIN,
  ORDER_HISTORY
} from "./Action";

const initialState = {
  totalProds: [],
  categories: [],
  products: [],
  productById: [],
  totalProdsFilter: [],
  carrito: [],
  countCart: '0',
  count: 1,
  orderDetail: [],
  orderHistory: [],
  starsSelected: 0,
  loggedIn: false
};

export function counterReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNT:
      if (action.payload > state.count){
      return {
        ...state,
        count: state.count + 1,
        }
      }else{
        return {
          ...state,
          count : action.payload
        }
      }
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload
      }
    case REMOVE_COUNT:
      return {
        ...state,
        count: state.count - 1
      };
      case DELETE_COUNT:
        return{
          ...state,
          count:1
        }
      case STOCK:
        return{
          ...state,
          count : action.payload
        }
    case FILTER_BY_CATEGORY:
      return {
        ...state,
        totalProdsFilter: state.totalProdsFilter.concat(action.payload)
      };
    case REMOVE_BY_CATEGORY:
      // Hago un map del array con elementos a quitar y filtro sobre el estado totalProdsFilter cuando matchee el id
      // del elemento a quitar con el elemento del estado totalProdsFilter
      action.payload.map(x => {
        return state.totalProdsFilter = state.totalProdsFilter.filter(f => f.id !== x.id)
      })
      return {
        ...state,
        totalProdsFilter: state.totalProdsFilter
      };
    case FILTER_BY_CATEGORIES:
      return {
        ...state,
        totalProdsFilter: action.payload
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
    case DELETE_FILTER:
      return {
        ...state,
        totalProdsFilter: [],
      };
    case CARRITO:
      return {
        ...state,
        carrito: state.carrito.concat(action.payload),
      };
    case DELETE_PROD:
      return {
        ...state,
        carrito: state.carrito.filter(!action.payload),
      };
    case COUNT_CART:
      return {
        ...state,
        countCart: action.payload,
      };
    case REMOVE_COUNT_CART:
      return {
        ...state,
        countCart: '0',
      };
    case ORDER_DETAIL:
      return {
        ...state,
        orderDetail: action.payload
      };
    case ORDER_HISTORY:
      return {
        ...state,
        orderHistory: action.payload
      };
    case STARS:
      return {
        ...state,
        starsSelected: action.payload
      };
    default:
      return state;
  }
}



export default createStore(
  counterReducer,
  compose(applyMiddleware(thunk))
);
