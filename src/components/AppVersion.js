import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { isDev } from "../utils/environment";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(1),
    textAlign: "center",
    fontSize: "0.8em",
    color: "rgba(0, 0, 0, 0.54)",
  },
}));

function AppVersion() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      FipeFácil.app - v{process.env.REACT_APP_VERSION} (
      {isDev ? "alpha" : "beta"})
    </div>
  );
}

export default AppVersion;
