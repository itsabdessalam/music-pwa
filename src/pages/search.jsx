import { useState, useEffect, useContext, createRef } from "react";
import { AppContext } from "../context";
import { useDebounce } from "../hooks";
import { Title, Input, TrackItem, Loader } from "../components";

import SpotifyService from "../services/SpotifyService";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isFetchingMore, setIsFetchingMore, isOffline } = useContext(
    AppContext
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const domRef = createRef();

  async function fetchData(offset, callback, errorCallback) {
    try {
      const result = await SpotifyService.searchTracks(
        debouncedSearchQuery,
        50,
        offset
      );
      const {
        data: {
          tracks: { items },
        },
      } = result;

      setTracks([
        ...(offset === 0 ? [] : tracks),
        ...items.map((item) => ({
          ...item,
          search: true,
        })),
      ]);
      if (callback) {
        callback();
      }
    } catch (error) {
      if (errorCallback) {
        errorCallback(error);
      }
    }
  }

  useEffect(() => {
    if (isOffline) {
      return;
    }

    if (!debouncedSearchQuery) {
      setTracks([]);
      return;
    }

    let isMounted = true;

    if (isMounted) {
      setIsLoading(true);
      fetchData(0, () => {
        setIsLoading(false);
      });
    }

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (isOffline) {
      return;
    }

    if (!debouncedSearchQuery) {
      setTracks([]);
      return;
    }

    let isMounted = true;

    const sentinel = domRef.current.querySelector("#sentinel");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          isMounted &&
          !isLoading &&
          !isFetchingMore &&
          entry.isIntersecting
        ) {
          setIsFetchingMore(true);

          fetchData(offset + 1, () => {
            setOffset(offset + 1);
            setIsFetchingMore(false);
          });
        }
      });
    });

    observer.observe(sentinel);

    return () => {
      isMounted = false;
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, isFetchingMore, isLoading, isOffline]);

  return (
    <div ref={domRef}>
      <Title level={2}>Search</Title>

      <Input
        name="search"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"track, artist..."}
        required
      />
      {!isLoading ? (
        <div className="track__list">
          {tracks.map((track, index) => (
            <TrackItem key={index} data={track} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
      {isFetchingMore && (
        <div
          className="track__list__loader"
          style={{
            position: "fixed",
            bottom: "50px",
            display: "flex",
            height: "60px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            left: 0,
            backgroundImage:
              "linear-gradient(0deg, rgb(247, 250, 252) 0%, rgba(247, 250, 252, 0.8) 50%, rgba(247, 250, 252, 0) 100%)",
            zIndex: 1070,
          }}
        >
          <Loader />
        </div>
      )}
      <div id="sentinel"></div>
    </div>
  );
};

export default Search;
