import * as ac from "./actionCreator";
export const SET_HEADER = "SET_HEADER";
export const SET_TOKEN = "SET_TOKEN";

import {getTasks, setTasks, updateTask, addTask, deleteTask, resolvePositions, toggleDragged,setCoords, setThresholds,
  SET_TASKS, RESOLVE_POSITIONS, TOGGLE_DRAGGED, SET_COORDS, SET_THRESHOLDS} from "./taskActions";
export {getTasks, setTasks, updateTask, addTask, deleteTask, resolvePositions, toggleDragged,setCoords, setThresholds,
  SET_TASKS, RESOLVE_POSITIONS, TOGGLE_DRAGGED, SET_COORDS, SET_THRESHOLDS};
import helpers from "../../helperFunctions/helpers";

let setCookie = helpers.setCookie;

export const initApp = ac.Action(SET_HEADER);
export const setToken = ac.Action(SET_TOKEN);


export const tryLogin = function(data) {
  const setT = (dispatch,data) => {
    if(data.length > 10) {
      setCookie("token", data);
      dispatch(setToken({data: data}));
    }
  }
  return ac.FetchPostAsync("/api/login", data, setT);
}

export const logout = function() {
  return (dispatch, getState) => {
    helpers.deleteCookie("token");
    dispatch(setToken({data: null}));
  }
}