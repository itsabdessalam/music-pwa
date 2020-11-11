import { ThemeProvider, createGlobalStyle } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import theme from "../config/theme";

const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: Inter UI,system-ui,-apple-system,BlinkMacSystemFont,
    Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;
    background-color: ${theme.colors.background.light};
    overflow-x: hidden;
    color: ${theme.colors.gray.dark};
  }

  a, button {
    cursor: pointer;
    > svg {
      pointer-events: none;
    }
  }
`;

const App = () => (
  <>
    <ThemeProvider theme={{ colors: theme.colors }}>
      <GlobalStyle />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default App;
