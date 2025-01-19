import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import GlobalStyle from "./styles/global";

import themes from "./styles/themes";

export default class App extends React.Component {
  state = { changed: false };

  componentDidMount() {
    console.log("componentDidMount executed");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("componentDidUpdate executed", {
      currentState: this.state,
      prevState,
      prevProps,
    });
  }

  componentDidCatch(error, info) {
    console.log("componentDidCatch executed", { error, info });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate executed", {
      currentState: this.state,
      nextState,
      nextProps,
    });

    return true;
  }

  render() {
    console.log("rendered");

    return (
      <>
        <ThemeProvider>
          <ThemeContext.Consumer>
            {({ theme, handleToggleTheme }) => (
              <StyledThemeProvider theme={themes[theme] || themes.dark}>
                <GlobalStyle />
                <Layout />
              </StyledThemeProvider>
            )}
          </ThemeContext.Consumer>
        </ThemeProvider>
      </>
    );
  }
}
