import "./App.css";

import env from "react-dotenv";
import { BrowserRouter } from "react-router-dom";
import Router from "./router/router";

import Header from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
