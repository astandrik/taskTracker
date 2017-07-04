import 'isomorphic-fetch';

export function Action(type){
  return function(data) {
    return {type, ...data};
  }
}

export function FetchAsync(url, callback) {
  return function(dispatch, getState) {
    let token = getState().Home.token;
    let request = {
          method: "GET",
          credentials: 'include'
        };
    if(token) {
      request.headers = {
        "x-access-token": token
      }
    }
    return fetch(url,request)
    .then(r => r.json())
    .then(json => {if(callback) callback(dispatch, json)});
  }
}


export function FetchPostAsync(url, data, callback) {
  return function(dispatch, getState) {
    let token = getState().Home.token;
    let request = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        };
    if(token) {
      request.headers = Object.assign({}, request.headers,{
        "x-access-token": token
      });
    }
    return fetch(url,request)
    .then(r => r.json())
    .then(json => {if(callback) callback(dispatch, json)});
  }
}


export function FetchDeleteAsync(url, data, callback) {
  return function(dispatch, getState) {
    let token = getState().Home.token;
    let request = {
          method: "DELETE",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json"
          },
          credentials: 'include'
        };
    if(token) {
      request.headers = Object.assign({}, request.headers,{
        "x-access-token": token
      });
    }
    return fetch(url,request)
    .then(r => r.json())
    .then(json => {if(callback) callback(dispatch, json)});
  }
}