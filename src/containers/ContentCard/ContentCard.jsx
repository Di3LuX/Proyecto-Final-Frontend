
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
console.log(type)
console.log(type.article_id)
    type === "vehicles"
    ? navigate(`/content/${vehicles.article_id}`)
    : navigate(`/content/${vehicles.article_id}`);
};

let info = "";

if (vehicles.length > 12) {
  info = vehicles.info.slice(0, 12) + " ...";
} else {
  info = vehicles.info;
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