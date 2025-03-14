import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import ItemStory from "./itemstory/ItemStory";

const ListStory = () => {
  const [datatory, setDataStory] = useState([]);
  return (
    <>
      <div className="absolute top-3 left-0 w-full flex items-center gap-2 overflow-y-hidden h-[100px] overflow-x-scroll py-5 px-5">
        {datatory?.length > 0 ? (
          datatory?.map((s) => <ItemStory s={s} />)
        ) : (
          <>
            <div className="flex justify-between flex-col items-center w-[66px] h-[85px]">
              <div className="w-[64px] h-[64px] cursor-pointer text-white flex items-center justify-center rounded-full bg-gradient-to-br from-[#d301c5] to-[#ffc703]">
                <PlusOutlined />
              </div>
              <div className="max-w-[74px] overflow-hidden whitespace-nowrap text-[12px] text-white">
                Thêm mới
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ListStory;
