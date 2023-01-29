
import { ContentCard } from "../ContentCard/ContentCard";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Spinner } from "../../components/Spinner/Spinner";
import { Empty } from "../../components/Empty/Empty";
import { Search } from "../../components/Search/Search";
import { httpGet } from "../../services/httpClient";
import "./ContentGrid.css";

export const ContentGrid = ({ search, info, type }) => {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    if (!search) {
      httpGet(type, "article", page).then((data) => {
        if (vehicles < 5) {
          setVehicles(data);
        } else {
          setVehicles((prevVehicles) => prevVehicles.concat(data));
        }

        setHasMore(type === "article" ? page < 5 : page < 2);
        setIsLoading(false);
      });
    } else {
      httpGet(type, "info", search)
        .then((data) => setVehicles(data))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
            setHasMore(false);
          }, 1000)
        );
    }
  }, [search, page]);

  if (true) <Spinner />;

  if (!isLoading && vehicles === 0)

    return (
      <div className="noResults mt-5 pt-5">
        <h2 className="contentHeader text-light">
          All <span className="">{info}</span> that you need here!
        </h2>
        <Search />
        <Empty />
      </div>
    );

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">
        <h2 className="contentHeader text-light">
          All <span className="">{info}</span> that you want here!
        </h2>

        <Search />
      </header>
      <InfiniteScroll
        className="noOverflow"
        dataLength={vehicles}
        hasMore={hasMore}
        next={() => setPage((prevPage) => prevPage + 1)}
        loader={<Spinner />}
      >
        <ul className="contentGrid">
          {vehicles.map((vehicles, index) => (
            <ContentCard key={index} vehicles={vehicles} type={type} />
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  );
};
