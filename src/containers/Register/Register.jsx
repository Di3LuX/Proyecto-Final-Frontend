
import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { errorCheck } from "../../utils/useful";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { userData, login } from "../../slices/userSlice";
import { API } from "../../services/httpClient";
import "./Register.css";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userReduxCredentials = useSelector(userData);


  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    location: ""
  });

  const [userError, setUserError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
    nameError: "",
    locationError: "",
    emailAlready: ""
  });

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


  const sendBody = async (e) => {
    e.preventDefault();
    if (validateBody(body)) {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError: "",
      }));
      await registerUser(body);
    } else {
      setUserError((prevState) => ({
        ...prevState,
        nocompletedError:
          "We can't send your information to register new user...",
      }));
    }
  };

  const registerUser = async (body) => {
    let resp = await axios.post(`${API}/users/register`, body);
    if
      (resp.data === `${body.email} is now in our Data Base, congrats`) {
      await userLogin(bodyLogin);
    } else {
      setUserError((prevState) => ({
        ...prevState,
        emailAlready: "This email is already in use! Try another...",
      }));
    }
  };

  const validateBody = (body) => {
    if (
      body.username !== "" &&
      body.email !== "" &&
      body.password !== "" &&
      body.name !== "" &&
      body.location !== "" &&
      userError.usernameError === "" &&
      userError.emailError === "" &&
      userError.passwordError === "" &&
      userError.nameError === "" &&
      userError.locationError === ""
    ) {
      return true;
    }
  };

  const body = {
    username: user.username,
    email: user.email,
    password: user.password,
    name: user.name,
    location: user.location
  };

  const bodyLogin = {
    email: user.email,
    password: user.password,
  };

  const userLogin = async (bodyLogin) => {
    let resp = await axios.post(`${API}/users/login`, bodyLogin);

    let jwt = resp.data.jwt;
    let credentials = {
      token: jwt,
    };

    dispatch(login({ credentials: credentials }));

    localStorage.setItem("jwt", credentials.token);
  };

  useEffect(() => {
    if (
      userReduxCredentials?.credentials?.token !== undefined ||
      localStorage.getItem("jwt") !== null
    ) {
      navigate("/");
    }
  });

  return (
    <form
      onSubmit={sendBody}
      className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center margin-top-10vh">
      <div className="row">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center">

          <h1 className="text-light mb-3">
            Registrate bro! no quieres ser guai?
          </h1>

          <h3 className="text-light mb-5">
            Estas a puntito de entrar en un mercado que mueve millones... {" "}
            <span className="colortxt2">BankArrota</span>
          </h3>

          <div className="errorInput mb-0 ft-5">
            {" "}
            {userError.nocompletedError}{" "}
          </div>
          <div className="errorInput mb-3 ft-5"> {userError.emailAlready} </div>


          <Input
            name="username"
            onChange={(e) => { inputHandler(e); }}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")}
            type="text"
            placeholder="Introduce tu nombre de usuario"
          />
          <div className="errorInput mb-3 ft-5"> {userError.usernameError} </div>


          <Input
            name="name"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "name")}
            type="text"
            placeholder="Introduce tu nombre real"
          />
          <div className="errorInput mb-3"> {userError.nameError} </div>


          <Input
            name="location"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "text")}
            type="text"
            placeholder="Introduce tu dirección"
          />
          <div className="errorInput mb-3"> {userError.locationError} </div>


          <Input
            name="email"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) => errorHandler(e.target.name, e.target.value, "email")}
            type="email"
            placeholder="Introduce tu E-mail"
          />
          <div className="errorInput mb-3"> {userError.emailError} </div>

          <Input
            name="password"
            onChange={(e) => inputHandler(e)}
            onBlur={(e) =>
              errorHandler(e.target.name, e.target.value, "password")
            }
            type="password"
            placeholder="Contraseña"
          />
          <div className="errorInput mb-3"> {userError.passwordError} </div>

          <button
            className={
              "CyberButtonColor d-flex align-items-center GlitchButtonReflex"
            }
            text={"Register"}
            onClick={sendBody}>Envia el formulario!
          </button>
        </div>
      </div>
    </form>
  );
}

export default Register;
