import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../components";

import { Header, Footer, Container } from "../layouts";

import Login from "../pages/login";
import Tracks from "../pages/tracks";
import Track from "../pages/track";
import Search from "../pages/search";
import Profile from "../pages/profile";

const Layout = ({ children, ...props }) => {
  const location = useLocation();
  const fullPages = ["/", "/login"];
  const isFullPage = (page) => {
    return fullPages.find((p) => {
      return p === page;
    });
  };
  const currentPage = location.pathname;
  const cssClasses = isFullPage(currentPage) ? "full" : null;

  return (
    <>
      {!isFullPage(currentPage) ? <Header /> : null}
      <Container className={cssClasses}>
        <Switch>
          <Route exact path="/">
            <Redirect to="/tracks" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <ProtectedRoute exact path="/tracks">
            <Tracks />
          </ProtectedRoute>
          <ProtectedRoute path="/tracks/:id">
            <Track />
          </ProtectedRoute>
          <ProtectedRoute exact path="/search">
            <Search />
          </ProtectedRoute>
          <ProtectedRoute exact path="/profile">
            <Profile />
          </ProtectedRoute>
        </Switch>
      </Container>
      {!isFullPage(currentPage) ? <Footer /> : null}
    </>
  );
};

export default Layout;
