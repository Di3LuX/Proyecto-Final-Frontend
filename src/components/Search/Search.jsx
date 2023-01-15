
import { ImSearch } from "react-icons/im";
import { useSearchParams } from "react-router-dom";
import "./Search.css";

export const Search = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [searchText, setSearchText] = useSearchParams("");
  const search = searchText.get("search");


  return (
    <form className="searchForm  bg-black" onSubmit={handleSubmit}>
      <div className="searchBox ">
        <input
          autoFocus
          className="searchInput"
          type="text"
          placeholder="Search by title or genre..."
          value={search ?? ""}
          onChange={(e) =>
            setSearchText({
              search: e.target.value,
            })
          }
        />
        <button className="searchButton" type="submit">
          <ImSearch size={20} />
        </button>
      </div>
    </form>
  );
};
