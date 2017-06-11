import 'isomorphic-fetch';

export function Action(type){
  return function(data) {
    return {type, ...data};
  }
}

export function FetchAsync(url, callback) {
  return function(dispatch) {
    return fetch(url,{
          method: "GET",
          credentials: 'include'
        })
    .then(r => r.json())
    .then(json => callback(dispatch, json));
  }
}
