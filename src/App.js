
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import { ContentDetails } from "./containers/ContentDetails/ContentDetails";
import Profile from "./containers/Profile/Profile";
import ProfileModify from "./containers/ProfileModify/ProfileModify";
import ProfileDestroy from "./containers/ProfileDestroy/ProfileDestroy";
import { Content } from "./containers/Content/Content";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilemodify" element={<ProfileModify />} />
          <Route path="/profiledestroy" element={<ProfileDestroy />} />

          <Route
            path="/vehicles"
            element={<Content title={"Vehicles"} type={"vehicles"} />} />
          <Route
            path="/estates"
            element={<Content title={"Estates"} type={"estates"} />} />
          <Route
            path="/objects"
            element={<Content title={"Objects"} type={"objects"} />} />
          <Route path="/content/:contentId" element={<ContentDetails />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
