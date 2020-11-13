import { useState, useEffect } from "react";
import { Title, TrackItem, Loader } from "../components";

import SpotifyService from "../services/SpotifyService";

const Tracks = () => {
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await SpotifyService.getTracks();
        const {
          data: { items },
        } = result;

        setTracks(items);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Title level={2}>Tracks</Title>

      {isError && <p>An error occured...</p>}

      {!isLoading ? (
        <div className="track__list">
          {tracks.map((track, index) => (
            <TrackItem key={index} data={track} />
          ))}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Tracks;
