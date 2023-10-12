import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { RootState } from "./store/store";
import Modal from "./components/Modal";

const Home = lazy(() => import("./pages/home"));
const Loading = lazy(() => import("./components/Loading"));

function App() {
  const modalState = useSelector((state: RootState) => state.modal);
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {modalState.display && <Modal data={modalState.data} />}
    </Suspense>
  );
}

export default App;
