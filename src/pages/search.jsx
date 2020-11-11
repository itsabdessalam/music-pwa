import { useState, useEffect } from "react";
import { useDebounce } from "../hooks";
import { Title, Input } from "../components";
import { searchTracks } from "../services/SpotifyService";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 750);

  useEffect(() => {
    async function fetchData() {
      if (debouncedSearchQuery) {
        try {
          const result = await searchTracks(debouncedSearchQuery);
          const { data } = result;
          const { tracks } = data;
          const { items } = tracks;

          console.log("toto", items);
        } catch (error) {}
      }
    }
    fetchData();

    // else return an empty array
  }, [debouncedSearchQuery]);

  return (
    <>
      <Title level={2}>Search</Title>
      <Input
        name="search"
        type="text"
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={"Search track..."}
        required
      />
    </>
  );
};

export default Search;
