import { createContext, useState } from "react";
import { useLocalStorage } from "../hooks";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({
    selector: "",
    state: 0,
    context: null,
  });
  const [favorites, setFavorites] = useLocalStorage(
    "__music_app_user_favorites",
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

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

  const inFavorites = (track) => {
    return favorites.find((favorite) => favorite.id === track.id);
  };

  const context = {
    player,
    setPlayer,
    favorites,
    handleTrackFavorite,
    inFavorites,
    isFetchingMore,
    setIsFetchingMore,
    isOffline,
    setIsOffline,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
