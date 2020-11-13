import { useEffect, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { AppContext } from "../context";
import Layout from "./Layout";
import theme from "../config/theme";

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body {
    max-width: ${theme.screens.md};
    margin: 0 auto;
  }

  body {
    margin: 0;
    font-family: Inter UI,system-ui,-apple-system,BlinkMacSystemFont,
    Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    background-color: ${theme.colors.background.light};
    color: ${theme.colors.gray.dark};  
  }

  a, button {
    cursor: pointer;
    > svg {
      pointer-events: none;
    }
  }
`;

const App = () => {
  const { setIsOffline } = useContext(AppContext);

  useEffect(() => {
    window.addEventListener("load", () => {
      if (!navigator.onLine) {
        setIsOffline(true);
      }
    });
    window.addEventListener("offline", () => {
      setIsOffline(true);
    });
    window.addEventListener("online", () => {
      setIsOffline(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
