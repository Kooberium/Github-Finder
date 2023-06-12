import "./App.css";

import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
        <Header></Header>
        <main className="application_main">
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </main>
        <Footer />
    </div>
  );
}

export default App;
