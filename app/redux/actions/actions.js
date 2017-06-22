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

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
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

export const getTasks = function() {
  const callback = (dispatch, data) => {
    console.log(data);
    dispatch(setTasks({data: JSON.parse(data)}));
  }
  return ac.FetchAsync("/api/tasks", callback);
}

export const addTask = function(data) {
  const callback = (dispatch, data) => {
    dispatch(getTasks());
  }
  return ac.FetchPostAsync("/api/task", data ,callback);
}