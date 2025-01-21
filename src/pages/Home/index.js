import React from "react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  function handleNavigate() {
    history.push("/posts");
  }

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={handleNavigate}>Conferir posts</button>
    </div>
  );
}
