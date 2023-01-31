
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contentType } from "../../slices/contentSlice";
import "./ContentCard.css";

export const ContentCard = ({ vehicle, kind }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerRedux = () => {
    dispatch(
      contentType({
        content: kind,
      })
    );
    navigate(`/content/${vehicle}`)
};
let type = "";
if (vehicle > 12) {
  type = vehicle.type.slice(0, 12) + " ...";
} else {
  type = vehicle.type;
}
  return (
    <li onClick={() => handlerRedux()} className="contentCard text-light ">
      <img
        width={230}
        height={345}
        className="contentImage"
        src={vehicle.photo}
        alt={vehicle.type}
      />

      <div>{type}</div>
    </li>
  );
};