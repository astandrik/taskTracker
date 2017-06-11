import * as actions from "../actions";
import expect from "expect";

describe("setActions", () => {
  it("should set proposed posts", () => {
    let posts = [];
    posts.push({text: "hmm", time: 123});
    posts.push({text: "hmmm", time: 1234});
    const expectedAction = {
      type: actions.SET_PROPOSED
    }
  }
});