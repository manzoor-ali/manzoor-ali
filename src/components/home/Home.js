import React, { Suspense, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Header from "../common/header/Header";
import { useSelector, useDispatch } from "react-redux";
import { retrievePeoples } from "./homeSlice";
import ReactLoading from "react-loading";
import "./Home.scss";
import Paginationbtns from "./paginationbtns/Paginationbtns";
import Search from "./search/Search";
import Sorting from "./sorting/Sorting";
import moment from "moment";
export default function Home() {
  // Dispatch redux events
  const dispatch = useDispatch();
  const getHomeData = useSelector((state) => state.homeData);
  // Dispatch redux evetns ended

  // Object destructring
  const {
    peoplesDatas: { results },
    status,
    pageCounter,
    searchedPeoplesData,
  } = getHomeData;
  // Object destructring ended

  // On mount load list
  useEffect(() => {
    dispatch(retrievePeoples(pageCounter));
  }, []);
  // On mount load list ended

  // This code is responsible for pagination
  useEffect(() => {
    if (pageCounter && pageCounter > 0) {
      dispatch(retrievePeoples(pageCounter));
    }
  }, [dispatch, pageCounter]);
  // This code is responsible for pagination ended
  // Loop peoples data
  function loadPeoples(dataObj) {
    const allData = dataObj.map((person) => (
      <Row className="border-bottom ms-0 me-0 mt-4">
        <Col>
          <Suspense>
            <img
              src={`${imgURL + getId(person.url)}.jpg`}
              alt="personImg"
              className="img-adjustment"
            />
          </Suspense>
        </Col>
        <Col>{person.name}</Col>
        <Col>{person.height}</Col>
        <Col>{person.mass}</Col>
        <Col>{person.hair_color}</Col>
        <Col>{person.skin_color}</Col>
        <Col>{person.eye_color}</Col>
        <Col>{person.birth_year}</Col>
        <Col>{person.gender}</Col>
        <Col>{moment(person.created).format("DD-MM-YYYY")}</Col>
        <Col>{moment(person.edited).format("DD-MM-YYYY")}</Col>
      </Row>
    ));
    return allData;
  }

  // Loop peoples data dended

  // Add img and filter out some data to show in jsx
  const imgURL = "https://starwars-visualguide.com/assets/img/characters/";
  function getId(url) {
    return url.split("/")[url.split("/").length - 2];
  }
  // Add img and filter out some data to show in jsx ended

  // Perform search
  const [searchedObj, setsearchedObj] = React.useState();
  React.useEffect(() => {
    if (results) {
      const inputValString = results.filter((person) =>
        person.name.includes(searchedPeoplesData),
      );
      if (searchedPeoplesData) setsearchedObj(inputValString);
      else setsearchedObj("");
    }
  }, [searchedPeoplesData]);
  // Perform search ended

  return (
    <>
      <div className="home-wrapper">
        <Header />
        <Row>
          <Col>
            <Search />
          </Col>
          <Col>
            <Sorting />
          </Col>
        </Row>

        {/* Peoples data */}
        <div className="detail-wrapper">
          {status !== "succeeded" ? (
            <div className="p-5 text-center">
              <ReactLoading
                className="mx-auto"
                type={"spin"}
                color={"lightblue"}
                height={80}
                width={80}
              />
            </div>
          ) : status === "succeeded" ? (
            <>
              <Row className="header m-0">
                <Col>Picture</Col>
                <Col>Name</Col>
                <Col>Height</Col>
                <Col>Mass</Col>
                <Col>Hair Color</Col>
                <Col>Skin Color</Col>
                <Col>Eye Color</Col>
                <Col>Birth Year</Col>
                <Col>Gender</Col>
                <Col>Created</Col>
                <Col>Edited</Col>
              </Row>
              <div>{loadPeoples(!searchedObj ? results : searchedObj)}</div>
            </>
          ) : (
            ""
          )}
          {/* Peoples data ended */}
        </div>
        <Paginationbtns />
      </div>
    </>
  );
}
