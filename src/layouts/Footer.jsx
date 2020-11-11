import { Tabs, TabItem } from "../components";

const Footer = () => {
  return (
    <Tabs>
      <TabItem to="/tracks" icon="home" text="Home" />
      <TabItem to="/search" icon="search" text="Search" />
      <TabItem to="/favorites" icon="heart" text="Favorites" />
      <TabItem to="/profile" icon="user" text="Profile" />
    </Tabs>
  );
};

export default Footer;
