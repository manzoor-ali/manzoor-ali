import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setNewObject } from "../homeSlice";
export default function Sorting() {
  // Dispatch redux events
  const dispatch = useDispatch();
  const getHomeData = useSelector((state) => state.homeData);
  // Dispatch redux evetns ended
  // Object destructring
  const {
    peoplesDatas: { results },
  } = getHomeData;
  // Object destructring ended

  const [defaultData, setdefaultData] = React.useState();

  useEffect(() => {
    if (results) {
      setdefaultData(results);
    }
  }, [results]);

  const handleChange = (e) => {
    const sortingType = e.target.value;

    if (sortingType === "byHeightMinToMax") {
      var sortedDataByHeightMinMax = [...defaultData].sort(
        (a, b) => (Number(a.height) || 0) - (Number(b.height) || 0),
      );
      dispatch(setNewObject(sortedDataByHeightMinMax));
    }
    if (sortingType === "byHeightMaxToMin") {
      var sortedDataByHeightMaxMin = [...defaultData].sort(
        (a, b) => (Number(b.height) || 0) - (Number(a.height) || 0),
      );
      dispatch(setNewObject(sortedDataByHeightMaxMin));
    }

    if (sortingType === "byDateCreated") {
      var sortByDateCreated = [...defaultData].sort(
        (a, b) => (new Date(a.created) || 0) - (new Date(b.created) || 0),
      );
      dispatch(setNewObject(sortByDateCreated));
    }
    if (sortingType === "byDateEdited") {
      var sortByDateEdited = [...defaultData].sort(
        (a, b) => (new Date(a.edited) || 0) - (new Date(b.edited) || 0),
      );
      dispatch(setNewObject(sortByDateEdited));
    }
  };

  //   Sorting type

  //  Sorting type ended

  return (
    <>
      <div className="sorting-dropdown">
        <select onChange={handleChange}>
          <option value="byDateCreated">Sort by Date Created</option>
          <option value="byDateEdited">Sort by Date Edited</option>
          <option value="byHeightMinToMax">
            Sort by height from min to max
          </option>
          <option value="byHeightMaxToMin">
            Sort by height from max to min
          </option>
        </select>
      </div>
    </>
  );
}
