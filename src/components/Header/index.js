import PropTypes from "prop-types";
import React from "react";

import * as styles from "./Header.scss";

export function Header(props) {
  return (
    <>
      <h1 className={styles.title}>{props.title}</h1>
      <h2>Posts of the week</h2>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
};

Header.defaultProps = {
  title: "JStack's Blog",
};
