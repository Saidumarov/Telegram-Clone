import React from "react";
import Router from "./router/Router";
import { BrowserRouter } from "react-router-dom";
import Provedirs from "./provider";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Provedirs>
          <Router />
        </Provedirs>
      </BrowserRouter>
    </>
  );
};

export default App;
