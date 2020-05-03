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

import Container from "../components/Container";
import NavBar from "../components/NavBar";
import Loading from "../components/Loading";
import Breadcrumbs from "../components/Breadcrumbs";

import listModels from "../queries/listModels";

import {
  normalizeVehicleTypeToApi,
  normalizeVehicleTypeFromApi,
} from "../utils/normalizeVehicleType";
import { yearModelsRoute } from "../utils/createRoute";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginBottom: theme.spacing(3),
  },
  tableRow: {
    cursor: "pointer",
  },
}));

const sortModels = (models) =>
  models.sort((modelA, modelB) => {
    const modelAName = modelA.name.toUpperCase();
    const modelBName = modelB.name.toUpperCase();

    if (modelAName > modelBName) {
      return 1;
    } else if (modelAName < modelBName) {
      return -1;
    }

    return 0;
  });

function Models({ vehicleType, brand, models }) {
  const history = useHistory();
  const classes = useStyles();

  const handleOnClick = (model) =>
    history.push(
      yearModelsRoute({ vehicleType, brandSk: brand.sk, modelSk: model.sk })
    );

  return (
    <>
      <NavBar />
      <Container>
        {models.length === 0 ? (
          <Loading />
        ) : (
          <>
            <Breadcrumbs vehicleType={vehicleType} brand={brand} />
            <TableContainer
              className={classes.tableContainer}
              component={Paper}
            >
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Modelos</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {models.map((model) => (
                    <TableRow className={classes.tableRow} key={model.sk} hover>
                      <TableCell onClick={() => handleOnClick(model)}>
                        {model.name}
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

export default graphql(listModels, {
  options: ({
    match: {
      params: { vehicleType, brandId },
    },
  }) => ({
    fetchPolicy: "cache-and-network",
    variables: {
      vehicleType: normalizeVehicleTypeToApi(vehicleType),
      brandId: `BRAND#${brandId}`,
    },
  }),
  props: ({ data }) => {
    return {
      vehicleType: data.variables?.vehicleType
        ? normalizeVehicleTypeFromApi(data.variables.vehicleType)
        : null,
      brand: data.brand ?? {},
      models: data.models ? sortModels(data.models) : [],
    };
  },
})(Models);
