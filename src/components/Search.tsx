import { HiOutlineSearch } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
import React, { useState, useEffect } from "react";
import { useAllCryptoQuery } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { modalSliceActions } from "../store/store";
import { CoinType } from "../types";

export default function Search() {
  const [search, setSearch] = useState("");
  const [showCancel, setShowCancel] = useState(false);
  const { data } = useAllCryptoQuery("");
  const [allCoins, setAllCoins] = useState<null | []>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const openModalHandler = (item: CoinType) => (e: React.MouseEvent) => {
    e.stopPropagation();
    setAllCoins(null);
    setShowResults(false);
    setSearch("");
    dispatch(modalSliceActions.showModal(item));
  };

  useEffect(() => {
    if (search && data) {
      if (data.success) {
        /// filtering out results if the name contains any letters from the search
        const filterData = data.info.data.filter((item: CoinType) => {
          const searchArr = search.toLowerCase().split("");
          return searchArr.some((searchedItem) =>
            item.name.includes(searchedItem)
          );
        });
        ///////////////////////////////////////////////////////////////////////////
        setAllCoins(filterData);
        setError(false);
      } else {
        setError(true);
      }
    }

    if (search.length > 0) {
      setShowCancel(true);
      setShowResults(true);
    } else {
      setShowCancel(false);
      setAllCoins(null);
      setShowResults(false);
    }
  }, [search]);

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center justify-center mt-20">
      <h2 className="text-4xl font-medium tracking-widest text-center">
        Explore the Crypto
      </h2>
      <div className="relative w-[40%] max-[720px]:w-[80%]">
        <div className="flex w-full gap-5 mt-5 items-center px-5 py-3 rounded-[30px] border-[1.5px] border-secondaryText">
          <HiOutlineSearch />{" "}
          <input
            type="text"
            placeholder="Search for an asset"
            className="text-xl w-full outline-none border-none bg-transparent"
            name="search"
            onChange={searchInputHandler}
            value={search}
            autoComplete="off"
            // onBlur={() => {
            //   setAllCoins(null);
            //   setShowResults(false);
            // }}
          />
          {showCancel && (
            <RxCross2
              onClick={() => {
                setAllCoins(null);
                setShowResults(false);
                setShowCancel(false);
                setSearch("");
              }}
              className="cursor-pointer"
            />
          )}
        </div>
        {showResults && (
          <div className="w-full absolute bottom-[-10px] z-[10] translate-y-full rounded-md bg-secondaryText mt-3 max-h-[300px] min-h-fit overflow-y-scroll">
            {!error && allCoins ? (
              <>
                {allCoins.length > 0 ? (
                  <>
                    {allCoins.map((item: CoinType) => {
                      return (
                        <div
                          key={item.id}
                          onClick={openModalHandler(item)}
                          className="flex cursor-pointer justify-between items-center px-5 py-2 border-b-[1px] border-primaryBackground"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              width="35px"
                              className="rounded-full"
                              src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`}
                            />
                            <span className="text-xl font-semibold">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-sm">{item.symbol}</span>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <div className="flex justify-center text-center items-center px-5 py-2 border-b-[1px] border-primaryBackground">
                    No matches found for " {search} "
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center items-center px-5 py-2 border-b-[1px] border-primaryBackground">
                Can't complete your request. Try again later
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
