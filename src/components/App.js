import React from "react";

import { Header } from "./Header";
import { Post } from "./Post";

const posts = [
  { title: "Title #01", subtitle: "Subtitle #01", likes: 21 },
  { title: "Title #02", subtitle: "Subtitle #02", likes: 22 },
  { title: "Title #03", subtitle: "Subtitle #03", likes: 23 },
];

export default function App() {
  return (
    <>
      <Header />

      <hr />

      {posts.map(post => (
        <Post
          key={post.title}
          likes={post.likes}
          post={{ title: post.title, subtitle: post.subtitle }}
        />
      ))}
    </>
  );
}
