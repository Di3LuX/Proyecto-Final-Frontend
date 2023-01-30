
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { contentType } from "../../slices/contentSlice";
import "./ContentCard.css";

export const ContentCard = ({ vehicles, type }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerRedux = () => {
    dispatch(
      contentType({
        content: type,
      })
    );
    navigate(`/content/${vehicles.article_id}`)
};

let info = "";
console.log(vehicles)
if (vehicles > 12) {
  info = vehicles.info.slice(0, 12) + " ...";
} else {
  info = vehicles;
}
  return (
    <li onClick={() => handlerRedux()} className="contentCard text-light ">
      <img
        width={230}
        height={345}
        className="contentImage"
        src={vehicles.photo}
        alt={vehicles.info}
      />

      <div>{info}</div>
    </li>
  );
};