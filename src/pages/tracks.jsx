import { useState, useEffect } from "react";
import { Title, TrackItem } from "../components";
import { getTracks } from "../services/SpotifyService";

const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await getTracks();
        const { data } = result;
        const { items } = data;

        setTracks(items);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}>Tracks</Title>

      {isError && <p>An error occured...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        tracks.map((track, index) => <TrackItem key={index} data={track} />)
      )}
    </>
  );
};

export default Tracks;
