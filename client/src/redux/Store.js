import { createStore ,compose, applyMiddleware} from "redux";
import  thunk from 'redux-thunk';
import{ ADD_COUNT, REMOVE_COUNT} from './Action'


const initialState = {
    count : 1
}


export  function counterReducer (state = initialState, action) {
    switch (action.type) {
        case ADD_COUNT:
            return {
                ...state,
                   count: state.count+1 
            }
        case REMOVE_COUNT:
            return {
                ...state,
                count: state.count-1 
            }
        default:
            return state;
    }
}


export default createStore(counterReducer, compose( applyMiddleware( thunk )));