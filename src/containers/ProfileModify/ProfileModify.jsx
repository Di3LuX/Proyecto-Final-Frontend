
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useJwt } from "react-jwt";
import { Input } from "antd";
import { errorCheck } from "../../utils/useful";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/httpClient";
import { useDispatch } from "react-redux";
import { logout, login } from "../../slices/userSlice";
import "./ProfileModify.css";

function ProfileModify() {
  const dispatch = useDispatch();

  let localStorageToken = localStorage.getItem("token");
  let { decodedToken } = useJwt(localStorageToken);

  const [user, setUser] = useState({
    name: "",
    username: "",
    location: ""
  });

  const [userError, setUserError] = useState({
    nameError: "",
    usernameError: "",
    locationError: "",
    nocompletedError: ""
  });

  if (decodedToken === null) {
    decodedToken = { email: "" };
  }

  const body = {
    name: user.name,
    username: user.username,
    location: user.location,
  };

  const updateUser = async (e) => {
    e.preventDefault();
    if (validateInputs(user)) {
      userUpdater(body);
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: ""
      }));
    } else {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError:
          "You need to add your details to change them",
      }));
    }
  };

  let validateInputs = (body) => {
    if (
      body.name !== "" &&
      body.username !== "" &&
      body.location !== "" &&
      userError.nameError === "" &&
      userError.usernameError === "" &&
      userError.locationError === ""
    ) {
      return true;
    }
  };

  const userUpdater = async (body) => {

    let config = {
      headers: { Authorization: "Bearer " + localStorageToken },
    };
    let resp = await axios.put(`http://localhost:3000/users/modify`, body, config);
    if ("resp.data.message") {
      let token = resp.data.token;
      let credentials = {
        token: token,
      };
      
      // dispatch(logout({ credentials: {} }));
      // dispatch(login({ credentials: credentials }));

      // localStorage.removeItem("token");
      // localStorage.setItem("token", credentials.token);

      // navigate("/");
    } else {
      setUserError((prevState) => ({
        ...prevState,
        dataError: "Your data could not be updated",
      }));
    }
  };

  const navigate = useNavigate();

  const inputHandler = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const errorHandler = (field, value, type, password1) => {
    let error = "";
    error = errorCheck(value, type, password1);
    setUserError((prevState) => ({
      ...prevState,
      [field + "Error"]: error,
    }));
  };

  // useEffect(() => {
  //   if (localStorage.getItem("token") === null) {
  //     navigate("/");
  //   }
  // });

  return (
    <form onSubmit={(e) => updateUser(e)}>
      <div className="bgImg container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h2 className="h1main text-light">Modify your details</h2>
            <div className="errorInput mb-3 ft-5">
              {" "}
              {userError.nocompletedError}{" "}
            </div>

            <Input
              name="name"
              className="mt-5"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")}
              type="text"
              placeholder="Name"
            />

            <div className="errorInput mb-3 ft-5"> {userError.nameError} </div>

            <Input
              name="username"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) => errorHandler(e.target.username, e.target.value, "text")}
              type="text"
              placeholder="Username"
            />

            <div className="errorInput mb-3"> {userError.usernameError} </div>

            <Input
              name="location"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) => errorHandler(e.target.location, e.target.value, "text")}
              type="text"
              placeholder="Location"
            />

            <div className="errorInput mb-3"> {userError.locationError} </div>

            <button className={"h1main d-flex align-items-center "}

              text={"Accept"}
              onClick={(e) => updateUser(e)}>
              <h5 className="text-light">Modify</h5>
            </button>

            <button text={"Go Back"}
              onClick={() => navigate("/profile")}
              className={"h1main d-flex align-items-center"}>
              <h5 className="text-light">Go back</h5>
            </button>

          </div>
        </div>
      </div>
    </form>
  );
}

export default ProfileModify;
