import React from "react";
import { makeStyles, capitalize } from "@material-ui/core";
import BreadcrumbsMaterial from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

import {
  brandsRoute,
  modelsRoute,
  yearModelsRoute,
  homeRoute,
} from "../utils/createRoute";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

function Breadcrumbs({ vehicleType, brand, model }) {
  const classes = useStyles();

  return (
    <BreadcrumbsMaterial className={classes.container}>
      <Link component={RouterLink} color="inherit" to={homeRoute()}>
        Inicio
      </Link>

      {vehicleType && (
        <Link
          component={RouterLink}
          color="inherit"
          to={brandsRoute({ vehicleType })}
        >
          {capitalize(vehicleType)}
        </Link>
      )}

      {brand && (
        <Link
          component={RouterLink}
          color="inherit"
          to={modelsRoute({ vehicleType, brandSk: brand.sk })}
        >
          {brand.name}
        </Link>
      )}

      {model && (
        <Link
          component={RouterLink}
          color="inherit"
          to={yearModelsRoute({
            vehicleType,
            brandSk: brand.sk,
            modelSk: model.sk,
          })}
        >
          {model.name}
        </Link>
      )}
    </BreadcrumbsMaterial>
  );
}

export default Breadcrumbs;
