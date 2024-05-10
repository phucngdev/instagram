import React from "react";
import ListNewFeed from "./listnewfeed/ListNewFeed";
import ListStory from "./liststory/ListStory";

const NewFeed = () => {
  return (
    <>
      <div className="relative flex flex-col w-[calc(100%-400px)] h-[100vh] overflow-scroll">
        <ListStory />
        <ListNewFeed />
      </div>
    </>
  );
};

export default NewFeed;
