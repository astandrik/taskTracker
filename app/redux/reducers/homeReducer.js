import {INIT_APP, SET_MATCHES} from "../actions/actions";

let reducer = {};

reducer.matches = function(state= [], action) {
  switch (action.type) {
    case SET_MATCHES:
      return action.data;
    default:
      return state
  }
}

reducer.header = function(state = {}, action) {
  switch (action.type) {
    case INIT_APP:
      return action.header;
    default:
      return state;
  }
}

export default reducer;