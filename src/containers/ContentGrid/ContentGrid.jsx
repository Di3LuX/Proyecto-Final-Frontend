
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import { Search } from "../../components/Search/Search";
import { httpGet } from "../../services/httpClient";
import "./ContentGrid.css";

export const ContentGrid = ({ search, title, type }) => {
  const [estates, setEstates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!search) {
      httpGet(type, "page", page).then((data) => {
        if (estates.length < 5) {
          setEstates(data);
        } else {
          setEstates((prevEstates) => prevEstates.concat(data));
        }
        setHasMore(type === "estates" ? page < 5 : page < 2);
        setIsLoading(false);
      });
    } else {
      httpGet(type, "type", search)
        .then((data) => setEstates(data))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
            setHasMore(false);
          }, 1000)
        );
    }
  }, [search, page]);

  if (true) <Spinner />;

  if (!isLoading && estates.length === 0)
    return (
      <div className="noResults mt-5 pt-5">
        <h1 className="contentHeader text-light">
          Find what you want in <span className="direct">{title}</span>
        </h1>
        <Search />
        <Empty />
      </div>
    );

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">
        <h1 className="contentHeader text-light">
          Find what you want in <span className="direct">{title}</span>
        </h1>

        <Search />
      </header>
      <InfiniteScroll
        className="noOverflow"
        dataLength={estates.length}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
      >
        <ul className="contentGrid">
          {estates.map((estate, index) => (
            <ContentCard key={index} estate={estate} type={type} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
