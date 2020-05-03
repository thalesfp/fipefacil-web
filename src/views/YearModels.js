import React from "react";
import { graphql } from "react-apollo";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Breadcrumbs from "../components/Breadcrumbs";

import listYearModels from "../queries/listYearModels";

import {
  normalizeVehicleTypeToApi,
  normalizeVehicleTypeFromApi,
} from "../utils/normalizeVehicleType";
import normalizeVehicleYear from "../utils/normalizeVehicleYear";
import normalizeVehicleFuelType from "../utils/normalizeVehicleFuelType";
import normalizeVehiclePrice from "../utils/normalizeVehiclePrice";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
}));

const sortYearModels = (yearModels) =>
  yearModels.sort((modelA, modelB) => modelB.year - modelA.year);

function YearModels({ vehicleType, brand, model, yearModels }) {
  const classes = useStyles();

  return (
    <>
      <NavBar />
      <Container>
        {yearModels.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Breadcrumbs
              vehicleType={vehicleType}
              brand={brand}
              model={model}
            />
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Ano</TableCell>
                    <TableCell>Combustível</TableCell>
                    <TableCell>Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {yearModels.map((model) => (
                    <TableRow key={model.sk} hover>
                      <TableCell>{normalizeVehicleYear(model.year)}</TableCell>
                      <TableCell>
                        {normalizeVehicleFuelType(model.fuelType)}
                      </TableCell>
                      <TableCell>
                        {normalizeVehiclePrice(model.currentPrice)}
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

export default graphql(listYearModels, {
  options: ({
    match: {
      params: { vehicleType, brandId, modelId },
    },
  }) => ({
    fetchPolicy: "cache-and-network",
    variables: {
      vehicleType: normalizeVehicleTypeToApi(vehicleType),
      brandId: `BRAND#${brandId}`,
      modelId: `MODEL#${modelId}`,
    },
  }),
  props: ({ data }) => ({
    vehicleType: data.variables?.vehicleType
      ? normalizeVehicleTypeFromApi(data.variables.vehicleType)
      : null,
    brand: data.brand ?? {},
    model: data.model ?? {},
    yearModels: data.yearModels ? sortYearModels(data.yearModels) : [],
  }),
})(YearModels);
