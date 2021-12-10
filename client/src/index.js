import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { LoginProvider } from "./Context/LoginContext";
import { LoadingProvider } from "./Context/LoadingContext";

ReactDOM.render(
  <LoginProvider>
    <LoadingProvider>
      <App />
    </LoadingProvider>
  </LoginProvider>,
  document.getElementById("root")
);
