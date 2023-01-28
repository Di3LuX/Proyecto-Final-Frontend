
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/userSlice";
import { useDispatch } from "react-redux";
import "./Profile.css";

function Profile() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const localStorageToken = localStorage.getItem("token");
  let { decodedToken } = useJwt(localStorageToken);
  if (decodedToken === null) {
    decodedToken = "";
  }
  const logout = () => {
    dispatch(logout({ credentials: {} }));
    localStorage.removeItem("token");
    return navigate("/");
  };
  // if (localStorage.getItem("token") === null) {
  //   navigate("/");
  // }

  if ("decodedToken.user.role_id" === 2) {
    return (
      <div className="bgImg container-fluid vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h3 className="">
              {/* {"decodedToken.user.name.toUpperCase()"}, this is your special area. */}
              user, this is your special area.
            </h3>

            <button text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className="h1main d-flex align-items-center ">
              Modify your info
            </button>

            <button text={"Delete account"}
              onClick={() => navigate("/profiledestroy")}
              className="d-flex align-items-center h1main">
              Destroy your Acount
            </button>

            <button onClick={() => logout()}
              className={"d-flex align-items-center h1main"}
              text={"Log out"}>
              Au revoir
            </button>

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bgImg container-fluid vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h3 className="h1main">
              {/* {"decodedToken.user.name.toUpperCase()"}, this is your special area. */}
              User, this is your special area.
            </h3>

            <button text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className={"h1main d-flex align-items-center"}>
              Modify your info
            </button>

            <button onClick={() => logout()}
              className={"h1main d-flex align-items-center"}
              text={"Log out"}>
              Arrivederci
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
