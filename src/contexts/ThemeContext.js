import React, { createContext } from "react";

export const ThemeContext = createContext();

export class ThemeProvider extends React.Component {
  constructor(props) {
    super(props);

    let theme = "dark";
    try {
      theme = JSON.parse(localStorage.getItem("@JStackClassComponents:theme"));
    } catch (err) {
      console.error(err);
    }
    this.state = { theme };
  }

  componentDidUpdate(_, prevState) {
    if (prevState.theme !== this.state.theme)
      localStorage.setItem(
        "@JStackClassComponents:theme",
        JSON.stringify(this.state.theme),
      );
  }

  handleToggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === "dark" ? "light" : "dark",
    }));
  };

  render() {
    return (
      <ThemeContext.Provider
        value={{
          theme: this.state.theme,
          handleToggleTheme: this.handleToggleTheme,
        }}
      >
        {this.props.children}
      </ThemeContext.Provider>
    );
  }
}
