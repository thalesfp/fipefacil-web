import React from "react";
import { makeStyles, capitalize } from "@material-ui/core";
import BreadcrumbsMaterial from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";

import extractIdFromSk from "../utils/extractIdFromSk";

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
      {vehicleType && (
        <Link component={RouterLink} color="inherit" to={`/${vehicleType}`}>
          {capitalize(vehicleType)}
        </Link>
      )}

      {brand && (
        <Link
          component={RouterLink}
          color="inherit"
          to={`/${vehicleType}/${extractIdFromSk(brand.sk)}/modelos`}
        >
          {brand.name}
        </Link>
      )}

      {model && (
        <Link
          component={RouterLink}
          color="inherit"
          to={`/${vehicleType}/${extractIdFromSk(
            brand.sk
          )}/modelos/${extractIdFromSk(model.sk)}`}
        >
          {model.name}
        </Link>
      )}
    </BreadcrumbsMaterial>
  );
}

export default Breadcrumbs;
