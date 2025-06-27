import Navbar from "./components/layout/Header"
import Footer from "./components/layout/Footer";
import RoutesComponents from "./routes/route";
import  store  from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <RoutesComponents />
      <Footer />
    </Provider>
  );
}

export default App;


