import React from "react";
import { useDispatch } from "react-redux";
import { searchByInput } from "../homeSlice";

export default function Search() {
  // Store search text in input field

  const dispatch = useDispatch();
  function searchedValue(search) {
    if (search) dispatch(searchByInput(search));
    if (!search) dispatch(searchByInput(""));
  }
  return (
    <>
      <div className="input-search">
        <input
          type="text"
          placeholder="Search character by name"
          onChange={(e) => searchedValue(e.target.value)}
        />
      </div>
    </>
  );
}
