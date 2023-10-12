import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { modalSliceActions } from "../store/store";
import { useDispatch } from "react-redux";

export default function Modal({ data }: any) {
  const dispatch = useDispatch();

  const hideModalHandler = () => {
    dispatch(modalSliceActions.hideModal());
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full backdrop-blur-md z-[20]"
      onClick={hideModalHandler}
    >
      <div className=" absolute -translate-x-2/4 -translate-y-2/4 top-2/4 left-2/4 rounded-md bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% p-[1px]">
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% opacity-[0.4] blur-2xl -z-[30]"></div>
        <div className="bg-primaryBackground px-10 py-5 rounded-md overflow-hidden">
          <div className="flex items-center">
            <img
              className="rounded-full"
              width="140px"
              src={`https://s2.coinmarketcap.com/static/img/coins/128x128/${data.id}.png`}
            />
            <div className="ml-5">
              <h2 className="text-4xl tracking-wider font-medium truncate">
                {data.name}
              </h2>
              <span className="text-secondaryText font-semibold tracking-wide">
                {data.symbol}
              </span>
            </div>
          </div>
          {/* ///////////////////////////////////////// */}
          <h3 className="text-3xl tracking-wider my-7 text-center">Market</h3>
          <div className="flex flex-wrap">
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                RANKING
              </p>
              <p># {data.cmc_rank}</p>
            </div>
            {/* //////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                VOLUME (24H)
              </p>
              <p>$ {data.quote.USD.volume_24h.toFixed(2)}</p>
            </div>
            {/* /////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                CIRCULATING SUPPLY
              </p>
              <p>{data.circulating_supply.toFixed(3)}</p>
            </div>
            {/* ////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">PRICE</p>
              <p>$ {data.quote.USD.price.toFixed(2)}</p>
            </div>
            {/* ///// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                PRICE CHANGE (1H)
              </p>
              {data.quote.USD.percent_change_1h > 0 ? (
                <p className="flex items-center gap-1 text-brightGreen">
                  <IoMdArrowDropup />{" "}
                  {data.quote.USD.percent_change_1h.toFixed(2)}
                </p>
              ) : (
                <p className="flex items-center gap-1 text-brightRed">
                  <IoMdArrowDropdown />{" "}
                  {data.quote.USD.percent_change_1h.toFixed(2)}
                </p>
              )}
            </div>
            {/* /////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                PRICE CHANGE (24H)
              </p>
              {data.quote.USD.percent_change_24h > 0 ? (
                <p className="flex items-center gap-1 text-brightGreen">
                  <IoMdArrowDropup />{" "}
                  {data.quote.USD.percent_change_24h.toFixed(2)}
                </p>
              ) : (
                <p className="flex items-center gap-1 text-brightRed">
                  <IoMdArrowDropdown />{" "}
                  {data.quote.USD.percent_change_24h.toFixed(2)}
                </p>
              )}
            </div>
            {/* /////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                PRICE CHANGE (7D)
              </p>
              {data.quote.USD.percent_change_7d > 0 ? (
                <p className="flex items-center gap-1 text-brightGreen">
                  <IoMdArrowDropup />{" "}
                  {data.quote.USD.percent_change_7d.toFixed(2)}
                </p>
              ) : (
                <p className="flex items-center gap-1 text-brightRed">
                  <IoMdArrowDropdown />{" "}
                  {data.quote.USD.percent_change_7d.toFixed(2)}
                </p>
              )}
            </div>
            {/* //////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                MARKET CAP
              </p>
              <p>$ {data.quote.USD.market_cap.toFixed(2)}</p>
            </div>
            {/* /////// */}
            <div className="basis-[33%] mb-5">
              <p className="text-secondaryText text-sm tracking-wider">
                TOTAL SUPPLY
              </p>
              <p>{data.total_supply.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
