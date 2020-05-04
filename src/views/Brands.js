import React from "react";
import { graphql } from "react-apollo";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForward from "@material-ui/icons/ArrowForwardIos";

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Breadcrumbs from "../components/Breadcrumbs";

import listBrands from "../queries/listBrands";

import {
  normalizeVehicleTypeToApi,
  normalizeVehicleTypeFromApi,
} from "../utils/normalizeVehicleType";
import { modelsRoute } from "../utils/createRoute";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const sortBrands = (brands) =>
  brands.sort((brandA, brandB) => {
    const brandAName = brandA.name.toUpperCase();
    const brandBName = brandB.name.toUpperCase();

    if (brandAName > brandBName) {
      return 1;
    } else if (brandAName < brandBName) {
      return -1;
    }

    return 0;
  });

function Brands({ match, brands }) {
  const { vehicleType } = match.params;
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = (brand) =>
    history.push(modelsRoute({ vehicleType, brandSk: brand.sk }));

  return (
    <>
      <NavBar hideBackButton />
      <Container>
        {brands.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Breadcrumbs vehicleType={vehicleType} />
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Marcas</TableCell>
                    <TableCell />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {brands.map((brand) => (
                    <TableRow
                      className={classes.tableRow}
                      key={brand.sk}
                      onClick={() => handleOnClick(brand)}
                      hover
                    >
                      <TableCell>{brand.name}</TableCell>
                      <TableCell align="right">
                        <ArrowForward color="disabled" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default graphql(listBrands, {
  options: ({
    match: {
      params: { vehicleType },
    },
  }) => ({
    fetchPolicy: "cache-and-network",
    variables: {
      vehicleType: normalizeVehicleTypeToApi(vehicleType),
    },
  }),
  props: ({ data }) => ({
    vehicleType: data.variables?.vehicleType
      ? normalizeVehicleTypeFromApi(data.variables.vehicleType)
      : null,
    brands: data.brands ? sortBrands(data.brands) : [],
  }),
})(Brands);
