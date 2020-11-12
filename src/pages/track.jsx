import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getTrackById } from "../services/SpotifyService";
import { Title, TrackItem, Loader } from "../components";

const Track = () => {
  const { id } = useParams();
  const [track, setTrack] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await getTrackById(id);
        const { data } = result;

        setTrack({
          ...data,
          search: true,
        });
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return (
    <>
      <Title level={2}>Track</Title>
      {isError && <p>An error occured...</p>}
      {!isLoading ? (
        <>
          <TrackItem data={track} layout="single"></TrackItem>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Track;
