import React from "react";
import Story from "./Story";
import PostLayout from "../post/PostLayout";

const NewFeed = () => {
  // const postUserLogin =
  return (
    <>
      <div className="flex flex-col w-[calc(100%-400px)] h-[100vh] overflow-scroll">
        <Story />
        <PostLayout />
      </div>
    </>
  );
};

export default NewFeed;
