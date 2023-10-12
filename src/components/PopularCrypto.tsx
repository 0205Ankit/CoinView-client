import { usePopularCryptoQuery } from "../store/apiSlice";
import {
  IoMdArrowDropdown,
  IoMdArrowDropup,
  IoMdArrowDropleft,
  IoMdArrowDropright,
} from "react-icons/io";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { modalSliceActions } from "../store/store";
import { CoinType } from "../types";

export default function PopularCrypto() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("");
  const { data, isLoading, isFetching } = usePopularCryptoQuery({
    page: page,
    filter: sort,
  });
  const dispatch = useDispatch();

  const nextPageHandler = () => {
    setPage((prev) => prev + 1);
  };

  const prevPageHandler = () => {
    setPage((prev) => prev - 1);
  };

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  const openModalHandler = (item: CoinType) => {
    dispatch(modalSliceActions.showModal(item));
  };

  return (
    <>
      <div className="mt-20 w-11/12 mx-auto flex items-center justify-end">
        <span className="text-xl font-medium mr-5"> Sort by : </span>
        <select
          name="fields"
          id="sortFields"
          className="bg-primaryBackground border-[1px] rounded-md px-3 py-2 border-secondaryText outline-none "
          onChange={selectHandler}
        >
          <option value="market_cap">Ranking</option>
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="percent_change_1h">1h%</option>
          <option value="percent_change_24h">24h%</option>
          <option value="percent_change_7d">7d%</option>
          <option value="volume_24h">volume(24h)</option>
          <option value="circulating_supply">Circulating Supply</option>
        </select>
      </div>
      {isLoading || isFetching ? (
        <div className="my-20 rounded-xl w-11/12 mx-auto animate-pulse">
          <div className="rounded-xl bg-slate-700 mt-5 h-[70px]"></div>
          <div className="rounded-xl bg-slate-700 mt-5 h-[50px]"></div>
          <div className="rounded-xl bg-slate-700 mt-5 h-[50px]"></div>
          <div className="rounded-xl bg-slate-700 mt-5 h-[50px]"></div>
          <div className="rounded-xl bg-slate-700 mt-5 h-[50px]"></div>
        </div>
      ) : (
        <>
          {data.success ? (
            <>
              <div className="relative min-w-fit bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[1px] rounded-xl w-11/12 mx-auto mb-20 mt-5">
                <div className="relative flex gap-3 text-sm items-center px-4 py-2 bg-primaryBackground rounded-[12px_12px_0_0]">
                  <div className="w-full flex justify-between px-5 py-5">
                    <p className="font-semibold min-w-[4%] max-w-[4%]">#</p>
                    <p className="font-semibold min-w-[19%] max-w-[19%]">
                      Name
                    </p>
                    <p className="font-semibold min-w-[9%] max-w-[9%]">Price</p>
                    <p className="font-semibold min-w-[9%] max-w-[9%]">1h %</p>
                    <p className="font-semibold min-w-[9%] max-w-[9%]">24h %</p>
                    <p className="font-semibold min-w-[9%] max-w-[9%]">7d %</p>
                    <p className="font-semibold min-w-[14%] max-w-[14%]">
                      Volume(24h)
                    </p>
                    <p className="font-semibold min-w-[19%] max-w-[19%]">
                      Circulating Supply
                    </p>
                  </div>
                </div>

                {data.info.data.map((item: CoinType) => {
                  return (
                    <div
                      key={item.id}
                      onClick={() => openModalHandler(item)}
                      className="w-full bg-primaryBackground cursor-pointer flex items-center justify-between px-5 py-4 border-t-[1px] border-secondaryText"
                    >
                      <p className="font-semibold min-w-[4%] ml-3 max-w-[4%]">
                        {item.cmc_rank}
                      </p>
                      <p className="font-semibold min-w-[19%] max-w-[19%] flex gap-2 items-center">
                        <img
                          width="30px"
                          className="rounded-full"
                          src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`}
                        />
                        <span className="font-semibold">{item.name}</span>
                        <span className="text-secondaryText text-sm">
                          {item.symbol}
                        </span>
                      </p>
                      <p className="min-w-[9%] max-w-[9%] flex items-center gap-1">
                        $ {item.quote.USD.price.toFixed(2)}
                      </p>
                      {item.quote.USD.percent_change_1h > 0 ? (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightGreen">
                          <IoMdArrowDropup />{" "}
                          {item.quote.USD.percent_change_1h.toFixed(2)}
                        </p>
                      ) : (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightRed">
                          <IoMdArrowDropdown />{" "}
                          {item.quote.USD.percent_change_1h.toFixed(2)}
                        </p>
                      )}
                      {item.quote.USD.percent_change_24h > 0 ? (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightGreen">
                          <IoMdArrowDropup />{" "}
                          {item.quote.USD.percent_change_24h.toFixed(2)}
                        </p>
                      ) : (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightRed">
                          <IoMdArrowDropdown />{" "}
                          {item.quote.USD.percent_change_24h.toFixed(2)}
                        </p>
                      )}
                      {item.quote.USD.percent_change_7d > 0 ? (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightGreen">
                          <IoMdArrowDropup />{" "}
                          {item.quote.USD.percent_change_7d.toFixed(2)}
                        </p>
                      ) : (
                        <p className="min-w-[9%] max-w-[9%] flex items-center gap-1 text-brightRed">
                          <IoMdArrowDropdown />{" "}
                          {item.quote.USD.percent_change_7d.toFixed(2)}
                        </p>
                      )}
                      <p className="min-w-[14%] max-w-[14%]">
                        $ {item.quote.USD.volume_24h.toFixed(2)}
                      </p>
                      <p className="min-w-[19%] max-w-[19%]">
                        {item.circulating_supply.toFixed(3)}
                      </p>
                    </div>
                  );
                })}
                <div className="w-full flex items-center justify-end bg-primaryBackground px-5 py-4 border-t-[1px] rounded-[0_0_12px_12px] border-secondaryText">
                  Page : {page}
                  <button
                    onClick={prevPageHandler}
                    disabled={page === 1}
                    className="rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[2px]  disabled:cursor-not-allowed mr-2 ml-5 disabled:text-secondaryText "
                  >
                    <IoMdArrowDropleft className="text-2xl w-[30px] h-[30px] bg-primaryBackground rounded-full" />
                  </button>
                  <button
                    onClick={nextPageHandler}
                    className="rounded-full bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[2px]  disabled:cursor-not-allowed mr-2 disabled:text-secondaryText"
                  >
                    <IoMdArrowDropright className="text-2xl w-[30px] h-[30px] bg-primaryBackground rounded-full" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-slate-700 text-xl my-20 w-[95%] mx-auto rounded-2xl flex justify-center items-center h-[100px]">
              Can't load Data Try Again later...
            </div>
          )}
        </>
      )}
    </>
  );
}
