
import React from "react";
import { useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const localStorageToken = localStorage.getItem("jwt");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = "";
  }

  let foreigner = (
    <p className="fs-3 welcome">
      The best place to buy things, join us.
    </p>
  );

  let member = (
    <p className="fs-3 welcome">
      Welcome {decodedToken.name}, what do you want to buy today?
    </p>
  );

  return (
    <div>
      <div className="container-fluid bg-black vh-100 d-flex flex-column align-items-center justify-content-around bgImage">
        <div className="row mt-5 mt-lg-0">
          <div className="col-12 d-flex align-items-center justify-content-center">
            <h1 className="text-light mb-5">
              Let's begin
            </h1>
          </div>
          <div className="row justify-content-center">
            <div className="col col-lg-8  text-light d-flex align-items-center justify-content-center flex-column ">
              {decodedToken ? member : foreigner}
            </div>
          </div>
          <div className="row">
            <div className="col d-flex justify-content-center">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col col-lg-6 d-flex justify-content-around">
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
