import deepAssign from "../deepAssign";
import expect from "expect";

describe("deepAssign tests", () => {
  it("non-object tests", () => {
    expect(deepAssign({}, 4)).toEqual(4);
    expect(deepAssign({}, "hello")).toEqual("hello");
    expect(deepAssign({}, undefined)).toEqual(undefined);
    expect(deepAssign({}, true)).toEqual(true);
  });
  it("simple tests", () => {
    let a = {
      field1: "hello"
    };
    let b = {
      field1: "good bye"
    }
    expect(deepAssign(a,b)).toEqual(b);
    expect(deepAssign(a,b)).toNotBe(a);
    a = {
      field1: "hello",
      field2: "Ann"
    }
    b = {
      field1: "good bye"
    }
    expect(deepAssign(a,b)).toEqual(Object.assign({},a,b));
    expect(deepAssign(a,b)).toNotBe(a);
  });
  it("nested test", () => {
    let a = {
      field1: "hello",
      field2: {
        field3: "hey",
        field5: "rock"
      }
    };
    let b = {
      field2: {
        field3: "hmm",
        field4: "bye"
      }
    }
    let expectedObject = {
      field1: "hello",
      field2: {
        field3: "hmm",
        field4: "bye",
        field5: "rock"
      }
    }
    expect(deepAssign(a,b)).toEqual(expectedObject);
  });
})