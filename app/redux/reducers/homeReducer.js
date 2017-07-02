import {SET_TASKS,SET_HEADER, SET_TOKEN, CHANGE_POSITIONS} from "../actions/actions";
import helpers from "../../helperFunctions/helpers";
let reducer = {};


reducer.tasks = function(state = [], action) {
  switch (action.type) {
    case SET_TASKS:
      return action.data
    case CHANGE_POSITIONS:
      let positions = action.positions;
      let tasks = JSON.parse(JSON.stringify(state));
      tasks.forEach(x => x.position = positions[x.id]);
      return tasks.sort((a,b) => a.position - b.position);
    default:
      return state;
  }
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

reducer.token = function(state = '', action) {
  switch (action.type) {
    case SET_TOKEN:
      return action.data
    default:
      return getCookie("token") ? getCookie("token") : state;
  }
}

reducer.header = function(state = "", action) {
  switch (action.type) {
    case SET_HEADER:
      return action.header;
    default:
      return state;
  }
}

export default reducer;