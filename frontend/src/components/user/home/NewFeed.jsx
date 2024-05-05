import React, { useEffect, useState } from "react";
import Story from "./Story";
import PostLayout from "../post/PostLayout";

const NewFeed = () => {
  return (
    <>
      <div className="relative flex flex-col w-[calc(100%-400px)] h-[100vh] overflow-scroll">
        <Story />
        <PostLayout />
      </div>
    </>
  );
};

export default NewFeed;
