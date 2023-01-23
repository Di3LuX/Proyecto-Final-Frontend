
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { httpGet, API } from "../../services/httpClient";
import { Spinner } from "../../components/Spinner/Spinner";
import { useSelector } from "react-redux";
import { userData } from "../../slices/userSlice";
import { contentData } from "../../slices/contentSlice";
import axios from "axios";
import "./ContentDetails.css";

export const ContentDetails = () => {
  const userReduxCredentials = useSelector(userData);
  const contentType = useSelector(contentData);

  const localStorageToken = localStorage.getItem("token");

  const { contentId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [estate, setEstate] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    setIsLoading(true);
    httpGet(contentType.content, "id", contentId)
      .then((data) => setEstate(data))
      .finally(setIsLoading(false));
  }, [contentId, contentType.content]);

  if (isLoading)
    return (
      <div className="container-fluid vh-100 bg-black d-flex justify-content-center align-items-center">
        <Spinner />
      </div>
    );

  if (!estate) return null;


  let body = {
    article: estate[0].articleIdArticles,
  };

  const addOrder = async () => {
    let config = {
      headers: { Authorization: "Bearer " + localStorageToken }
    }
    let respGet = await axios.get(`${API}/order/myorder`, config)

    const arrayResponse = respGet.data;

    const filteredArray = arrayResponse.filter(
      (order) =>
        order.articleIdArticles === estate[0].articleIdArticles &&
        order.returned === false
    );

    if (filteredArray.length > 0) {
      setError("You have this article already");
    } else {
      setError("");
      let resOrder = await axios.post(
        `${API}/order/neworder`,
        body,
        config
      );
      navigate("/profileorders");
    }
  };

  // if (
  //   userReduxCredentials?.credentials?.token !== undefined ||
  //   localStorage.getItem("jwt") !== null
  // ) {
  //   return (
  //     <div className="detailsContainer container-fluid vh-100 bg-black pt-5 d-flex flex-column justify-content-center mt-5 mt-lg-0 ">
  //       <div className="row  pt-5 justify-content-evenly mt-5 mt-lg-0 ">
  //         <img
  //           className="col-xl-3 col bg-black  detailImage mt-5 mt-lg-0"
  //           src={estate[0].photo}
  //           alt={estate[0].location}
  //         />
  //         <div className="col-xl-5  bg-black text-light d-flex flex-column justify-content-around bg-gray">
  //           <h1>{estate[0].location}</h1>
  //           <p className="mt-5 text-align-justify">{estate[0].info}</p>
  //           <p>{estate[0].type}</p>
  //           <button
  //             text={"Order"}
  //             className={
  //               "d-flex align-items-center GlitchButtonReflex"
  //             }
  //             onClick={addOrder}>

  //           </button>
  //           <div className="errorInput mb-3 ft-5"> {error} </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
    return (
      <div className="detailsContainer container-fluid vh-100 bg-black pt-5 d-flex flex-column justify-content-center mt-5 mt-lg-0">
        <div className="row  pt-5 justify-content-evenly mt-5 mt-lg-0">
          <img
            className="col-xl-3 col bg-black  detailImage mt-5 mt-lg-0"
            src={estate[0].photo}
            alt={estate[0].location}
          />
          <div className="col-xl-5  bg-black text-light d-flex flex-column justify-content-around bg-gray pb-5">
            <h1>{estate[0].location}</h1>
            <p className="mt-5 text-align-justify">{estate[0].info}</p>
            <p>{estate[0].type}</p>
            <h3>
              If you want to buy this article, please login or register
            </h3>
            <button
              text={"Login"}
              className={
                "d-flex align-items-center GlitchButtonReflex"
              }
              onClick={() => navigate("/login")}>
            </button>
          </div>
        </div>
      </div>
    );
  }
