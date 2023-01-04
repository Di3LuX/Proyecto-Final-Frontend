import React, { useState } from "react";
import { Input } from "antd";
import { errorCheck } from "../../utils/useful";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../../slices/userSlice";
import { API } from "../../services/httpClient";
import "./Login.css";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = async (body) => {
    let resp = await axios.post(`${API}/users/login`, body);
    if (resp.data === "Password or email incorrect") {
      setUserError((prevState) => ({
        ...prevState,
        noEmail: "Try again.",
      }));
    } else if (resp.data.message === "Login successful") {
      setUserError((prevState) => ({
        ...prevState,
        noEmail: "",
      }));
      
      let jwt = resp.data.jwt;
      let credentials = {
        token: jwt,
      };
      dispatch(login({ credentials: credentials }));
      localStorage.setItem("jwt", credentials.token);
      navigate("/");
      console.log(jwt)
      console.log(credentials)
      console.log(resp.data.jwt)
    }
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [userError, setUserError] = useState({
    emailError: "",
    passwordError: "",
    noEmail: "",
  });

  let body = {
    email: user.email,
    password: user.password,
  };

  const validateBody = (body) => {
    if (
      body.email !== "" &&
      body.password &&
      userError.emailError === "" &&
      userError.passwordError === ""
    ) {
      return true;
    }
  };

  const submitLogin = (e) => {
    e.preventDefault();
    if (validateBody(body)) {
      userLogin(body);
    } else {
      setUserError((prevState) => ({
        ...prevState,
        noEmail:
          "Your info is wrong",
      }));
    }
  };

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

  return (
    <div className="container-fluid bg-black">
      <form
        className="bg-black vh-100 d-flex justify-content-center align-items-center  mt-lg-0"
        onSubmit={(e) => submitLogin(e)}
      >
        <div className="row mt-5 justify-content-center">
          <div className="text col-12 d-flex flex-column justify-content-between align-items-center ps-2 pe-2">
            <h1 className="text-light mb-3 pb-5 text-center">
              If you have an account. Please{" "}
              <span className="colortxt2"> login!</span>{" "}
            </h1>

            <div className="errorInput mb-3 ft-5"> {userError.noEmail} </div>


            <Input
              className="inputs "
              name="email"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) =>
                errorHandler(e.target.name, e.target.value, "email")
              }
              type="email"
              placeholder="Email"
            />

            <div className="errorInput mb-3"> {userError.emailError} </div>

            <Input.Password
              className="inputs"
              name="password"
              onChange={(e) => inputHandler(e)}
              onBlur={(e) =>
                errorHandler(e.target.name, e.target.value, "password")
              }
              type="password"
              placeholder="Password"
            />

            <div className="errorInput mb-3"> {userError.passwordError} </div>
            <div className="boton mt-5">
              <div
                text={"Login"}
                className={
                  "d-flex align-items-center GlitchButtonReflex"
                }
                onClick={(e) => submitLogin(e)}
              >Logeate!
              </div>
            </div>
            <h3 className="text-light text-center mb-5 mt-5">
              If you don't have account, please{" "}
              <span className="colortxt" onClick={() => navigate("/register")}>
                register
              </span>{" "}
              on{" "}
              <span className="colortxt" onClick={() => navigate("/register")}>
                BankArrota
              </span>{" "}
              for <span className="colortxt2"> FREE!</span>
            </h3>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
