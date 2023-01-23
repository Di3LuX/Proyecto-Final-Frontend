
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
    decodedToken = { name: "" };
  }

  const logout = () => {
    dispatch(logout({ credentials: {} }));
    localStorage.removeItem("token");
    return navigate("/");
  };
  if (localStorage.getItem("token") === null) {
    navigate("/");
  }
  console.log(decodedToken.name)

  if (decodedToken.rolIdRol === 2) {
    return (
      <div className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">
              {decodedToken.name.toUpperCase()}, this is your special area.
            </h1>

            <button text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className={"buttonColor d-flex align-items-center "}>
              modifica tu perfil
            </button>

            <button text={"Delete account"}
              onClick={() => navigate("/profiledestroy")}
              className={"d-flex align-items-center buttonColorRed1"}>
                borra tu cuenta
            </button>

            <button onClick={() => logout()}
              className={"d-flex align-items-center buttonColorRed2 GlitchButtonReflex"}
              text={"Log out"}>
                logout
            </button>

          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container-fluid bg-black vh-100 d-flex justify-content-center align-items-center mt-5 mt-lg-0 bgImage">
        <div className="row">
          <div className="col-12 d-flex flex-column justify-content-center align-items-center">
            <h1 className="text-light mb-3">
              {decodedToken.name.toUpperCase()}, this is your special area.
            </h1>

            <button text={"Modify profile"}
              onClick={() => navigate("/profilemodify")}
              className={"ButtonColor d-flex align-items-center "}>
                modifica tu perfil
            </button>

            <button onClick={() => logout()}
              className={"d-flex align-items-center ButtonColorRed2 GlitchButtonReflex"}
              text={"Log out"}>
                logout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default Profile;
