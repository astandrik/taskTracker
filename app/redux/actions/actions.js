import * as ac from "./actionCreator";
export const INIT_APP = "INIT_APP";
export const GET_MATCHES = 'REQUEST_MATCHES'
export const SET_POSTS = "SET_POSTS";

export const initApp = ac.Action(INIT_APP);
export const setMatches = ac.Action(SET_POSTS);

export const getMatches = function() {
  let callback = (dispatch, json) => {
    debugger;
    dispatch(setMatches({data: json}));
  };
  return ac.FetchAsync("/allMatches", callback);
}