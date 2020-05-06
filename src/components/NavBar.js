import React from "react";
import { graphql } from "react-apollo";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";
import ArrowBack from "@material-ui/icons/ArrowBack";

import currentReference from "../queries/currentReference";
import normalizeReferenceDate from "../utils/normalizeReferenceDate";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
  loading: {
    color: "white",
  },
  offset: theme.mixins.toolbar,
}));

function NavBar({ currentReference, backLink, hideBackButton }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {!hideBackButton && (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              onClick={() => history.push(backLink)}
            >
              <ArrowBack />
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Fipe Fácil
          </Typography>
          {currentReference ? (
            <>
              <Hidden smUp>
                <Typography>
                  {normalizeReferenceDate(currentReference)}
                </Typography>
              </Hidden>
              <Hidden xsDown>
                <Typography>
                  Referência - <b>{normalizeReferenceDate(currentReference)}</b>
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

export default graphql(currentReference, {
  options: () => ({
    fetchPolicy: "cache-and-network",
  }),
  props: ({ data }) => ({
    currentReference: data.currentReference ? data.currentReference[0] : null,
  }),
})(NavBar);
