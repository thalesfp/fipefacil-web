import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Hidden from "@material-ui/core/Hidden";

import normalizeReferenceDate from "../utils/normalizeReferenceDate";

import api from "../api/api";

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

function NavBar() {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await api.getCurrentReference();

        setData(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Fipe Fácil
          </Typography>
          {isLoading ? (
            <CircularProgress className={classes.loading} size={24} />
          ) : (
            <>
              <Hidden smUp>
                <Typography>{normalizeReferenceDate(data)}</Typography>
              </Hidden>
              <Hidden xsDown>
                <Typography>
                  Referência - <b>{normalizeReferenceDate(data)}</b>
                </Typography>
              </Hidden>
            </>
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </div>
  );
}

export default NavBar;
