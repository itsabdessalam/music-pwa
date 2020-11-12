import { useState, useEffect, useContext, createRef } from "react";
import { AppContext } from "../context";
import { useDebounce } from "../hooks";
import { Title, Input, TrackItem, Loader } from "../components";
import { searchTracks } from "../services/SpotifyService";

const Search = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [tracks, setTracks] = useState([]);
  const [offset, setOffset] = useState(0);
  const { isFetchingMore, setIsFetchingMore } = useContext(AppContext);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const domRef = createRef();

  // TODO: refactor
  useEffect(() => {
    async function fetchData() {
      if (debouncedSearchQuery) {
        setIsLoading(true);

        try {
          const result = await searchTracks(debouncedSearchQuery);
          const {
            data: {
              tracks: { items },
            },
          } = result;

          setTracks(
            items.map((item) => ({
              ...item,
              search: true,
            }))
          );
        } catch (error) {}
        setIsLoading(false);
      } else {
        setTracks([]);
      }
    }
    fetchData();
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (!debouncedSearchQuery) {
      return;
    }

    let didCancel = false;

    const sentinel = domRef.current.querySelector("#sentinel");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          !didCancel &&
          !isLoading &&
          !isFetchingMore &&
          entry.isIntersecting
        ) {
          fetchData();
        }
      });
    });

    async function fetchData() {
      const newOffset = offset + 1;

      setIsFetchingMore(true);
      setOffset(newOffset);

      try {
        const result = await searchTracks(debouncedSearchQuery, 50, newOffset);
        const {
          data: {
            tracks: { items },
          },
        } = result;

        setTracks([
          ...tracks,
          ...items.map((item) => ({
            ...item,
            search: true,
          })),
        ]);

        setIsFetchingMore(false);
      } catch (error) {}
    }

    observer.observe(sentinel);

    return () => {
      didCancel = true;
      if (observer && observer.disconnect) {
        observer.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery, isFetchingMore, isLoading]);

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
          style={{
            position: "fixed",
            bottom: "50px",
            display: "flex",
            height: "48px",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            left: 0,
            backgroundColor: "#ffffff",
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
