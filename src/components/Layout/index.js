import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

import Footer from "../Footer";
import Header from "../Header";

import Routes from "../../Routes";

import { Nav } from "./styles";

export default class Layout extends React.Component {
  componentDidMount() {
    console.log("componentDidMount layout executed");
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    console.log("componentWillUnmount layout executed");
    document.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    console.log("scrolled...");
  };

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/posts">Posts</Link>
          <Link to="/posts/21">Post</Link>
        </Nav>

        <Routes />
        <Footer />
      </BrowserRouter>
    );
  }
}
