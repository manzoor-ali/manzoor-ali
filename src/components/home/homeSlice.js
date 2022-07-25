import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../common/api/apiService";

const initialState = {
  // Peoples data
  searchedPeoplesData: "",
  peoplesDatas: [],
  status: "idle",
  // Peoples data ended
  // Page counter
  pageCounter: 1,
};

export const retrievePeoples = createAsyncThunk(
  "retrieve/peoples",
  async (value) => {
    const res = await apiService.getPeoplesData(value);
    return res.data;
  },
);

export const homeSlice = createSlice({
  name: "counter",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    incrementCounter: (state) => {
      state.pageCounter += 1;
    },
    decrementCounter: (state) => {
      state.pageCounter -= 1;
    },
    searchByInput: (state, action) => {
      state.searchedPeoplesData = action.payload;
    },
    setNewObject: (state, action) => {
      state.peoplesDatas.results = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  extraReducers: {
    [retrievePeoples.pending]: (state) => {
      state.status = "loading";
    },
    [retrievePeoples.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.peoplesDatas = action.payload;
      // Subscribe test filtering ended
    },
    [retrievePeoples.rejected]: (state, action) => {
      state.status = "failed";
      state.peoplesDatas = action.error.message;
    },
  },
});

export const {
  incrementCounter,
  decrementCounter,
  searchByInput,
  setNewObject,
} = homeSlice.actions;

export default homeSlice.reducer;
