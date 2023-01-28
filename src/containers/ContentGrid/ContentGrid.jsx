
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
        if (vehicles.length < 5) {
          console.log(vehicles)
          setVehicles(data);
        } else {
          setVehicles((prevVehicles) => prevVehicles.concat(data));
        }
        setHasMore(type === "vehicles" ? page < 5 : page < 2);
        setIsLoading(false);
      });
    } else {
      httpGet(type, "article", search)
        .then((data) => setVehicles(data))
        .finally(
          setTimeout(() => {
            setIsLoading(false);
            setHasMore(false);
          }, 1000)
        );
    }
  }, [search, page]);
  console.log(type)
  console.log(vehicles.article_id)
  console.log(info)
  if (true) <Spinner />;

  if (!isLoading && vehicles.length === 0)
    return (
      <div className="noResults mt-5 pt-5">
        <h1 className="contentHeader text-light">
        All that you need here <span className="">{info}</span>
        </h1>
        <Search />
        <Empty />
      </div>
    );

  return (
    <div className="bg-black pt-5">
      <header className="contentHeader mt-5 pt-5">
        <h1 className="contentHeader text-light">
        All that you want here <span className="">{info}</span>
        </h1>

        <Search />
      </header>
      <InfiniteScroll
        className="noOverflow"
        dataLength={vehicles.length}
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
