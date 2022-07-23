import homeReducer, {
  incrementCounter,
  decrementCounter,
  searchByInput,
} from "./homeSlice";

describe("home reducer", () => {
  const initialState = {
    searchedPeoplesData: "",
    peoplesDatas: [],
    status: "idle",
    pageCounter: 1,
  };
  it("should handle initial state", () => {
    expect(homeReducer(undefined, { type: "unknown" })).toEqual({
      searchedPeoplesData: "",
      peoplesDatas: [],
      status: "idle",
      pageCounter: 1,
    });
  });

  it("should handle incrementCounter", () => {
    const actual = homeReducer(initialState, incrementCounter());
    expect(actual.pageCounter).toEqual(2);
  });

  it("should handle decrementCounter", () => {
    const actual = homeReducer(initialState, decrementCounter());
    expect(actual.pageCounter).toEqual(0);
  });

  it("should handle searchByInput", () => {
    const actual = homeReducer(initialState, searchByInput(2));
    expect(actual.pageCounter).toEqual(1);
  });
});
