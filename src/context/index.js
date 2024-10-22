import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    selector: "",
    state: 0
  });
  const [favorites, setFavorites] = useLocalStorage(
    `${process.env.REACT_APP_BASE_NAME}_favorites`,
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  const updatePlayerStatus = (player, state) => {
    setPlayer({
      selector: player.id,
      state: state // 0 : stopped, 1 : playing, 2 : paused
    });
  };

  const handleTrackFavorite = (track) => {
    let trackExists = favorites.find((favorite) => favorite.id === track.id);

    if (trackExists) {
      setFavorites([
        ...favorites.filter((favorite) => favorite.id !== track.id)
      ]);
    } else {
      setFavorites([...favorites, track]);
    }
  };
  
  const isInFavorites = (track) => {
    return track && favorites.find((favorite) => favorite.id === track.id);
  };

  const context = {
    player,
    updatePlayerStatus,
    favorites,
    handleTrackFavorite,
    isInFavorites,
    isFetchingMore,
    setIsFetchingMore,
    isOffline,
    setIsOffline
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
