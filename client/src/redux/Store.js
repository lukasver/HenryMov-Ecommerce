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
  CARRITO,
  DELETE_PROD,
  ON_SEARCH_ID,
} from "./Action";

const initialState = {
  totalProds: [],
  categories: [],
  products: [],
  productById:[],
  totalProdsFilter: [],
  carrito: [{
    name: 'Vela de Windsurf',
    description: 'Un vela para tabla de windsurf de color celeste',
    price: 23000,
    availability: true,
    stock: 3,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTHP4KrqOQd-WoLR1EAKi-PTBSBlyiAQgYlOQ&usqp=CAU'}],
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
        return{
          ...state,
          carrito: state.carrito.filter(!action.payload)
        }
        case ON_SEARCH_ID:
          return {
            ...state,
            productById: state.productById.concat(action.payload)
          }
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  counterReducer,
  composeEnhancers(applyMiddleware(thunk))
);
