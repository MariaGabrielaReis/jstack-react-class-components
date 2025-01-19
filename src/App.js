import React from "react";
import { ThemeProvider } from "styled-components";

import Layout from "./components/Layout";
import GlobalStyle from "./styles/global";

import themes from "./styles/themes";

export default class App extends React.Component {
  state = { theme: "dark" };

  handleToggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
  };

  render() {
    const { theme } = this.state;

    return (
      <>
        <ThemeProvider theme={themes[theme] || themes.dark}>
          <GlobalStyle />
          <Layout
            selectedTheme={theme}
            onToggleTheme={this.handleToggleTheme}
          />
        </ThemeProvider>
      </>
    );
  }
}
