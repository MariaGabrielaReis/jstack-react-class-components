import React from "react";

import Footer from "../Footer";
import Header from "../Header";
import PostsList from "../PostsList";

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
      <>
        <Header />
        <PostsList />
        <Footer />
      </>
    );
  }
}
