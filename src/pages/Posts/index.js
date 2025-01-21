import React from "react";

import Post from "./Post";
import { Container } from "./styles";

import posts from "./posts";

export default class Posts extends React.Component {
  handleNavigate = () => {
    this.props.history.push("/posts/21");
  };

  render() {
    return (
      <Container>
        <button onClick={this.handleNavigate}>Acesse um post legal!</button>
        {posts.map(post => (
          <Post
            key={post.id}
            title={post.title}
            description={post.description}
          />
        ))}
      </Container>
    );
  }
}
