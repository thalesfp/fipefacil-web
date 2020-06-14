import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Home from "./containers/Home";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Home />
  </ThemeProvider>,
  document.getElementById("root")
);

serviceWorker.register();
