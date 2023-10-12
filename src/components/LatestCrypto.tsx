import { useDispatch } from "react-redux";
import { useLatestCryptoQuery } from "../store/apiSlice";
import { modalSliceActions } from "../store/store";
import { CoinType } from "../types";

export default function LatestCrypto() {
  const { data, isLoading } = useLatestCryptoQuery(30);
  const dispatch = useDispatch();

  const openModalHandler = (item: CoinType) => {
    dispatch(modalSliceActions.showModal(item));
  };

  return (
    <div className="w-11/12 mx-auto">
      {isLoading ? (
        <div className="flex justify-between animate-pulse mt-5">
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
          <div className="w-[15%] bg-slate-700 rounded-3xl h-[50px]"></div>
        </div>
      ) : (
        <div className="mt-5 relative overflow-x-hidden slide-container">
          <div className="flex gap-5 items-center justify-end">
            <h3 className="text-2xl font-medium mr-5">Latest Listings</h3>
            {/* <button className="w-fit mr-5 bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[1px] rounded-2xl">
              <div className="flex items-center gap-2 rounded-2xl bg-primaryBackground px-3 py-1">
                See All <IoIosArrowDown className="text-emerald-500" />
              </div>
            </button> */}
          </div>
          {data.success ? (
            <div className="animate-slide flex gap-5 mt-5">
              {data.info.data.map((item: CoinType) => {
                return (
                  <div
                    key={item.id}
                    onClick={() => openModalHandler(item)}
                    className="relative min-w-fit bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% w-full h-full p-[1px] rounded-3xl cursor-pointer"
                  >
                    <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-[0.15] blur"></div>
                    <div className="relative flex gap-3 text-sm items-center px-4 py-2 bg-primaryBackground rounded-3xl">
                      <img
                        width="30px"
                        className="rounded-full"
                        src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${item.id}.png`}
                      />
                      <span className="font-semibold">{item.symbol}</span>
                      {item.quote.USD.percent_change_24h > 0 ? (
                        <p className="text-brightGreen flex">
                          +{item.quote.USD.percent_change_24h.toFixed(2)}%{" "}
                          <span className="text-[10px] text-white ml-1">
                            24hr
                          </span>
                        </p>
                      ) : (
                        <p className="text-brightRed flex">
                          {item.quote.USD.percent_change_24h.toFixed(2)}%{" "}
                          <span className="text-[10px] text-white ml-1">
                            24hr
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-slate-700 text-xl mt-5 w-[95%] mx-auto rounded-3xl flex justify-center items-center h-[50px]">
              Something Went Wrong Try Again later...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
