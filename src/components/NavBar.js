import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  loading: {
    color: "white",
  },
  offset: theme.mixins.toolbar,
}));

function NavBar({ isLoading, reference }) {
  const classes = useStyles();
  const displayReference = !isLoading && reference;

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography component="h1" variant="h6" className={classes.title}>
            Fipe Fácil
          </Typography>
          {displayReference ? (
            <>
              <Hidden smUp>
                <Typography>{reference}</Typography>
              </Hidden>
              <Hidden xsDown>
                <Typography>
                  Referência - <b>{reference}</b>
                </Typography>
              </Hidden>
            </>
          ) : (
            <CircularProgress className={classes.loading} size={24} />
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}

export default NavBar;
