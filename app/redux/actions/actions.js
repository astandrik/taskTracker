import * as ac from "./actionCreator";
export const SET_HEADER = "SET_HEADER";
export const SET_PROPOSED = "SET_PROPOSED";
export const SET_TOKEN = "SET_TOKEN";
export const SET_TASKS = "SET_TASKS";


export const initApp = ac.Action(SET_HEADER);
export const setProposedPosts= ac.Action(SET_PROPOSED);
export const setToken = ac.Action(SET_TOKEN);
export const setTasks = ac.Action(SET_TASKS);

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
      dispatch(setToken({data: data}));
    }
  }
  return ac.FetchPostAsync("/api/login", data, setT);
}

export const getTasks = function() {
  const callback = (dispatch, data) => {
    dispatch(setTasks({data: data}));
  }
  return ac.FetchAsync("/api/tasks", callback);
}

export const addTask = function(data) {
  const callback = (dispatch, data) => {
    dispatch(getTasks());
  }
  return ac.FetchPostAsync("/api/task", data ,callback);
}