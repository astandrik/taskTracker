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


export function FetchPostAsync(url, data, callback) {
  return function(dispatch) {
    return fetch(url,{
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        })
    .then(r => r.json())
    .then(json => callback(dispatch, json));
  }
}