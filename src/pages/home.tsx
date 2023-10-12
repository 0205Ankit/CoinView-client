import Header from "../components/Header";
import LatestCrypto from "../components/LatestCrypto";
import PopularCrypto from "../components/PopularCrypto";
import Search from "../components/Search";

export default function Home() {
  return (
    <>
      <Header />
      <LatestCrypto />
      <Search />
      <PopularCrypto />
    </>
  );
}
