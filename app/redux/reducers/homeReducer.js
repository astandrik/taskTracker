import {INIT_APP} from "../actions/actions";

let reducer = {};

reducer.header = function(state = {}, action) {  
  switch (action.type) {
    case INIT_APP:
      return action.header;
    default:
      return state;
  }
}

export default reducer;