
import React from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import Carousel from 'react-bootstrap/Carousel';

import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("token");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = "";
  }
  let member = (
    <h4 className="h1main">
      {/* Welcome {"decodedToken.user.name"}, what do you want to buy today? */}
      Welcome user, what do you want to buy today?
    </h4>
  );

  let foreigner = (
    <h4 className="h1main">
      You need an <span className="poniter" onClick={() => navigate("/login")}>account</span> to buy here!
    </h4>
  );
  // console.log(decodedToken.user)
  // console.log(decodedToken.user.name)
  // console.log(decodedToken.user.role_id)
  // console.log(decodedToken.user.email)
  return (
    <div>
      <div className="container-fluid vh-120 d-flex align-items-center justify-content-around bgRed">
        <div className="row">
          <div className="col mt-2 pe-1 pe-lg-3">
            <Carousel fade>
              <Carousel.Item>
                <div
                  className="carrousel img1 d-block w-100"
                />
                <Carousel.Caption>
                  <h6 className="textShadow">Are you looking for a place to fall?</h6>
                  <p onClick={() => navigate("/estates")} className="poniter textShadow">Find estates in our database!</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="carrousel img2 d-block w-100"
                />
                <Carousel.Caption>
                  <h6 className="textShadow">Do you need 2 or 4 wheels to travel the world?</h6>
                  <p onClick={() => navigate("/vehicles")} className="poniter textShadow">Find our best vehicles in our database!</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="carrousel img3 d-block w-100"
                />
                <Carousel.Caption>
                  <h6 className="textShadow">Are you looking for something new in your life and you don't know what it is?</h6>
                  <p onClick={() => navigate("/various")} className="pointer textShadow">Find EVERYTHING you need in our database!</p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <h3 className="h1main">
              Our prices will change you...
            </h3>
          </div>
          <div className="d-flex align-items-center justify-content-center">
            {decodedToken ? member : foreigner}
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col d-flex justify-content-around">
                    <div className="boxLinks boxVehicle" onClick={() => navigate("/vehicles")}><h6 className="textShadow">Vehicles</h6></div>
                    <div className="boxLinks boxEstate" onClick={() => navigate("/estates")}><h6 className="textShadow">Estates</h6></div>
                    <div className="boxLinks boxObject" onClick={() => navigate("/various")}><h6 className="textShadow">Various</h6></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
