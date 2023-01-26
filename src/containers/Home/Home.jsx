
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
    <h2>
      {/* Welcome {"decodedToken.user.name"}, what do you want to buy today? */}
      Welcome user, what do you want to buy today?
    </h2>
  );

  let foreigner = (
    <h2>
      You need an account to buy our stuff!
    </h2>
  );
  // console.log(decodedToken.user)
  // console.log(decodedToken.user.name)
  // console.log(decodedToken.user.role_id)
  // console.log(decodedToken.user.email)
  return (
    <div>
      <div className="container-fluid vh-100 d-flex align-items-center justify-content-around bgRed">
        <div className="row"><Carousel fade>
          <Carousel.Item>
            <div
              className="carrousel img1 d-block w-100"
            />
            <Carousel.Caption>
              <h3 className="textShadow">Are you looking for a place to fall?</h3>
              <p onClick={() => navigate("/estates")} className="poniter textShadow">Find estates in our database!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carrousel img2 d-block w-100"
            />

            <Carousel.Caption>
              <h3 className="textShadow">Do you need 2 or 4 wheels to travel the world?</h3>
              <p onClick={() => navigate("/vehicles")} className="poniter textShadow">Find our best vehicles in our database!</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div
              className="carrousel img3 d-block w-100"
            />

            <Carousel.Caption>
              <h3 className="textShadow">Are you looking for something new in your life and you don't know what it is?</h3>
              <p onClick={() => navigate("/objects")} className="pointer textShadow">Find EVERYTHING you need in our database!</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
          <div className="h1main d-flex align-items-center justify-content-center">
            <h1>
              Our prices will change you...
            </h1>
          </div>
          <div className="h1main row justify-content-center">
          <div className=" d-flex align-items-center justify-content-center flex-column ">
              {decodedToken ? member : foreigner}
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col d-flex justify-content-around">
                    <div className="boxLinks boxVehicle" onClick={() => navigate("/vehicles")}><h6 className="textShadow">Vehicles</h6></div>
                    <div className="boxLinks boxEstate" onClick={() => navigate("/estates")}><h6 className="textShadow">Estates</h6></div>
                    <div className="boxLinks boxObject" onClick={() => navigate("/objects")}><h6 className="textShadow">Objects</h6></div>
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
