
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
// import Login from "./containers/Login/Login";
// import Register from "./containers/Register/Register";
// import Profile from "./containers/Profile/Profile";
// import ProfileModify from "./containers/ProfileModify/ProfileModify";
// import ProfileDestroy from "./containers/ProfileDestroy/ProfileDestroy";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/register" element={<Register />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/vehicles" element={<Vehicles />} /> */}
          {/* <Route path="/estates" element={<Estates />} /> */}
          {/* <Route path="/objects" element={<Objects />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
