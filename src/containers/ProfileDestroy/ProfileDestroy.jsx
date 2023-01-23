
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { errorCheck } from "../../utils/useful";
// import { logout } from "../../slices/userSlice";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { API } from "../../services/httpClient";
import "./ProfileDestroy.css";

function ProfileDestroy() {
  const dispatch = useDispatch();

  let localStorageToken = localStorage.getItem("token");
  let { decodedToken } = useJwt(localStorageToken);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    nocompletedError: "",
  });

  if (decodedToken === null) {
    decodedToken = { email: "" };
  }

  const destroyUser = async (e) => {
    e.preventDefault();
    if (validateInputs()) {
      userDestroyed();
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "",
      }));
      logout();
    } else {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError:
          "You must add your info to be able to destroy your account",
      }));
    }
  };

  const logout = () => {
    dispatch(logout({ credentials: {} }));
    localStorage.removeItem("token");
    return navigate("/");
  };

  let validateInputs = () => {
    if (
      user.email !== "" &&
      user.password !== "" &&
      userError.emailError === "" &&
      userError.passwordError === ""
    ) {
      return true;
    }
  };

  const userDestroyed = async () => {
    let resp = await axios.delete(`${API}/users/delete`, {
      data: { email: user.email, password: user.password },
      headers: { Authorization: "Bearer " + localStorageToken },
    });
    if (resp.data === "The email is incorrect") {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "The email or password are incorrect",
      }));
      return;
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

  useEffect(() => {
    if (localStorage.getItem("jwt") === null) {
      navigate("/");
    }
  });

  return (
    <form
      onSubmit={(e) => destroyUser(e)}
      className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0"
    >
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-light mb-3">
            {decodedToken.user.name}, are you sure?
          </h1>
          <div className="errorInput mb-3 ft-5">
            {" "}
            {userError.nocompletedError}{" "}
          </div>

          {/* Inputs */}

          <Input
            name="email"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")}
            type="email"
            placeholder="Email"
          />

          <div className="errorInput mb-3"> {userError.emailError} </div>

          <Input.Password
            name="password"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) =>
              errorHandler(e.target.name, e.target.value, "password")
            }
            type="password"
            placeholder="Contraseña"
          />

          <div className="errorInput mb-3"> {userError.passwordError} </div>

          <button text={"Delete Account"}
            className={"buttonColorRed1 d-flex align-items-center "}
            onClick={(e) => destroyUser(e)}>

          </button>

          <button text={"Go Back"}
            onClick={() => navigate("/profile")}
            className={"buttonColor d-flex align-items-center GlitchButtonReflex"}>

          </button>

        </div>
      </div>
    </form>
  );
}

export default ProfileDestroy;
