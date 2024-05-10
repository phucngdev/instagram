import React from "react";

const ItemStory = ({ s }) => {
  return (
    <>
      <div
        key={s?._id}
        className="flex justify-between flex-col items-center w-[66px] h-[85px]"
      >
        <div className="w-[64px] h-[64px] cursor-pointer flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
          <img
            className="w-[60px] h-[60px] border-2 border-black rounded-full object-cover"
            src={s?.image}
            alt=""
          />
        </div>
        <div className="max-w-[74px] overflow-hidden whitespace-nowrap text-[12px] text-white">
          {s?.username}
        </div>
      </div>
    </>
  );
};

export default ItemStory;
