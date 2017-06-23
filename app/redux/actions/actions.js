import * as ac from "./actionCreator";
export const SET_HEADER = "SET_HEADER";
export const SET_PROPOSED = "SET_PROPOSED";
export const SET_TOKEN = "SET_TOKEN";

import {getTasks, setTasks, updateTask, addTask, SET_TASKS} from "./taskActions";
export {getTasks, setTasks, updateTask, addTask, SET_TASKS};
import helpers from "../../helperFunctions/helpers";

let setCookie = helpers.setCookie;

export const initApp = ac.Action(SET_HEADER);
export const setProposedPosts= ac.Action(SET_PROPOSED);
export const setToken = ac.Action(SET_TOKEN);


export const getProposed = function() {
  let callback = (dispatch, json) => {
    dispatch(setProposedPosts({data: json}));
  };
  return ac.FetchAsync("/api/proposed", callback);
}


export const sendPost = function(data) {
  return ac.FetchPostAsync("/api/post", data);
}


export const tryLogin = function(data) {
  const setT = (dispatch,data) => {
    console.log(data);
    if(data.length > 10) {
      setCookie("token", data);
      dispatch(setToken({data: data}));
    }
  }
  return ac.FetchPostAsync("/api/login", data, setT);
}