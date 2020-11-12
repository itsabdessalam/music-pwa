import { useContext } from "react";
import { AppContext } from "../context";
import { Title, TrackItem } from "../components";

const Favorites = () => {
  const { favorites } = useContext(AppContext);
  return (
    <>
      <Title level={2}>Favorites</Title>
      {favorites.map((track, index) => (
        <TrackItem key={index} data={track} />
      ))}
    </>
  );
};

export default Favorites;
