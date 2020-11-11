import { cloneElement } from "react";
import { Player } from "./player";

const providers = [<Player.Provider />];

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  );

export { Store, Player };
