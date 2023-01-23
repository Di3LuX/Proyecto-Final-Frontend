
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { userData, logout } from "../../slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import userIcon from "../../images/585e4bf3cb11b227491c339a.png";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();
  const userReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();

  const ciaoBella = () => {
    dispatch(logout({ credentials: {} }));
    localStorage.removeItem("token");
    return navigate("/");
  };

  const localStorageToken = localStorage.getItem("token");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = { name: "" };
  }

  const admin = () => {
    if (decodedToken.rolIdRol === 1) {
      return (
        <Dropdown.Item
          onClick={() => navigate("/profileAdmin")}
          className="fontFamilyGillSans"
        >
          Profile Admin
        </Dropdown.Item>
      );
    } else {
      return "";
    }
  };

  if (
    userReduxCredentials?.credentials?.token !== undefined ||
    localStorage.getItem("token") !== null
  ) {

    // For Admins
    return (
      <div className="navbarDesign container-fluid fixed-top">
        <div className=" row justify-content-around">
          <div className="col-3 col-lg-1 justify-content-center d-flex align-items-center ps-0 mt-0  ps-lg-3">
          </div>

          <div className="col-3 col-lg-1 d-xl-flex align-items-center d-none  justify-content-center pe-0 ps-0 pe-lg-5 mt-3 ">
            <h1 onClick={() => navigate("/")} className="cursor-pointer">
              Home
            </h1>
          </div>

          <div className="col-9 col-lg-10 d-flex justify-content-end align-items-center mt-3 pe-5 pe-lg-0">
            <ul className="listDesign d-flex justify-content-center">
              <li className="pink fontsize1-5em ms-2">{decodedToken.name}</li>
              <Dropdown>
                <Dropdown.Toggle
                  className="dropDownDesign"
                  id="dropdown-button-dark-example1"
                  variant="black"
                >
                  <img
                    src={userIcon}
                    className="userIconDesign"
                    alt="userIcon"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdownMenuDesign" variant="dark">
                  <Dropdown.Item
                    onClick={() => navigate("/profile")}
                    className="fontFamilyGillSans"
                  >
                    Profile
                  </Dropdown.Item>

                  {admin()}

                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => ciaoBella()}
                    className="fontFamilyGillSans"
                  >
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    // For Users
    <div className="navbarDesign container-fluid fixed-top">
      <div className=" row justify-content-around">
        <div className="col-3 col-lg-1 justify-content-center d-flex align-items-center mt-3 ps-0 ps-lg-3">
        </div>

        <div className="col-3 col-lg-1 d-xl-flex align-items-center d-none  justify-content-center pe-0 ps-0 pe-lg-5 mt-3 ">
          <h1 onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </h1>
        </div>

        <div className="col-9 col-lg-10 d-flex justify-content-end align-items-center mt-3 pe-5 pe-lg-0">
          <ul className="listDesign d-flex justify-content-center">
            <li onClick={() => navigate("/login")} className="links">
              Login
            </li>
            <li onClick={() => navigate("/register")} className="links">
              Register
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
