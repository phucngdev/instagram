import React, { useEffect, useState } from "react";
import { Drawer, Input } from "antd";
import "../../../assets/user/DrawerSearch.css";
import _debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { getDataByQuery } from "../../../services/user/account.service";
import { useNavigate } from "react-router-dom";

const DrawerSearch = ({ onClose, open }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  // const [dataSearch, setDataSearch] = useState([]);
  const dataSearch = useSelector((state) => state.account.data);
  console.log(dataSearch);

  useEffect(() => {
    const debouncedSearchByQuery = _debounce(async () => {
      await dispatch(getDataByQuery(query));
    }, 300);
    debouncedSearchByQuery();
    return () => {
      debouncedSearchByQuery.cancel();
    };
  }, [query]);

  const handleClickToProfile = (phone) => {
    setQuery("");
    navigate(`/${phone}`);
    onClose();
  };

  return (
    <>
      <Drawer
        title={
          <>
            <h3 className="text-white text-2xl font-bold">Search</h3>
          </>
        }
        closable={false}
        placement="left"
        className="fixed top-0 left-[245px] max-w-[400px] shadow-zinc-400 shadow-sm"
        onClose={onClose}
        open={open}
      >
        <Input
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="text-black bg-slate-200 hover:bg-white focus-within:bg-white placeholder-black"
          allowClear
        />

        <div className="mt-10">
          {dataSearch ? (
            <>
              <div className="flex flex-col mt-10">
                {dataSearch.users?.map((user) => (
                  <div
                    onClick={() => handleClickToProfile(user?.phone)}
                    className="flex items-center gap-4 cursor-pointer hover:bg-stone-800 rounded-md p-2"
                  >
                    <img
                      src={user?.avatar}
                      alt=""
                      className="w-[44px] h-[44px] rounded-full bg-red-600"
                    />
                    <div className="flex flex-col text-white">
                      <span className="text-base font-medium">
                        {user?.username || user?.phone}
                      </span>
                      <span>{user?.follower?.length} follower</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="text-lg text-white font-bold">Recent</span>
              <div className="mt-10 flex justify-center items-center text-white text-md font-medium">
                No recent searches.
              </div>
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};

export default DrawerSearch;
