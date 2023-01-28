
import { ContentGrid } from "../ContentGrid/ContentGrid";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "../../hooks/useQuery";
import "./Content.css";

export const Content = ({ info, type }) => {
  const query = useQuery();
  const search = query.get("search");

  const debouncedSearch = useDebounce(search, 400);
  console.log(info)
  console.log(type)
  return (
    <ContentGrid
      info={info}
      type={type}
      key={debouncedSearch}
      search={debouncedSearch}
    />
  );

};
