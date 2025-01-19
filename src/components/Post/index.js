import PropTypes from "prop-types";
import React from "react";

import { Container, Subtitle, Title } from "./styles";

export function Post({ post }) {
  return (
    <Container>
      <Title>{post.title}</Title>
      <Subtitle>{post.subtitle}</Subtitle>
    </Container>
  );
}

Post.propTypes = {
  likes: PropTypes.number.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};
