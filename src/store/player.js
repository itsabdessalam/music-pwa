import React from "react";

const State = React.createContext();
const Dispatch = React.createContext();
const reducer = (state, action) => {
  console.log("toto", state, action);
  switch (action.type) {
    case "launch":
      return {
        ...state,
        playing: true,
        player: action.player,
      };
    default:
      return state;
  }
};

const initialState = { playing: false, player: "" };

const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  );
};

export const Player = {
  State,
  Dispatch,
  Provider,
};
