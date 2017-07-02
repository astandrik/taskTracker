import {SET_TASKS,SET_HEADER, SET_TOKEN, CHANGE_POSITIONS, TOGGLE_DRAGGED,SET_COORDS} from "../actions/actions";
import helpers from "../../helperFunctions/helpers";
let reducer = {};

function normalize(tasks) {
  let byId = {},
      allIds = [];
  tasks.forEach(x => {
    byId[x.id] = x;
    allIds.push(x.id);
  });
  return {
    byId,
    allIds
  }
}

reducer.tasks = function(state = {byId: {}, allIds: []}, action) {
  switch (action.type) {
    case SET_TASKS:
      return normalize(action.data);
    case TOGGLE_DRAGGED:
      var tasks = JSON.parse(JSON.stringify(state));
      tasks.byId[action.id].beindDragged = action.flag
      return tasks;
    case SET_COORDS:
      var tasks = JSON.parse(JSON.stringify(state));
      tasks.byId[action.id].posX = action.posX;
      tasks.byId[action.id].posY = action.posY;
      return tasks;
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