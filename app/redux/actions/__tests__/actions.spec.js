import * as actions from "../actions";
import expect from "expect";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetch from 'isomorphic-fetch';
import fetchMock from 'fetch-mock';

describe("setActions", () => {
  it("should set proposed posts", () => {
    let posts = [];
    posts.push({text: "hmm", time: 123});
    posts.push({text: "hmmm", time: 1234});
    const expectedAction = {
      type: actions.SET_PROPOSED,
      data: posts
    }
    expect(actions.setProposedPosts({data: posts})).toEqual(expectedAction);
  });
});

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe("async fetch actions", () => {
  it("should recieve 2ch posts", () => {
    let posts = [];
    posts.push({text: "hmm", time: 123});
    posts.push({text: "hmmm", time: 1234});
    fetchMock.mock("/api/proposed", posts);
    const store = mockStore({ Posts: {proposed: []} });
    return store.dispatch(actions.getProposed())
        .then(() => { // return of async actions
          expect(store.getActions()).toEqual([{data: posts, type: actions.SET_PROPOSED}]);
        })
  });
})