import PropTypes from "prop-types";
import React from "react";

export function Post({ post }) {
  return (
    <article>
      <strong>{post.title}</strong>
      <br />
      <small>{post.subtitle}</small>
      <br />
    </article>
  );
}

Post.propTypes = {
  likes: PropTypes.number.isRequired,
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
};
