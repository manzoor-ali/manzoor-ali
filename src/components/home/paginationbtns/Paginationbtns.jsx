import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { incrementCounter, decrementCounter } from "../homeSlice";
export default function Paginationbtns() {
  // Dispatch redux events
  const dispatch = useDispatch();
  const getHomeData = useSelector((state) => state.homeData);
  // Dispatch redux evetns ended

  // Object destructring
  const {
    peoplesDatas: { results },
    pageCounter,
  } = getHomeData;
  return (
    <div className="pagination-btns pt-5">
      <Row>
        <Col className="text-start">
          <Button
            variant="primary"
            size="lg"
            onClick={() => dispatch(decrementCounter())}
            disabled={pageCounter === 1}
          >
            {" < Previous"}
          </Button>
        </Col>
        <Col className="text-end">
          <Button
            variant="primary"
            size="lg"
            onClick={() => dispatch(incrementCounter())}
            disabled={pageCounter === results ? results.length : ""}
          >
            {"Next > "}
          </Button>{" "}
        </Col>
      </Row>
    </div>
  );
}
