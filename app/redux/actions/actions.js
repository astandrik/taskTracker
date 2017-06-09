import * as ac from "./actionCreator";
export const INIT_APP = "INIT_APP";
export const GET_MATCHES = 'REQUEST_MATCHES'
export const SET_MATCHES = "SET_MATCHES";

export const initApp = ac.Action(INIT_APP);
export const setMatches = ac.Action(SET_MATCHES);

export const getMatches = function() {
  let callback = (dispatch, json) => {
    dispatch(setMatches({data: json}));
  };
  return ac.FetchAsync("/api/matches", callback);
}
