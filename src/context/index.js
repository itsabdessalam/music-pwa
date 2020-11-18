import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    selector: "",
    state: 0,
  });
  const [favorites, setFavorites] = useLocalStorage(
    "__music_app_user_favorites",
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  /**
   *
   *
   * @param {*} player
   * @param {*} state
   */
  const updatePlayerStatus = (player, state) => {
    setPlayer({
      selector: player.id,
      state: state, // 0 : stopped, 1 : playing, 2 : paused
    });
  };
  /**
   *
   *
   * @param {*} track
   */
  const handleTrackFavorite = (track) => {
    let trackExists = favorites.find((favorite) => favorite.id === track.id);

    if (trackExists) {
      setFavorites([
        ...favorites.filter((favorite) => favorite.id !== track.id),
      ]);
    } else {
      setFavorites([...favorites, track]);
    }
  };

  /**
   *
   *
   * @param {*} track
   * @return {*}
   */
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
    setIsOffline,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
