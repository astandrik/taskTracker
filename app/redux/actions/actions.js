import * as ac from "./actionCreator";
export const SET_HEADER = "SET_HEADER";
export const SET_MATCHES = "SET_MATCHES";
export const SET_PROPOSED = "SET_PROPOSED";


export const initApp = ac.Action(SET_HEADER);
export const setMatches = ac.Action(SET_MATCHES);
export const setProposedPosts= ac.Action(SET_PROPOSED);

export const getMatches = function() {
  let callback = (dispatch, json) => {
    dispatch(setMatches({data: json}));
  };
  return ac.FetchAsync("/api/matches", callback);
}

export const getProposed = function() {
  let callback = (dispatch, json) => {
    dispatch(setProposedPosts({data: json}));
  };
  return ac.FetchAsync("/api/proposed", callback);
}
