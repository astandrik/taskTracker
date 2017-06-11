import {INIT_APP, SET_MATCHES, SET_PROPOSED} from "../actions/actions";

let reducer = {};

reducer.proposed = function(state = [], action) {
  switch (action.type) {
    case SET_PROPOSED:
      return action.data;
    default:
      return state;
  }
}

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