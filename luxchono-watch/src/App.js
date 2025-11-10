import Router from "./router/Router";
import Toasters from "./components/common/Toasters";
import { Loading } from "./components/common/loading";
import Toast from "./components/common/Toast";

function App() {
  return (
    <>
      <Toasters />
      <Toast/>
      <Loading />
      <Router />
    </>
  );
}

export default App;
