import { createContext, useState } from "react";

const AppContext = createContext({});

const AppContextProvider = ({ children }) => {
  const [player, setPlayer] = useState({});

  const context = {
    player,
    setPlayer,
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
