
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contentType } from "../../slices/contentSlice";
import "./ContentCard.css";

export const ContentCard = ({ estate }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerRedux = () => {
    dispatch(
      contentType({
        content: type,
      })
    );

    switch (type) {
      case "estates":
        navigate(`/content/${estate.id}`);
        break;
      // case "vehicles":
      //   navigate(`/content/${vehicle.cid}`);
      //   break;
      // case "objects":
      //   navigate(`/content/${object.id}`)
      // break;
      default:
        ;
    }
  };

  let type = "";

  if (estate.type.length > 12) {
    type = estate.type.slice(0, 12) + " ...";
  } else {
    type = estate.type;
  }

  return (
    <li onClick={() => handlerRedux()} className="contentCard text-light ">
      <img
        width={230}
        height={345}
        className="contentImage"
        src={estate.photo}
        alt={estate.type}
      />

      <div>{type}</div>
    </li>
  );
};