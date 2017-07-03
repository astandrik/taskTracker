import {SET_TASKS,SET_HEADER, SET_TOKEN, CHANGE_POSITIONS, TOGGLE_DRAGGED,SET_COORDS, SET_THRESHOLDS, RESOLVE_POSITIONS} from "../actions/actions";
import helpers from "../../helperFunctions/helpers";
let reducer = {};

function normalize(tasks) {
  let byId = {},
      allIds = [];
  tasks.forEach((x,i) => {
    byId[x.id] = x;
    allIds[i] = x.id;
  });
  return {
    byId,
    allIds
  }
}

function updatedTaskState(state, newProps, id) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [id]: {
        ...state.byId[id],
        ...newProps
      }
    }
  }
}

reducer.tasks = function(state = {byId: {}, allIds: []}, action) {
  switch (action.type) {
    case SET_TASKS:
      return normalize(action.data);
    case TOGGLE_DRAGGED:
      var newTaskState = {beindDragged: action.flag, posX: action.posX, posY: action.posY};
      return updatedTaskState(state, newTaskState , action.id);
    case SET_COORDS:
      var newTaskState = {posX: action.posX, posY: action.posY, prevX: state.byId[action.id].posX, prevY: state.byId[action.id].posY};
      return updatedTaskState(state, newTaskState, action.id);
    case RESOLVE_POSITIONS:
      return {
        ...state,
        allIds: action.positionedIds
      }
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