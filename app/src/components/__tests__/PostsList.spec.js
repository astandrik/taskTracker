import React from 'react';
import expect  from 'expect';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import PostsList from "../PostsList";

const mockStore = configureMockStore();

describe("<PostsList/>", () => {
  it("draws three posts", () => {
    let posts = [];
    posts.push({text: "hmm", time: 123});
    posts.push({text: "hmmm", time: 1234});
    posts.push({text: "hmmmok", time: 12345});
    let state = {
      Posts:{
        proposed: posts
      }
    }
    const store = mockStore(state);
    const wrapper = mount(<PostsList store={store}/>);    
    expect(wrapper.find(".single-post").length).toEqual(3);
  });
})