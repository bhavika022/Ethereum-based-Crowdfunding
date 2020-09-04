import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { AuthContextProvider } from "./contexts/AuthContext";
import App from "./containers/App";

ReactDOM.render(
  <React.Fragment>
    <AuthContextProvider>
      <CssBaseline />
      <App />
    </AuthContextProvider>
  </React.Fragment>,
  document.getElementById("root")
);
